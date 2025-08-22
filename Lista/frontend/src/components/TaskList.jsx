import TaskItem from './TaskItem';

function TaskList({ tarefas, onRemoveTask, onToggleComplete, onEditTask }) {
  return (
    <ul className="lista-tarefas">
      {tarefas.map(tarefa => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          onRemove={onRemoveTask}
          onToggle={onToggleComplete}
          onEdit={onEditTask} // Passa a função de editar para o filho
        />
      ))}
    </ul>
  );
}

export default TaskList;
