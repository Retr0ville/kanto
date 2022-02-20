import axios from 'axios';
import { Todo } from '../typeDefinitions';

// create a new todo
const createTodo = async (todo: Partial<Todo>): Promise<Todo | any> => {
  const userTodo = {
    ...todo,
    userId: 11,
  };
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      userTodo,
    );
    return response.data as Promise<Partial<Todo>>;
  } catch (error: any) {
    return "Error: Couldn't create todo";
  }
};

export default createTodo;
