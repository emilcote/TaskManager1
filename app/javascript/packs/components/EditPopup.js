import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import TaskRepository from "./TaskRepository";
import UserSelect from "./UserSelect";

const EditPopup = props => {
  const [task, setTask] = useState({
    id: null,
    name: "",
    description: "",
    state: null,
    author: {
      id: null,
      firstName: null,
      lastName: null,
      email: null
    },
    assignee: {
      id: null,
      firstName: null,
      lastName: null,
      email: null
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadCard = cardId => {
    TaskRepository.show(cardId).then(({ data }) => {
      setTask(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadCard(props.cardId);
  }, [props.cardId]);

  const handleNameChange = e => {
    setTask({ ...task, name: e.target.value });
  };

  const handleDecriptionChange = e => {
    setTask({ ...task, description: e.target.value });
  };

  const handleCardEdit = () => {
    const { name, description, author, state, assignee } = task;
    const { cardId, onClose } = props;
    TaskRepository.update(cardId, {
      task: {
        name,
        description,
        authorId: author.id,
        state,
        assigneeId: assignee.id
      }
    }).then(() => {
      onClose(task.state);
    });
  };

  const handleCardDelete = () => {
    TaskRepository.destroy(props.cardId).then(() => {
      props.onClose(task.state);
    });
  };

  const handleAuthorChange = value => {
    setTask({ ...task, author: { ...value } });
  };

  const handleAssigneeChange = value => {
    setTask({ ...task, assignee: value });
  };

  const { show, onClose } = props;
  if (isLoading) {
    return (
      <Modal animation={false} show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <div>
      <Modal animation={false} show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Task # {task.id} [{task.state}]
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task name:</Form.Label>
              <Form.Control
                type="text"
                value={task.name}
                placeholder="Set the name for the task"
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescriptionName">
              <Form.Label>Task description:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={task.description}
                placeholder="Set the description for the task"
                onChange={handleDecriptionChange}
              />
            </Form.Group>
            <UserSelect
              placeholder="Author"
              isDisabled
              value={task.author}
              onChange={handleAuthorChange}
            />
            <UserSelect
              placeholder="Assignee"
              onChange={handleAssigneeChange}
              value={task.assignee}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleCardDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCardEdit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default EditPopup;

EditPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired
};
