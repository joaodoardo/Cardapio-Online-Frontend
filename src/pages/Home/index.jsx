// App.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function App() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Erro ao buscar categorias', err));
  }, []);

  const handleCategoriaClick = (categoriaId) => {
    navigate(`/itens/${categoriaId}`);
  };

  return (
    <div>
      <h1>Cardápio Online</h1>

      <div className="container">
        {categorias.map(c => (
          <button onClick={() => handleCategoriaClick(c.id)} className="categoria-card">
            {c.nome}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
