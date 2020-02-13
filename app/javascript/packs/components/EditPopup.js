import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TaskRepository from "./TaskRepository";
import PropTypes from "prop-types";
import UserSelect from "./UserSelect";

export default class EditPopup extends React.Component {
  state = {
    task: {
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
    },
    isLoading: true
  };

  loadCard = cardId => {
    this.setState({ isLoading: true });
    TaskRepository.show(cardId).then(({ data }) => {
      this.setState({ task: data, isLoading: false });
    });
  };

  componentDidMount() {
    this.loadCard(this.props.cardId);
  }

  handleNameChange = e => {
    this.setState({ task: { ...this.state.task, name: e.target.value } });
  };

  handleDecriptionChange = e => {
    this.setState({
      task: { ...this.state.task, description: e.target.value }
    });
  };

  handleCardEdit = () => {
    const { name, description, author, state, assignee } = this.state.task;
    const { cardId, onClose } = this.props;
    TaskRepository.update(cardId, {
      task: {
        name,
        description,
        authorId: author.id,
        state,
        assigneeId: assignee.id
      }
    }).then(() => {
      onClose(state);
    });
  };

  handleCardDelete = () => {
    TaskRepository.destroy(this.props.cardId).then(() => {
      this.props.onClose(this.state.task.state);
    });
  };

  handleAuthorChange = value => {
    this.setState({ task: { ...this.state.task, author: value } });
  };

  handleAssigneeChange = value => {
    this.setState({ task: { ...this.state.task, assignee: value } });
  };

  render() {
    const { id, state, name, description } = this.state.task;
    const { show, onClose } = this.props;
    const { isLoading } = this.state;
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
              Task # {id} [{state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionName">
                <Form.Label>Task description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </Form.Group>
              <UserSelect
                placeholder="Author"
                isDisabled
                value={this.state.task.author}
                onChange={this.handleAuthorChange}
              />
              <UserSelect
                placeholder="Assignee"
                onChange={this.handleAssigneeChange}
                value={this.state.task.assignee}
              />
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCardDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleCardEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

EditPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired
};
