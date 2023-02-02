import { api } from "../utils/api";
import { useState } from "react";

export function AddTodo() {
  const utils = api.useContext();

  const { mutate: createTodo, isLoading } = api.app.createTodo.useMutation({
    async onMutate(newTodo) {
      await utils.app.getTodos.cancel();
      const prevData = utils.app.getTodos.getData();
      utils.app.getTodos.setData(undefined, (old) => [
        ...(old || []),
        {
          ...newTodo,
          id: Math.random().toString(),
          createdAt: new Date(),
          authorId: null,
          updatedAt: new Date(),
          completed: newTodo.completed ?? false,
        },
      ]);

      return { prevData };
    },
    async onSettled() {
      setTodoText("");
      await utils.app.getTodos.invalidate();
    },
  });

  const [todoText, setTodoText] = useState("");

  return (
    <div className="flex flex-row-reverse items-center gap-2">
      <input
        className="flex-1 rounded-sm bg-blue-100 p-2"
        type="text"
        value={todoText}
        onInput={(e) => setTodoText(e.currentTarget.value)}
      />
      <button
        disabled={!todoText}
        className="rounded-sm bg-amber-400 p-2 disabled:bg-amber-100 disabled:text-gray-500"
        onClick={() => createTodo({ title: todoText, completed: false })}
      >
        Create
      </button>
    </div>
  );
}
