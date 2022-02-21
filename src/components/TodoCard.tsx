/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckDouble, faEdit, faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../typeDefinitions';

type Proptypes = {
  todo : Todo;
  key: number;
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
  handleEdit: (id: number) => void;
}

const CardWrapper = styled.div`
  width: 17rem;
  min-width: 200px;
  min-height: 380px;
  background-color: rgb(18, 130, 254);
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  hr {
    margin-block: .3rem;
  }
  .tick {
    height: fit-content;
    // border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 10px 2px -2px rgba(0, 0, 0, 0.5);
  }
  .card-body {
    // background-color: rgb(20, 177, 253);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .card-title {
    height: fit-content;
    border-radius: 0px 10px 10px 0;
    background-color: rgb(18, 130, 254, 1);
    text-shadow: 0 10px 50px #fff;
    color: #000;
    font-weight: 400;
  }
  .controls > * {
    width: 25px;
    height: 25px;
  }
  .util-btn{
    transition: all 0.4s ease-in-out;
    &:hover {
      color: #000;
    transform: scale(1.1);

  }
  @media (max-width: 768px) {
  width: 14rem;
  min-width: 180px;
  min-height: 300px;
  }
`;

const TodoCard = ({
  todo, key, handleDelete, handleComplete, handleEdit,
}: Proptypes) => (
  <CardWrapper key={key} className="card col p-0 col-4 col-lg-3 m-1 mb-4">
    <div className="tick pb-2">
      <img src={todo.completed ? '/images/tick-green-x2.svg' : '/images/tick-red-x2.svg'} alt="ticks" className="w-100 p-4 ticker" />
    </div>
    <div className="card-body bg-dark d-flex flex-row justify-content-between px-0 py-1">
      <div className="card-title p-2 w-75">
        <p className="fw-bold p-0 m-0">{todo.completed ? 'Task Completed' : 'Pending Task'}</p>
        <hr />
        {todo.title}
      </div>
      <div className="controls text-dark d-flex flex-column align-items-center justify-content-start me-3 mt-2">
        <div onClick={() => { handleComplete(todo.id); }} role="button" title="update" className="util-btn mb-3 bg-success rounded-circle text-center">
          <FontAwesomeIcon icon={faCheckDouble} />
        </div>
        <div onClick={() => { handleDelete(todo.id); }} role="button" title="delete" className="util-btn mb-3 bg-danger rounded-circle text-center">
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
        <div onClick={() => { handleEdit(todo.id); }} role="button" title="edit" className="util-btn bg-warning rounded-circle text-center" data-bs-toggle="modal" data-bs-target="#editModal">
          <FontAwesomeIcon icon={faEdit} />
        </div>
      </div>
    </div>
  </CardWrapper>
);

export default TodoCard;
