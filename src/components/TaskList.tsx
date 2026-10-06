import { useState } from "react";
import type { Todo } from "../hooks/useTodos";

export function TaskList({
  todos,
  onAdd,
  onSelect,
  onToggle,
}: {
  todos: Todo[];
  onAdd: (title: string) => void;
  onSelect: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
}) {
  const [title, setTitle] = useState("");

  const quickAdd = () => {
    const taskTitle = title.trim();

    if (!taskTitle) {
      return;
    }

    if (taskTitle.length > 120) {
      alert("Title must be 120 characters or less.");
      return;
    }

    onAdd(taskTitle);
    setTitle("");
  };

  return (
    <main className="list">
      <h1>Today</h1>

      {/* Add Task */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          maxLength={120}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              quickAdd();
            }
          }}
        />

        <button
          className="add"
          onClick={quickAdd}
          disabled={!title.trim()}
        >
          ＋ Add Task
        </button>
      </div>

      {/* Empty State */}
      {!todos.length ? (
        <p className="empty">
          No tasks yet. Add your first task.
        </p>
      ) : (
        /* Task List */
        todos.map((t) => (
          <div className="row" key={t.id}>
            <input
              aria-label={`Mark ${t.title} done`}
              type="checkbox"
              checked={t.done}
              onChange={(e) =>
                onToggle(t.id, e.target.checked)
              }
            />

            <button
              className={t.done ? "task done" : "task"}
              onClick={() => onSelect(t.id)}
            >
              {t.title}
            </button>

            <button
              aria-label={`Edit ${t.title}`}
              className="arrow"
              onClick={() => onSelect(t.id)}
            >
              ›
            </button>
          </div>
        ))
      )}
    </main>
  );
}