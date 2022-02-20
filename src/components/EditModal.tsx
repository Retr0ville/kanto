import React, { useEffect } from 'react';
import { Todo } from '../typeDefinitions';

type Proptypes = {
  todo: Todo | any;
  isNew: boolean;
  handleAddNew: (todo: Todo) => void;
  handleEditSave: (todo: Todo) => void;
}

const EditModal = ({
  todo, isNew, handleAddNew, handleEditSave,
} : Proptypes) => {
  const [title, setTitle] = React.useState<string>(todo.title || '');
  const [complete, setComplete] = React.useState<boolean>(todo.completed || false);
  const [msg, setMsg] = React.useState<string>('');

  const [error, setError] = React.useState<string>('');
  useEffect(() => {
    setTitle(todo.title || '');
    setComplete(todo.completed || false);
  }, [todo]);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setMsg('');
    setTitle(e.target.value);
  };
  const handleCompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg('');
    setComplete(e.target.checked);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (title.trim() === '') {
      setError('Title is required');
      return;
    }
    setError('');
    const todoToSubmit = {
      id: isNew ? Math.random() : todo.id,
      userId: isNew ? 25 : todo.userId,
      title,
      completed: complete,
    };
    if (isNew) {
      handleAddNew(todoToSubmit);
    } else {
      handleEditSave(todoToSubmit);
    }
    setMsg('close the modal to view the changes');
  };
  return (
    <div className="modal" id="editModal" tabIndex={-1} role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content bg-white">
          <div className="modal-header d-flex flex flex-column align-items-center justify-content-center py-2 ps-4">
            <h2 className="modal-title text-danger">{isNew ? 'Add a Todo' : 'Edit Todo'}</h2>
            {' '}
            <small className="text-dark fw-bold mt-2 ms-2">{msg}</small>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card bg-light">
                    <div className="card-header">
                      {!isNew && (
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="title" className="text-danger">
                          <h3 className="d-inline-block me-1">
                            Todo
                          </h3>
                          <small className="text-dark fw-bold d-inline-block">{error}</small>
                          <input type="text" required className="form-control bg-white mb-3" id="title" placeholder="Enter todo item" value={title} onChange={(e) => { handleTextChange(e); }} />
                        </label>
                        <label htmlFor="completed" className="ms-auto fw-bold text-danger pe-2">
                          Done With This?
                          <input type="checkbox" checked={complete} onChange={(e) => { handleCompleteChange(e); }} className="check ms-2" id="completed" />
                        </label>
                      </div>
                      )}
                      {isNew
                      && (
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="title" className="text-danger">
                          <h3 className="d-inline-block me-2">
                            Todo
                          </h3>
                          <small className="text-dark">{error}</small>
                          <input type="text" name="todoTitle" className="form-control bg-white mb-3" id="title" value={title} onChange={(e) => { handleTextChange(e); }} placeholder="Enter todo item" />
                        </label>
                        <label htmlFor="completed" className="ms-auto fw-bold text-danger pe-2">
                          Done With This?
                          <input type="checkbox" name="completed" className="check ms-2" checked={complete} onChange={(e) => { handleCompleteChange(e); }} id="completed" />
                        </label>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={(e) => { handleSubmit(e); }}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
