import React, { useState, useEffect } from 'react';
import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

//todo codigo HTML da aplicação é escrito aqui
// Componente: bloco isolado de HTML, CSS e JS, no qual não interfere no restante do codigo
//Propriedades: (ou atributos q nem chamado no HTML ): propriedades q o componente PAI passa para o componente FILHO
//Estado: Informação mantidas pelo componete( lembrar: Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);



  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('./devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>

    </div>

  );
}

export default App;
