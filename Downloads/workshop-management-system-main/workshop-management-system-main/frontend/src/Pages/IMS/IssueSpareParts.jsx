import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';

const IssueSpareParts = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [formData, setFormData] = useState({
    ba_no: '',
    make_type: '',
    model: '',
    model_year: '',
    unit: '',
    reg_no: '',
    date: '',
    parts: [{ part_id: '', quantity: 1 }],
  });

  //form population
  useEffect(() => {
    const requestData = {
        bano: '12345-ABC',
    };

    fetch('http://localhost:28000/Spare-parts/form/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0]; // Assuming we use the first item
          setFormData({
            bano: firstItem.bano || '',
            make_type: firstItem.make_type || '',
            model: firstItem.model || '',
            model_year: firstItem.model_year || '',
            unit: firstItem.unit || '',
            registration: firstItem.registration || '',
            // type: firstItem.type || '',
            date: firstItem.date || '',
          });
        }
      })
      .catch(err => console.error('Error:', err));
  }, []);

  //available inventory
  const fetchAvailableParts = () => {
    axios.get('http://localhost:28000/Spare-parts/available-spareparts/')
      .then(res => {
        const available = res.data.filter(part => part.quantity > 0);
        setSpareParts(available);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchAvailableParts(); }, []);

  const handlePartChange = (index, field, value) => {
    const newParts = [...formData.parts];
    newParts[index][field] = value;
    setFormData({ ...formData, parts: newParts });
  };

  const addPartRow = () => {
    setFormData({ ...formData, parts: [...formData.parts, { part_id: '', quantity: 1 }] });
  };

  const removePartRow = (index) => {
    const newParts = formData.parts.filter((_, i) => i !== index);
    setFormData({ ...formData, parts: newParts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:28000/Spare-parts/issue/', formData)
      .then(() => {
        alert('Spare parts issued successfully!');
        setFormData({
            ba_no: '',
            make_type: '',
            model: '',
            model_year: '',
            unit: '',
            reg_no: '',
            date: '',
            parts: [{ part_id: '', quantity: 1 }]
        });
        })
      .catch(err => {
        console.error(err);
        alert('Failed to issue spare parts.');
      });

    fetchAvailableParts(); // refresh list

  };

  return (
    <div className="p-4 text-white">
      <h3 className="text-center text-decoration-underline mb-4">Issue Spare Parts</h3>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}><Form.Group className="mb-3">
            <Form.Label>BA No</Form.Label>
            <Form.Control value={formData.ba_no} onChange={e => setFormData({ ...formData, ba_no: e.target.value })} />
          </Form.Group></Col>

          <Col md={4}><Form.Group className="mb-3">
            <Form.Label>Make & Type</Form.Label>
            <Form.Control value={formData.make_type} onChange={e => setFormData({ ...formData, make_type: e.target.value })} />
          </Form.Group></Col>

          <Col md={4}><Form.Group className="mb-3">
            <Form.Label>Model</Form.Label>
            <Form.Control value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} />
          </Form.Group></Col>

          <Col md={4}><Form.Group className="mb-3">
            <Form.Label>Model Year</Form.Label>
            <Form.Control value={formData.model_year} onChange={e => setFormData({ ...formData, model_year: e.target.value })} />
          </Form.Group></Col>

          <Col md={4}><Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Control value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} />
          </Form.Group></Col>

          <Col md={4}><Form.Group className="mb-3">
            <Form.Label>Registration No</Form.Label>
            <Form.Control value={formData.reg_no} onChange={e => setFormData({ ...formData, reg_no: e.target.value })} />
          </Form.Group></Col>

          <Col md={6}><Form.Group className="mb-3">
            <Form.Label>Date & Time</Form.Label>
            <Form.Control type="datetime-local" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          </Form.Group></Col>
        </Row>

        <hr />
        <h5>Select Spare Parts</h5>

        {formData.parts.map((part, index) => (
          <Row key={index} className="align-items-end mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Spare Part</Form.Label>
                <Form.Select
                  value={part.part_id}
                  onChange={(e) => handlePartChange(index, 'part_id', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {spareParts.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                    {sp.name} ({sp.part_number}) — Available: {sp.quantity}
                    </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={
                    spareParts.find(p => p.id == part.part_id)?.quantity || 1
                  }
                  value={part.quantity}
                  onChange={(e) => handlePartChange(index, 'quantity', e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Button variant="danger" onClick={() => removePartRow(index)} disabled={formData.parts.length === 1}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}

        <Button variant="secondary" onClick={addPartRow} className="mb-3">+ Add Another</Button>

        <div>
          <Button variant="success" type="submit">Submit Issue</Button>
        </div>
      </Form>
    </div>
  );
};

export default IssueSpareParts;
