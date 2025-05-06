// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:3000/admin/login', { email, senha })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        onLogin(token);
      })
      .catch(() => {
        setErro('Email ou senha inválidos');
      });
  };

  return (
    <div className="login-container">
      <h2>Login do Administrador</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}

export default Login;
