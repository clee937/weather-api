import "./TodoItem.scss";

type TodoItemProps = {
  todo: string;
  index: number;
  isComplete: boolean;
  toggleTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
};

const TodoItem = ({
  todo,
  index,
  isComplete,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) => {
  return (
    <li className="todo-item">
      <label>
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={isComplete}
          onChange={() => toggleTodo(index)}
        />
        <span
          className={`todo-item__title ${
            isComplete ? "todo-item__title--completed" : ""
          }`}
        >
          {todo}
        </span>
      </label>
      <button onClick={() => deleteTodo(index)} className="todo-item__button">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
