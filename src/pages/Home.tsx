/* eslint-disable max-len */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import deleteTodo from '../apis/deleteTodo';
import { getAllTodos } from '../apis/getTodoApi';
import editTodo from '../apis/editTodo';
import createTodo from '../apis/createTodo';
import TodoCard from '../components/TodoCard';
import EditModal from '../components/EditModal';
import { Todos, Todo } from '../typeDefinitions';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .spinner-grow {
    margin: 1vw;
  }
`;

const Home = () => {
  const [userTodos, setUserTodos] = React.useState<Todos>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>();
  const [error, setError] = React.useState<string>();
  const [editShowModal, setShowEditModal] = React.useState<boolean>(false);
  const [editedTodo, setEditedTodo] = React.useState<Todo>();
  const [isNew, setIsNew] = React.useState<boolean>(true);

  const handleDelete = (id: number) => {
    setIsLoading(true);
    deleteTodo(id).then((response) => {
      if (typeof response === 'string') {
        setMessage(response);
      } else {
        setUserTodos(userTodos.filter((todo) => todo.id !== id));
        setMessage('Todo deleted successfully');
      }
      setIsLoading(false);
    })
      .catch((err) => {
        setMessage(err);
        setIsLoading(false);
      });
  };
  const handleComplete = (id: number) => {
    const activeTodo = userTodos.find((todo) => todo.id === id);
    if (activeTodo) {
      const isComplete = activeTodo.completed;
      editTodo(id, { completed: !isComplete })
        .then((response) => {
          if (typeof response === 'string') {
            setMessage(response);
          } else {
            setUserTodos(userTodos.map((todo) => (todo.id === id ? { ...todo, completed: !isComplete } : todo)));
            setMessage('Todo updated successfully');
          }
        })
        .catch((err) => {
          setMessage(err);
        });
    } else {
      setMessage('Todo not found');
    }
  };
  const handleEdit = (id: number) => {
    const activeTodo = userTodos.find((todo) => todo.id === id);
    if (activeTodo) {
      setEditedTodo(activeTodo);
      setIsNew(false);
    } else {
      setMessage('Todo not found');
    }
  };
  const handleAddNew = () => {
    setEditedTodo(undefined);
    setIsNew(true);
  };
  // const handleEditModalClose = () => {
  //   setShowEditModal(false);
  // };
  const handleAddNewTodo = (todo: Todo) => {
    setIsLoading(true);
    createTodo(todo)
      .then((response) => {
        if (typeof response === 'string') {
          setMessage(response);
        } else {
          setUserTodos([{ ...response, id: Math.random() }, ...userTodos]);
          setMessage(`Todo ${response.title} added successfully`);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setMessage(err);
        setIsLoading(false);
      });
  };

  const handleEditModalSave = (todo: Todo) => {
    // setShowEditModal(false);
    setIsLoading(true);
    editTodo(todo.id, todo)
      .then((response) => {
        if (typeof response === 'string') {
          setMessage(response);
        } else {
          setUserTodos(userTodos.map((td) => (td.id === todo.id ? todo : td)));
          setMessage(`Todo "${response.title}" updated successfully`);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setMessage(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllTodos().then((response) => {
      if (typeof response === 'string') {
        setError(response);
      } else {
        setUserTodos(response);
      }
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }, [message]);

  return (
    <div className="container d-flex flex-column">
      <button type="button" onClick={() => { handleAddNew(); }} className="btn btn-dark  ms-auto me-5 mb-4" data-bs-toggle="modal" data-bs-target="#editModal">
        Add New Todo
      </button>
      <EditModal
        todo={isNew ? {} : editedTodo}
        isNew={isNew}
        handleAddNew={handleAddNewTodo}
        handleEditSave={handleEditModalSave}
      />
      <div className="row w-100 d-flex align-items-center">
        <div className="col-11 offset-1">
          <div className="row">
            {message && <div className="alert alert-success bg-dark text-light message">{message}</div>}
            {
      isLoading
        && (
          <SpinnerWrapper>
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only" />
            </div>
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only" />
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only" />
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only" />
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="sr-only" />
            </div>
          </SpinnerWrapper>
        )
        }
            {
           !isLoading
         && (
           error ? (
             <div className="alert alert-danger" role="alert">
               {error}
             </div>
           ) : (
             userTodos.map((td) => (
               <TodoCard
                 handleDelete={handleDelete}
                 handleComplete={handleComplete}
                 handleEdit={handleEdit}
                 key={td.id}
                 todo={td}
               />
             )))
         )
        }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
