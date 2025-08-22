import { useState } from 'react';

function TaskItem({ tarefa, onRemove, onToggle, onEdit }) {
  // Estado para controlar se o modo de edição está ativo
  const [isEditing, setIsEditing] = useState(false);
  // Estado para guardar o texto enquanto está sendo editado
  const [editText, setEditText] = useState(tarefa.text);

  const handleSave = () => {
    // Chama a função de editar que veio do App.jsx
    onEdit(tarefa.id, editText);
    // Desativa o modo de edição
    setIsEditing(false);
  };

  // Se estiver em modo de edição, mostra um input e um botão de salvar
  if (isEditing) {
    return (
      <li className="editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button className="save-btn" onClick={handleSave}>Salvar</button>
      </li>
    );
  }

  // Se não, mostra o modo de visualização normal
  return (
    <li className={tarefa.concluida ? 'concluida' : ''}>
      <span onClick={() => onToggle(tarefa.id)}>
        {tarefa.text}
      </span>
      <div className="task-buttons">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Editar</button>
        <button className="remove-btn" onClick={() => onRemove(tarefa.id)}>
          Remover
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
