import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QRCodePage from '../src/Pages/QRCodePage'; // Update path if needed
import '@testing-library/jest-dom';

describe('QRCodePage', () => {
    test('renders QRCodePage heading and form inputs', () => {
        render(<QRCodePage />);

        // Check heading
        expect(screen.getByText(/generate qr code/i)).toBeInTheDocument();

        // Check form fields
        expect(screen.getByLabelText(/ba no/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Model', { exact: true })).toBeInTheDocument();
        expect(screen.getByLabelText(/model year/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/make & type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/unit/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/registration no/i)).toBeInTheDocument();

        // Check button
        expect(screen.getByRole('button', { name: /generate qr/i })).toBeInTheDocument();
    });

    test('generates QR code on button click after filling form', () => {
        render(<QRCodePage />);

        // Fill form fields
        fireEvent.change(screen.getByLabelText(/ba no/i), { target: { value: '123' } });
        fireEvent.change(screen.getByLabelText('Model', { exact: true }), { target: { value: 'ModelX' } });
        fireEvent.change(screen.getByLabelText(/model year/i), { target: { value: '2023' } });
        fireEvent.change(screen.getByLabelText(/make & type/i), { target: { value: 'MakeType' } });
        fireEvent.change(screen.getByLabelText(/unit/i), { target: { value: 'Unit1' } });
        fireEvent.change(screen.getByLabelText(/registration no/i), { target: { value: 'ABC123' } });

        // Click generate QR button
        fireEvent.click(screen.getByRole('button', { name: /generate qr/i }));

        // Expect QR Code to be shown
        const qrCode = screen.getByTestId('qr-code-container');
        expect(qrCode).toBeInTheDocument();
    });
});
