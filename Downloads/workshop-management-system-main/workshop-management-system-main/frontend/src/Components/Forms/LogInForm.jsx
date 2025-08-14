import React from 'react';
import { useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Context/AuthContext';

function LoginForm() {
  const { setUsername } = useAuth();
  const [username, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');
  // const [group, setGroup] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:28000/Users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // this enables cookies
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Save username to context
        setUsername(username);

        // alert("Login successful!");
        toast.success("SignIn successful! Redirecting to homepage...", {
          position: "top-right",
          autoClose: 3000,
          closeButton: false,
        });
        
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Error : "+ error);
    }
  };

  return (
    <Form className='mt-4' onSubmit={handleSignin}>
      <FloatingLabel controlId="Name" label="Username" className="mb-4 mt-4">
        <Form.Control 
          type="text"
          value={username}
          onChange={(e) => setUsernameLocal(e.target.value)}
          placeholder="Username"
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="Password" label="Password" className='mb-4'>
        <Form.Control 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </FloatingLabel>

      {/* <FloatingLabel controlId="Role" label="Role" className='mb-3'>
        <Form.Select value={group} onChange={(e) => setGroup(e.target.value)} required>
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Comdt">Comdt</option>
        <option value="AD">AD</option>
        <option value="OIC">OIC</option>
        <option value="Clerk">Clerk</option>
        </Form.Select>
      </FloatingLabel> */}
      
      {error && <p className="text-danger">{error}</p>}
      <Button variant="success" type="submit" className='mt-4 button-max-width'>
        Sign In
      </Button>

      <p className="mt-3">
        Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Form>
  );
}

export default LoginForm;
