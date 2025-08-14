import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';


const HrForm = ({ selectedPart, onSuccess, onCancel }) => {
  const isEdit = !!selectedPart;

  const [formData, setFormData] = useState({
    name: '',
    meno: '',
    trade: '',
    skill_lvl: '',
    join_date: '',
    left_date: ''
  });

  useEffect(() => {
    if (selectedPart) {
      setFormData({
        name: selectedPart.name ?? '',
        meno: selectedPart.meno ?? '',
        trade: selectedPart.trade ?? '',
        skill_lvl: selectedPart.skill_lvl ?? '',
        join_date: selectedPart.join_date ?? '',
        left_date: selectedPart.left_date ?? ''
      });
    }
  }, [selectedPart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    const method = isEdit ? axios.put : axios.post;
    const url = isEdit
      ? `http://localhost:28000/Mechanics/hr/${selectedPart.id}/`
      : `http://localhost:28000/Mechanics/hr/`;

    method(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        onSuccess();
      })
      .catch(err => {
        console.error('Error response:', err.response?.data);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded mb-4 text-white">
      <h3 className="mb-3 text-center">{isEdit ? 'Edit Spare Part' : 'Add Spare Part'}</h3>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="meno">
          <Form.Label>ME No</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="ME No" 
            name="meno"
            value={formData.meno}
            onChange={handleChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="trade">
          <Form.Label>Trade</Form.Label>
          <Form.Control
            as="select"
            name="trade"
            value={formData.trade}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full">
              <option value="">Select Trade</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Engine">Engine</option>
              <option value="Suspension">Suspension</option>
              <option value="AC">AC</option>
              <option value="Electrical">Electrical</option>
              <option value="Denters">Denters</option>
              <option value="Painters">Painters</option>
              <option value="Tyre">Tyre</option>
            </Form.Control>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="skill_lvl">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            as="select"
            name="skill_lvl"
            value={formData.skill_lvl}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advance">Advance</option>
            <option value="Master">Master</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="join_date">
          <Form.Label>Joining Date</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Joining Date"
            name="join_date"
            value={formData.join_date}
            onChange={handleChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="left_date">
          <Form.Label>Resignation Date</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Resignation Date"
            name="left_date"
            value={formData.left_date}
            onChange={handleChange}/>
        </Form.Group>
      </Row>

      <div>
        <Button type="submit" variant="success" className='me-2 mb-2'>
          {isEdit ? 'Update' : 'Add'}
        </Button>
        {onCancel && (
          <Button onClick={onCancel} variant="secondary" className='me-2 mb-2'>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

HrForm.propTypes = {
  selectedPart: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    meno: PropTypes.string,
    trade: PropTypes.string,
    skill_lvl: PropTypes.string,
    join_date: PropTypes.string,
    left_date: PropTypes.string,
    svc_yrs: PropTypes.number
  }),
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};


export default HrForm;
