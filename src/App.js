import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get('repositories')
      .then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: `http://desafio.conceitos.react/${Date.now()}`,
      title: `Título ${Date.now()}`,
      techs: [`Tech ${Date.now()}`, `Tech ${Date.now()}`]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api
      .delete('/repositories/' + id)
      .then(response => {
        const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
        repositories.splice(repositorieIndex, 1);
        setRepositories([...repositories]);
      });
  }

  return (
    <>
      <ul data-testid="repository-list">
        {
          repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
