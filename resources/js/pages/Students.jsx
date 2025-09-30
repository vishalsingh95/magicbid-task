import React, { useEffect, useState } from 'react';

const API = '/api/students';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  async function fetchList() {
	const res = await fetch(API);
	const data = await res.json();
	setStudents(data);
  }

  useEffect(() => {
	fetchList();
  }, []);

  function handleChange(e) {
	setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
	e.preventDefault();
	setError('');
	try {
	  if (editingId) {
		const res = await fetch(`${API}/${editingId}`, {
		  method: 'PUT',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(form),
		});
		if (!res.ok) throw res;
		await fetchList();
		setEditingId(null);
	  } else {
		const res = await fetch(API, {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(form),
		});
		if (!res.ok) throw res;
		await fetchList();
	  }
	  setForm({ name: '', email: '', phone: '' });
	} catch (err) {
	  try {
		const errJson = await err.json();
		setError(errJson.message || JSON.stringify(errJson));
	  } catch (e) {
		setError('Request failed');
	  }
	}
  }


function startEdit(student){
setEditingId(student.id)
setForm({name: student.name, email: student.email, phone: student.phone || ''})
}


async function handleDelete(id){
if(!confirm('Delete this student?')) return
await fetch(`${API}/${id}`, { method: 'DELETE' })
await fetchList()
}


return (
<div style={{padding:20, maxWidth:900, margin:'0 auto'}}>
<h2>Students CRUD</h2>


<form onSubmit={handleSubmit} style={{marginBottom:20}}>
<div>
<input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
</div>
<div>
<input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
</div>
<div>
<input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
</div>
<div style={{marginTop:8}}>
<button type="submit">{editingId? 'Update' : 'Create'}</button>
{editingId && <button type="button" onClick={()=>{setEditingId(null); setForm({name:'',email:'',phone:''})}}>Cancel</button>}
</div>
{error && <div style={{color:'red'}}>{String(error)}</div>}
</form>


<table border={1} cellPadding={8} cellSpacing={0} style={{width:'100%'}}>
<thead>
<tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
</thead>
<tbody>
{students.map(s=> (
<tr key={s.id}>
<td>{s.id}</td>
<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.phone}</td>
<td>
<button onClick={()=>startEdit(s)}>Edit</button>
<button onClick={()=>handleDelete(s.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
)
}