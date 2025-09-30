import { useState } from 'react';
import axios from 'axios';

function StudentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const res = await axios.post('/api/students', { name, email });
      console.log('Saved:', res.data);
    } catch (err) {
      console.error('Error:', err.response || err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Save Student</button>
    </form>
  );
}

export default StudentForm;
