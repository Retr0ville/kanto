import axios from 'axios';
import { Todo, Todos } from '../typeDefinitions';

export const getAllTodos = async (): Promise<Todos | any> => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users/1/todos',
    );
    if (response.data.length === 0) {
      return 'No todos found for this user';
    }
    return response.data as Promise<Partial<Todos>>;
  } catch (error: any) {
    return "Error: Couldn't fetch todos";
  }
};

export const getTodo = async (id: number): Promise<Todo | any> => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users/1/todos',
    );
    const { data } = response;
    if (data.length === 0) {
      return 'This user may not have any todos';
    }
    const userTodo = data.find((todo: Todo) => todo.id === id);
    if (!userTodo) {
      return 'No todo found with this id';
    }
    return userTodo as Promise<Partial<Todo>>;
  } catch (error: any) {
    return "Error: Couldn't fetch todo";
  }
};
