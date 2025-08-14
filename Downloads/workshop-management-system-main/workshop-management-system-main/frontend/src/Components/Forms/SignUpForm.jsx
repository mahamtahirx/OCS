import React from 'react';
import { useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [mepssno, setMepssno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [group, setGroup] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null); // Clear errors if all checks pass

    try {
      const response = await fetch('http://localhost:28000/Users/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, mepssno, password }),
      });

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
          closeButton: false,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      setError("Error : "+ error);
    }

  };

  return (
    <Form onSubmit={handleSignup}>
      <FloatingLabel controlId="Name" label="Username" className='mb-3'>
        <Form.Control 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </FloatingLabel>

      {/* <FloatingLabel controlId="Email" label="Email" className='mb-3'>
        <Form.Control 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </FloatingLabel> */}

      <FloatingLabel controlId="ME/PSS No" label="ME/PSS No" className='mb-3'>
        <Form.Control 
          type="text"
          value={mepssno}
          onChange={(e) => setMepssno(e.target.value)}
          placeholder="ME/PSS No"
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="Password" label="Password" className='mb-3'>
        <Form.Control 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="Confirm-Password" label="Confirm Password" className='mb-3'>
        <Form.Control 
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
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
      <Button variant="success" type="submit" className="button-max-width">
        Sign Up
      </Button>

      <p className="mt-3">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </Form>
  );
}

export default SignupForm;
