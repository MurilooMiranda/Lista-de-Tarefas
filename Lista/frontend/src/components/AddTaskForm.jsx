import { useState } from 'react';

// Este componente recebe a função 'onAddTask' como uma propriedade (prop)
function AddTaskForm({ onAddTask }) {
  const [novoTexto, setNovoTexto] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (novoTexto.trim() === '') return;

    // Chama a função que veio do componente pai (App.jsx)
    onAddTask(novoTexto);
    
    // Limpa o input
    setNovoTexto('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={novoTexto}
        onChange={(event) => setNovoTexto(event.target.value)}
        placeholder="O que precisa ser feito?"
      />
      <button type="submit"> Adicionar </button>
    </form>
  );
}

export default AddTaskForm;
