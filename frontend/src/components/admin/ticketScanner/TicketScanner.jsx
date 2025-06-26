import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './TicketScanner.css'
import { backendurl } from '../../../App';

const TicketScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-code-scanner', // ID for the container div
      {
        fps: 10, // frames per second
        qrbox: 250, // QR box size
      },
      false
    );

    // Start the QR scanner
    scanner.render(
      (result) => {
        setScanResult(result); // Display scan result
        expireBooking(result);  // Process scan result (optional)
      },
      (error) => {
        setErrorMessage(`Error: ${error}`);  // Handle error
      }
    );

    // Cleanup function on component unmount
    return () => {
      scanner.clear(); // Stop the scanner when the component is unmounted
    };
  }, []);

  const expireBooking = async (bookingId) => {
    try {
      const res = await fetch(`${backendurl}/api/admin/expireBooking/${bookingId}`, {
        method: 'PUT',
      });

      const result = await res.json();
      alert(`Booking ${bookingId} marked as expired`);
    } catch (err) {
      console.error(err);
      alert('Failed to update booking status');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Scan Booking QR Code</h2>

      <div id="qr-code-scanner" style={{ width: '100%', height: '00px', margin: 'auto' }}></div>

      {scanResult && <p>✅ Booking Scanned: {scanResult}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default TicketScanner;
