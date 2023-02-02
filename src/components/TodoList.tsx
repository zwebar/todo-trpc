import { api } from "../utils/api";
import { MutatingDots } from "react-loader-spinner";

export function TodoList() {
  const utils = api.useContext();
  const { isLoading, data } = api.app.getTodos.useQuery();

  const { mutate: updateTodo, isLoading: isUpdateLoading } =
    api.app.updateTodo.useMutation({
      async onSettled() {
        await utils.app.getTodos.invalidate();
      },
    });

  return (
    <div className="flex flex-col gap-2 rounded-md bg-blue-600 p-8">
      {isLoading && (
        <MutatingDots
          height="80"
          width="80"
          color="green"
          ariaLabel="loading"
        />
      )}
      {data &&
        data.map((todo) => (
          <div key={todo.id} className="flex rounded-md bg-blue-500 p-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onInput={() =>
                updateTodo({
                  id: todo.id,
                  title: todo.title,
                  completed: !todo.completed,
                })
              }
            />

            {todo.title}
          </div>
        ))}
    </div>
  );
}
