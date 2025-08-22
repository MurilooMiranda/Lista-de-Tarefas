import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:3001/tarefas';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get(API_URL);
        setTarefas(response.data);
      } catch (err) {
        setError("Falha ao carregar tarefas. O servidor está online?");
        console.error("Erro ao buscar tarefas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTarefas();
  }, []);

  const handleAdicionarTarefa = async (textoDaTarefa) => {
    try {
      setError(null); 
      const response = await axios.post(API_URL, { text: textoDaTarefa });
      setTarefas([...tarefas, response.data]);
    } catch (err) {
      setError("Não foi possível adicionar a tarefa.");
      console.error("Erro ao adicionar tarefa:", err);
    }
  };

  const handleRemoverTarefa = async (id) => {
    try {
      setError(null);
      await axios.delete(`${API_URL}/${id}`);
      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    } catch (err) {
      setError("Não foi possível remover a tarefa.");
      console.error("Erro ao remover tarefa:", err);
    }
  };

  const handleMarcarcomoConcluida = async (id) => {
    try {
      setError(null);
      const response = await axios.patch(`${API_URL}/${id}/concluir`);
      setTarefas(tarefas.map(t => (t.id === id ? response.data : t)));
    } catch (err) {
      setError("Não foi possível marcar/desmarcar a tarefa.");
      console.error("Erro ao concluir tarefa:", err);
    }
  };
  
  const handleEditarTarefa = async (id, novoTexto) => {
    try {
      setError(null);
      const response = await axios.patch(`${API_URL}/${id}`, { text: novoTexto });
      setTarefas(tarefas.map(t => (t.id === id ? response.data : t)));
    } catch (err) {
      setError("Não foi possível salvar a edição da tarefa.");
      console.error("Erro ao editar tarefa:", err);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p className="status-message">Carregando tarefas...</p>;
    }
    return (
      <>
        {error && <p className="status-message error">{error}</p>}
        <TaskList
          tarefas={tarefas}
          onRemoveTask={handleRemoverTarefa}
          onToggleComplete={handleMarcarcomoConcluida}
          onEditTask={handleEditarTarefa}
        />
      </>
    );
  };

  return (
    <div className="app-container">
      <h1> Minha Lista de Tarefas</h1>
      <AddTaskForm onAddTask={handleAdicionarTarefa} />
      {renderContent()}
    </div>
  );
}

export default App;