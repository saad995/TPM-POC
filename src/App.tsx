import React from 'react';
import BankAccountHistory from './components/BankAccountHistory';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="bg-light min-vh-100">
      <BankAccountHistory />
    </div>
  );
}

export default App;