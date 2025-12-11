import React, {useState} from 'react';

export default function App(){
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null);

  async function pay(e){
    e.preventDefault();
    const payload = { amount: Number(amount), payerName: name, currency: 'INR' };
    // call mock /initiatePayment on localhost:3001 or mokapi
    try {
      const res = await fetch('/initiatePayment', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const j = await res.json();
      setStatus(j);
    } catch (err) {
      setStatus({ error: err.message });
    }
  }

  return (
    <div style={{padding:20, fontFamily:'sans-serif', maxWidth:600}}>
      <h2>PayFlow Demo</h2>
      <form onSubmit={pay}>
        <div>
          <label> Payer Name</label><br/>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/>
        </div>
        <div>
          <label> Amount (INR)</label><br/>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="100"/>
        </div>
        <button type="submit">Pay</button>
      </form>
      <pre>{status ? JSON.stringify(status,null,2) : 'No transaction yet'}</pre>
    </div>
  );
}
