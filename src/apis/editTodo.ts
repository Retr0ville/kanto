import axios from 'axios';
import { Todo } from '../typeDefinitions';

const editTodo = async (id: number, todoEdit: Partial<Todo>): Promise<Todo | any> => {
  try {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      todoEdit,
    );
    // if (response.data.keys.length === 0) {
    //   throw new Error('No todo found with this id');
    // }
    return response.data as Promise<Partial<Todo>>;
  } catch (error: any) {
    return `Couldn't edit todo, ${error.message}`;
  }
};

export default editTodo;
