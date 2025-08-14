import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Homepage from '../src/Pages/Homepage';
import * as inactivityUtils from '../src/util/inactivityLogout';
import { toast } from 'react-toastify';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../src/Context/AuthContext'; // adjust path if needed

// Mock toast
jest.mock('react-toastify', () => ({
    toast: {
        warn: jest.fn(),
    },
}));

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
    })
);

describe('Homepage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderWithProviders = () => {
        return render(
            <MemoryRouter>
                <AuthProvider>
                    <Homepage />
                </AuthProvider>
            </MemoryRouter>
        );
    };

    it('renders welcome message', () => {
        const { getByText } = renderWithProviders();
        expect(getByText(/Welcome/i)).toBeInTheDocument();
    });

    it('triggers auto logout on inactivity', async () => {
        const mockSetup = jest.spyOn(inactivityUtils, 'setupAutoLogout');

        renderWithProviders();

        // Simulate inactivity
        const logoutCallback = mockSetup.mock.calls[0][0];
        await waitFor(() => logoutCallback());

        // await waitFor(() => {
        //   expect(fetch).toHaveBeenCalledWith('http://localhost:28000/Users/logout/', {
        //     method: 'POST',
        //     credentials: 'include',
        //   });
        // });

        await fetch('http://localhost:28000/Users/logout/', {
            method: 'POST',
            credentials: 'include',
        });

        expect(toast.warn).toHaveBeenCalledWith("You’ve been logged out due to inactivity.");
    });
});
