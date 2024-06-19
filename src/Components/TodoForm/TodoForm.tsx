import { FormEvent, useState } from "react";
import "./TodoForm.scss";

type TodoFormProps = {
  addTodo: (todo: string) => void;
};

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo === "") return;

    newTodo.trim();
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="todo-form">
      <form className="todo-form__form" onSubmit={handleSubmit}>
        <div className="todo-form__row">
          <input
            className="todo-form__search"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            type="text"
            placeholder="Add your todos here..."
            id="todo-item"
          />
          <button className="todo-form__button" type="submit">
            Add task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
