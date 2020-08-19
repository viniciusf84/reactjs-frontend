import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newRepositoryTitle, setNewRepositoryTitle] = useState('');
  const [newRepositoryUrl, setNewRepositoryUrl] = useState('');

  async function listRepositories() {
    try {
      const response = await api.get('repositories');

      setRepositories(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  async function handleAddRepository() {
    const repositoryToSubmit = {	
      "title": newRepositoryTitle,
      "url": newRepositoryUrl,
      "techs": []
    };

    try {
      const response = await api.post('repositories', repositoryToSubmit);

      const repoToAdd = response.data;

      setRepositories([...repositories, repoToAdd]);
      setNewRepositoryTitle('');
      setNewRepositoryUrl('');
      
    } catch(error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(response => {
      if(response) {
        setRepositories(repositories.filter(repo => repo.id !== id));
      }
    });    
  }

  useEffect(() => {
    listRepositories();
  }, []);

  return (
    <div>
      
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      
      <section id="add-new-repository">      
        <h2>Adicionar novo repositório</h2>
        <fieldset>
          <label htmlFor="title">Título do respoitório</label>
          <input 
            id="title" 
            type="text" 
            name="title"
            value={newRepositoryTitle} 
            onChange={e => setNewRepositoryTitle(e.target.value)} 
          />          
        </fieldset>

        <fieldset>
          <label htmlFor="url">Url do respoitório</label>
          <input 
            id="url" 
            type="text" 
            name="url"
            value={newRepositoryUrl} 
            onChange={e => setNewRepositoryUrl(e.target.value)} 
          />          
        </fieldset>

        <button onClick={handleAddRepository}>Adicionar</button>          
      </section>

    </div>
  );
}

export default App;
