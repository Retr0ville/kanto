import axios from 'axios';
import { Todo } from '../typeDefinitions';

// delete a todo
const deleteTodo = async (id: number): Promise<Todo | any> => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
    if (!response.data) {
      throw new Error('No todo found with this id');
    }
    console.log('Todo deleted');
    return response.data as Promise<Partial<Todo>>;
  } catch (error: any) {
    return "Error: Couldn't delete todo";
  }
};

export default deleteTodo;
