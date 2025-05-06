import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Itens.css';

export default function Categoria() {
  const { id } = useParams();
  const [itens, setItens] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/categorias/${id}/itens`)
      .then(response => setItens(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div>
      <div className='containeritens'>
        {itens.map(item => (
          <div key={item.id}>
            <button className="item-card">
                <h2>{item.nome}</h2>
                <p>{item.descricao}</p>
                <p>R$ {item.preco}</p>  
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
