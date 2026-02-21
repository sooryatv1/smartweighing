import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './App.css';

function App() {
  const [vehicleNo, setVehicleNo] = useState('');
  const [material, setMaterial] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [tareWeight, setTareWeight] = useState('');

  // Derived state
  const netWeight = (grossWeight && tareWeight) ? Number(grossWeight) - Number(tareWeight) : 0;
  
  // Get current date and time for the ticket
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

const ticketRef = useRef(null); // Add 'null' here
  const handlePrint = useReactToPrint({
    contentRef: ticketRef,        // <-- New way
    documentTitle: `Weighbridge_Ticket_${vehicleNo || 'New'}`,
  });

  const handleSaveAndPrint = (e) => {
    e.preventDefault();
    if (!vehicleNo || !grossWeight || !tareWeight) {
      alert("Please fill in the required fields before printing.");
      return;
    }
    // Open the print dialog (which includes the "Save as PDF" option)
    handlePrint();
  };

  return (
    <div className="dashboard">
      {/* LEFT COLUMN: Data Entry Form */}
      <div className="form-section">
        <h2>Weighbridge Entry</h2>
        <form onSubmit={handleSaveAndPrint}>
          <div className="input-group">
            <label>Vehicle Number:</label>
            <input type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value.toUpperCase())} required />
          </div>

          <div className="input-group">
            <label>Material:</label>
            <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} />
          </div>
          
          <div className="input-group">
            <label>Gross Weight (KG):</label>
            <input type="number" value={grossWeight} onChange={(e) => setGrossWeight(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Tare Weight (KG):</label>
            <input type="number" value={tareWeight} onChange={(e) => setTareWeight(e.target.value)} required />
          </div>

          <button type="submit" className="action-btn">Print & Save PDF</button>
        </form>
      </div>

      {/* RIGHT COLUMN: Live Ticket Preview */}
      <div className="ticket-preview-section">
        <h2>Live Ticket Preview</h2>
        
        {/* The actual printable area */}
        <div className="ticket-container" ref={ticketRef}>
          <div className="ticket-header">
            <h3>SMART WEIGHBRIDGE</h3>
            <p>123 Industrial Park, Tech City</p>
            <p>Phone: +1 234 567 890</p>
            <hr />
          </div>
          
          <div className="ticket-body">
            <div className="ticket-row"><strong>Date:</strong> <span>{currentDate}</span></div>
            <div className="ticket-row"><strong>Time:</strong> <span>{currentTime}</span></div>
            <div className="ticket-row"><strong>Vehicle No:</strong> <span>{vehicleNo || 'N/A'}</span></div>
            <div className="ticket-row"><strong>Material:</strong> <span>{material || 'N/A'}</span></div>
            <hr />
            <div className="ticket-row"><strong>Gross Wt:</strong> <span>{grossWeight ? `${grossWeight} KG` : '0 KG'}</span></div>
            <div className="ticket-row"><strong>Tare Wt:</strong> <span>{tareWeight ? `${tareWeight} KG` : '0 KG'}</span></div>
            <hr />
            <div className="ticket-row net-row"><strong>NET WT:</strong> <span>{netWeight} KG</span></div>
          </div>

          <div className="ticket-footer">
            <br /><br />
            <p>_______________________</p>
            <p>Authorized Signature</p>
            <p className="thank-you">Thank you for your business!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;