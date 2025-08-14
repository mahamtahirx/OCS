import { useEffect, useState } from 'react';
import axios from 'axios';
import HrForm from '../../Components/Forms/HRForm';
import { Button, Col, Form, Row } from 'react-bootstrap';

const HrList = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPart, setSelectedPart] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = () => {
    axios.get('http://localhost:28000/Mechanics/hr/')
      .then(res => {
          setList(res.data);
        })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  },[]);

  const filteredParts = list.filter(part =>
    part.name.toLowerCase().includes(search.toLowerCase().trim()) ||
    part.meno.toLowerCase().includes(search.toLowerCase().trim()) ||
    part.trade.toLowerCase().includes(search.toLowerCase().trim())
  );

  const handleEdit = (part) => {
    setSelectedPart(part);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedPart(null);
    setShowForm(true);
  };

  const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this spare part?')) {
    axios.delete(`http://localhost:28000/Mechanics/hr/${id}/`)
      .then(() => fetchData())
      .catch(err => console.error(err));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      <h3 className="text-white mb-3 text-center text-decoration-underline">Mechanic List</h3>

      <Row className="align-items-center mb-4">
        {/* Left Side Buttons */}
        <Col xs={12} md={6} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Search by name, meno or trade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '480px' }}
          />
        </Col>

        {/* Right Side Search Bar */}
        <Col xs={12} md={6} className="d-flex justify-content-md-end mt-2 mt-md-0">
          <Button variant="outline-light" className='me-2' onClick={handleAddNew}>
            + Add New
          </Button>
          <Button variant="outline-light" onClick={handlePrint}>
            🖨 Print
          </Button>
        </Col>
      </Row>

      {showForm && (
        <HrForm
          selectedPart={selectedPart}
          onSuccess={() => {
            setShowForm(false);
            fetchData();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div id="print-area">
        <div className="table-responsive">
          <table className="table-auto w-full border-collapse border border-gray-300 text-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-2">Name</th>
                <th className="border px-2 py-2">ME No</th>
                <th className="border px-2 py-2">Trade</th>
                <th className="border px-2 py-2">Skill Level</th>
                <th className="border px-2 py-2">Joining Date</th>
                <th className="border px-2 py-2">Resignation Date</th>
                <th className="border px-2 py-2">Service Years</th>
                <th className="border px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParts.map(part => {
                return (
                  <tr key={part.id}>
                    <td className="border px-2 py-2">{part.name}</td>
                    <td className="border px-2 py-2">{part.meno}</td>
                    <td className="border px-2 py-2">{part.trade}</td>
                    <td className="border px-2 py-2">{part.skill_lvl}</td>
                    <td className="border px-2 py-2">{part.join_date}</td>
                    <td className="border px-2 py-2">{part.left_date}</td>
                    <td className="border px-2 py-2">{part.svc_yrs}</td>

                    <td className="border px-2 py-2">
                      <Button variant="outline-light" className='me-2 mb-2' onClick={() => handleEdit(part)}>Edit</Button>
                      <Button variant="outline-light" className='me-2 mb-2' onClick={() => handleDelete(part.id)}>Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HrList;
