import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import TaskRepository from "./TaskRepository";
import UserSelect from "./UserSelect";

export default function CreatePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState({
    id: null,
    firstName: null,
    lastName: null,
    email: null
  });

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleDecriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleCardCreate = () => {
    TaskRepository.create({
      task: {
        name,
        description,
        assigneeId: assignee.id
      }
    }).then(() => {
      props.onTaskCreated();
      setName("");
      setDescription("");
    });
  };

  const handleAssigneeChange = value => {
    setAssignee(value);
  };

  const { show, onClose } = props;
  return (
    <Modal size="lg" animation={false} show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskName">
            <Form.Label>Task name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Set the name for the task"
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescriptionName">
            <Form.Label>Task description:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={description}
              placeholder="Set the description for the task"
              onChange={handleDecriptionChange}
            />
          </Form.Group>
          <UserSelect placeholder="Assignee" onChange={handleAssigneeChange} />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCardCreate}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

CreatePopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onTaskCreated: PropTypes.func.isRequired
};
