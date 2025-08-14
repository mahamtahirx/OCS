import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';

const SparePartsCSS = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // values: 'all', 'low', 'out'


  const fetchData = () => {
    axios.get('http://localhost:28000/Spare-parts/spareparts/')
      .then(res => {
         // Only include parts with location === 'CSS'
          setSpareParts(res.data.filter(part => part.location === 'CSS'));
        })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  },[]);

  const filteredParts = spareParts.filter(part =>
    part.name.toLowerCase().includes(search.toLowerCase().trim()) ||
    part.part_number.toLowerCase().includes(search.toLowerCase().trim()) ||
    part.nomenclature.toLowerCase().includes(search.toLowerCase().trim()) ||
    part.make_type.toLowerCase().includes(search.toLowerCase().trim())
  )
  .filter(part => {
    if (filter === 'low') return part.quantity > 0 && part.quantity < part.reorder_level;
    if (filter === 'out') return part.quantity === 0;
    return true; // 'all'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      <h3 className="text-white mb-3 text-center text-decoration-underline">CSS Inventory</h3>

      <Row className="mb-4 justify-content-center mt-2">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <div
            className={`card filter-card ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <div className="card-body text-center">
              <h5 className="card-title mb-0">📦 View All</h5>
              <p className="card-text">{spareParts.length} items</p>
            </div>
          </div>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <div
            className={`card filter-card ${filter === 'low' ? 'active' : ''}`}
            onClick={() => setFilter('low')}
          >
            <div className="card-body text-center">
              <h5 className="card-title mb-0">⚠️ Low Stock</h5>
              <p className="card-text">
                {
                  spareParts.filter(p => p.quantity > 0 && p.quantity < p.reorder_level).length
                } items
              </p>
            </div>
          </div>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
          <div
            className={`card filter-card ${filter === 'out' ? 'active' : ''}`}
            onClick={() => setFilter('out')}
          >
            <div className="card-body text-center">
              <h5 className="card-title mb-0">❌ Out of Stock</h5>
              <p className="card-text">
                {
                  spareParts.filter(p => p.quantity === 0).length
                } items
              </p>
            </div>
          </div>
        </Col>
      </Row>


      <Row className="align-items-center mb-4">
        {/* Left Side Buttons */}
        <Col xs={12} md={6} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Search by name, part number, nomenclature, or make & type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '480px' }}
          />
        </Col>

        {/* Right Side Search Bar */}
        <Col xs={12} md={6} className="d-flex justify-content-md-end mt-2 mt-md-0">
          <Button variant="outline-light" onClick={handlePrint}>
            🖨 Print
          </Button>
        </Col>
      </Row>

      <div id="print-area">
        <div className="table-responsive">
          <table className="table-auto w-full border-collapse border border-gray-300 text-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-2">Name</th>
                <th className="border px-2 py-2">Image</th>
                <th className="border px-2 py-2">Part #</th>
                <th className="border px-2 py-2">Qty</th>
                <th className="border px-2 py-2">Price</th>
                <th className="border px-2 py-2">Reorder</th>
                <th className="border px-2 py-2">Contractor</th>
                <th className="border px-2 py-2">Make & Type</th>
                <th className="border px-2 py-2">Nomenclature</th>
                <th className="border px-2 py-2">Desciption</th>
                <th className="border px-2 py-2">Location</th>
                <th className="border px-2 py-2">Origin</th>
                <th className="border px-2 py-2">Date</th>
                <th className="border px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParts.map(part => {
                const isLowStock = part.quantity < part.reorder_level;
                return (
                  <tr key={part.id} className={isLowStock ? 'bg-red-700' : ''}>
                    <td className="border px-2 py-2">{part.name}</td>
                    <td className="border px-2 py-2">
                      <img src={part.picture} alt="Part" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
                    </td>
                    <td className="border px-2 py-2">{part.part_number}</td>
                    <td className="border px-2 py-2">{part.quantity}</td>
                    <td className="border px-2 py-2">{part.price}</td>
                    <td className="border px-2 py-2">{part.reorder_level}</td>
                    <td className="border px-2 py-2">{part.contractor}</td>
                    <td className="border px-2 py-2">{part.make_type}</td>
                    <td className="border px-2 py-2">{part.nomenclature}</td>
                    <td className="border px-2 py-2">{part.description}</td>
                    <td className="border px-2 py-2">{part.location}</td>
                    <td className="border px-2 py-2">{part.origin}</td>
                    <td className="border px-2 py-2">{part.date}</td>
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

export default SparePartsCSS;
