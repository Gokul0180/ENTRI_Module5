import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { api, login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div>
      <h3>Register</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
            type="email"
          />
        </div>

        <div className="form-row">
          <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
            type="password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
