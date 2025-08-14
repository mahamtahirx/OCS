import React from 'react';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Button, Col, Form, Row } from 'react-bootstrap';

const QRCodePage = () => {
  const [formData, setFormData] = useState({
    bano: '',
    maketype: '',
    model: '',
    modelyear: '',
    unit: '',
    regno: ''
  });

  const [qrData, setQRData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    // setQRData(JSON.stringify(formData));
    const { bano, maketype, model, modelyear, unit, regno } = formData;
    const formattedData = `${bano},${maketype},${model},${modelyear},${unit},${regno}`;
    setQRData(formattedData);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <body style="text-align:center;">
          <div>${document.getElementById('qr-code-container').innerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-4">
      <h3 className="text-white mb-3 text-center text-decoration-underline">Generate QR Code</h3>

      <Form className="text-white">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="bano">
            <Form.Label>BA No</Form.Label>
            <Form.Control name="bano" onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control name="model" onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="modelyear">
            <Form.Label>Model Year</Form.Label>
            <Form.Control name="modelyear" onChange={handleChange} />
          </Form.Group>
        </Row>


        <Row className="mb-3">
          <Form.Group as={Col} controlId="maketype">
            <Form.Label>Make & Type</Form.Label>
            <Form.Control name="maketype" onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="unit">
            <Form.Label>Unit</Form.Label>
            <Form.Control name="unit" onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="regno">
            <Form.Label>Registration No</Form.Label>
            <Form.Control name="regno" onChange={handleChange} />
          </Form.Group>
        </Row>

        <Button variant="outline-light" onClick={handleGenerate}>
          Generate QR
        </Button>
      </Form>

      {/* {qrData && (
        <div className="mt-4 text-center">
            <div id="qr-code-container" style={{ background: 'white', padding: '16px', display: 'inline-block', width: 'auto'}}>
                <QRCode id="qr-code" value={qrData} size={200} />
            </div>
            <br />
            <Button className="mt-3" variant="outline-light" onClick={handlePrint}>
                Print QR
            </Button>
        </div>
      )} */}
      {qrData && (
        <div className="mt-4 text-center">
          <div
            id="qr-code-container"
            data-testid="qr-code-container"
            style={{ background: 'white', padding: '16px', display: 'inline-block', width: 'auto' }}
          >
            <QRCode id="qr-code" value={qrData} size={200} />
          </div>
          <br />
          <Button className="mt-3" variant="outline-light" onClick={handlePrint}>
            Print QR
          </Button>
        </div>
      )}

    </div>
  );
};

export default QRCodePage;
