import React,{useState,useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects,setProjects] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setProjects(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Projeto ${Date.now()}`,
      url: 'https://github.com/Rocketseat/',
      techs: ['ReactJS','NodeJS'],
    });

    const project = response.data;

    setProjects([...projects,project]);
  }

  async function handleRemoveRepository({id,index}) {
    await api.delete(`repositories/${id}`);

    const repositories = [...projects];
    repositories.splice(index,1)

    setProjects(repositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project,index)=><li key={project.id}>
          {project.title}

          <button onClick={() => handleRemoveRepository({id:project.id,index})}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
