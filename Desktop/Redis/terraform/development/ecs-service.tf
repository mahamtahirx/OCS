resource "aws_security_group" "container" {
  name        = "Redis Development SG"
  description = "Redis Development Security Group"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [
      aws_security_group.redis_lb_sg.id,
      data.aws_security_group.internal_nlb.id
    ]
  }

  ingress {
    description    = "Allow HTTPS from ECS tasks for Interface VPC Endpoints"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    self            = true
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_service" "app_development" {
  name            = "redis-service"
  cluster         = data.aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  wait_for_steady_state = true
  enable_execute_command = true

  load_balancer {
    target_group_arn = aws_lb_target_group.app-tg.arn
    container_name   = "redis"
    container_port   = 6379
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.internal_redis_tg.arn
    container_name   = "redis"
    container_port   = 6379
  }

  network_configuration {
    subnets = [
      data.aws_subnet.main_private.id,
      data.aws_subnet.secondary_private.id,
      data.aws_subnet.tertiary_private.id
    ]

    security_groups  = [aws_security_group.container.id]
    assign_public_ip = false
  }

  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  tags = {
    Name = "redis-service"
  }

  depends_on = [aws_lb_listener.redis]
}