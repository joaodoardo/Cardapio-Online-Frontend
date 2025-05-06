// Admin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from '../../components/Login';
import './Admin.css';

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novoItem, setNovoItem] = useState({});
  
  useEffect(() => {
    if (token) buscarCategorias();
  }, [token]);

  const buscarCategorias = () => {
    axios.get('http://localhost:3000/categorias')
      .then(res => {
        setCategorias(res.data);
      })
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setToken('');
        }
      });
  };

  const adicionarCategoria = () => {
    if (!novaCategoria.trim()) return;
    axios.post('http://localhost:3000/admin/categoria', { nome: novaCategoria }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setNovaCategoria('');
        buscarCategorias();
      });
  };

  const adicionarItem = (categoriaId) => {
    const item = novoItem[categoriaId];
    if (!item?.nome || !item?.preco) return;
    axios.post('http://localhost:3000/admin/item', {
      nome: item.nome,
      descricao: item.descricao,
      preco: parseFloat(item.preco),
      categoriaId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setNovoItem({ ...novoItem, [categoriaId]: {} });
      buscarCategorias();
    });
  };

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div className="admin-container">
      <h1>Painel Administrativo</h1>
      <button className="logout-btn" onClick={() => {
        localStorage.removeItem('token');
        setToken('');
      }}>
        Sair
      </button>
      <div className="nova-categoria">
        <input
          type="text"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          placeholder="Nome da nova categoria"
        />
        <button onClick={adicionarCategoria}>Adicionar Categoria</button>
      </div>

      <div className="categorias-lista">
        {categorias.map(cat => (
          <div key={cat.id} className="categoria-card">
            <h2>{cat.nome}</h2>
            <div className="form-item">
              <input
                type="text"
                placeholder="Nome do item"
                value={novoItem[cat.id]?.nome || ''}
                onChange={(e) =>
                  setNovoItem({ ...novoItem, [cat.id]: { ...novoItem[cat.id], nome: e.target.value } })
                }
              />
              <input
                type="text"
                placeholder="Descrição"
                value={novoItem[cat.id]?.descricao || ''}
                onChange={(e) =>
                  setNovoItem({ ...novoItem, [cat.id]: { ...novoItem[cat.id], descricao: e.target.value } })
                }
              />
              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={novoItem[cat.id]?.preco || ''}
                onChange={(e) =>
                  setNovoItem({ ...novoItem, [cat.id]: { ...novoItem[cat.id], preco: e.target.value } })
                }
              />
              <button onClick={() => adicionarItem(cat.id)}>Adicionar Item</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
