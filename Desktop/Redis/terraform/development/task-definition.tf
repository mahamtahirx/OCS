resource "aws_cloudwatch_log_group" "log_group" {
  name              = "/ecs/redis-development"
  retention_in_days = 3
}

data "aws_iam_role" "ecs_role" {
  name = "ecs_role"
}

resource "aws_ecs_task_definition" "task" {
  family                   = "redis-development"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "2048"
  execution_role_arn       = data.aws_iam_role.ecs_role.arn
  task_role_arn            = data.aws_iam_role.ecs_role.arn

  volume {
    name = "redis-efs"
    efs_volume_configuration {
      file_system_id = aws_efs_file_system.redis.id
      root_directory = "/"
      transit_encryption = "ENABLED"
    }
  }

  container_definitions = jsonencode([
    {
      image = "public.ecr.aws/docker/library/redis:7.0.11@sha256:1008c73f08e9f913868e2fa2e843212b62ea5bf3c66435d87bc7a6207bc0f1b4"
      name  = "redis"
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = aws_cloudwatch_log_group.log_group.name,
          awslogs-region        = "us-east-1",
          awslogs-stream-prefix  = "ecs"
        }
      }
      portMappings = [
        {
          containerPort = 6379
          hostPort      = 6379
        }
      ]
      mountPoints = [
        {
          sourceVolume  = "redis-efs"
          containerPath = "/data"
          readOnly      = false
        }
      ]
      command = [
        "redis-server", 
        "--requirepass", var.redis_password,
        "--dir", "/data",
        "--appendonly", "yes",
        "--maxclients", "20000" # Manually bumping the limit
      ]
    },
  ])
}
