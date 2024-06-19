import { Todo } from "./../../types/Todo";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.scss";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
};

const TodoList = ({ todos, toggleTodo, deleteTodo }: TodoListProps) => {
  return (
    <ul className="todo-list">
      {todos.length === 0 && (
        <p className="todo-list__heading">What are your tasks for today?</p>
      )}
      {todos.map((todo, index) => {
        return (
          <TodoItem
            isComplete={todo.isComplete}
            todo={todo.todo}
            key={index}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            index={index}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
