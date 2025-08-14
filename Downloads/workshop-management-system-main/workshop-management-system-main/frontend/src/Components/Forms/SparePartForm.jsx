import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';


const SparePartForm = ({ selectedPart, onSuccess, onCancel }) => {
  const isEdit = !!selectedPart;

  const [formData, setFormData] = useState({
    name: '',
    part_number: '',
    nomenclature: '',
    picture: null,
    quantity: '',
    price: '',
    contractor: '',
    make_type: '',
    date: '',
    description: '',
    reorder_level: '',
    // is_available: '',
    location: '',
    origin: ''
  });

  useEffect(() => {
    if (selectedPart) {
      setFormData(selectedPart);
    }
  }, [selectedPart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add this for file input
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, picture: e.target.files[0] }));
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
      ? `http://localhost:28000/Spare-parts/spareparts/${selectedPart.id}/`
      : `http://localhost:28000/Spare-parts/spareparts/`;

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

        <Form.Group as={Col} controlId="part_number">
          <Form.Label>Part No</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Part No" 
            name="part_number"
            value={formData.part_number}
            onChange={handleChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number" 
            placeholder="Quantity"
            min="0"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="reorder_level">
          <Form.Label>Reorder level</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Reorder level" 
            min="0"
            name="reorder_level"
            value={formData.reorder_level}
            onChange={handleChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Price" 
            min="0"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="origin">
          <Form.Label>Origin</Form.Label>
          <Form.Control
            as="select"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          >
            <option value="">Select Location</option>
            <option value="SSL">SSL</option>
            <option value="DGP(A)">DGP(A)</option>
            <option value="43 EME">43 EME</option>
            <option value="Adv LP">Adv LP</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="make_type">
          <Form.Label>Make & Type</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Make & Type"
            name="make_type"
            value={formData.make_type}
            onChange={handleChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="nomenclature">
          <Form.Label>Nomenclature</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Nomenclature"
            name="nomenclature"
            value={formData.nomenclature}
            onChange={handleChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            as="select"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          >
            <option value="">Select Location</option>
            <option value="CSS">CSS</option>
            <option value="Sub Store">Sub Store</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="contractor">
          <Form.Label>Contractor</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Contractor"
            name="contractor"
            value={formData.contractor}
            onChange={handleChange}
            required />
        </Form.Group>

        <Form.Group as={Col} controlId="picture">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="file"
            name="picture"
            onChange={handleFileChange}
            className="border px-2 py-1 w-full"
            required/>
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

SparePartForm.propTypes = {
  selectedPart: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    part_number: PropTypes.string,
    nomenclature: PropTypes.string,
    picture: PropTypes.oneOfType([
      PropTypes.string, // if you're using image URLs
      PropTypes.object  // if it's a File object
    ]),
    quantity: PropTypes.number,
    reorder_level: PropTypes.number,
    price: PropTypes.number,
    contractor: PropTypes.string,
    make_type: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    origin: PropTypes.string
  }),
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};


export default SparePartForm;
