import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import  TaskRepository  from './TaskRepository';
import PropTypes from 'prop-types';


export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null
      },
      assignee: {
        id: null,
        first_name: null,
        last_name:  null,
        email: null
      }
    },
    isLoading: true,
  }

  loadCard = (cardId) => {
    this.setState({ isLoading: true });
    TaskRepository.show(cardId).then(({data}) => {
      this.setState( { task: data, isLoading: false })
    });
  }

  componentDidMount() {
    this.loadCard(this.props.cardId);
  }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value }});
  }

  handleDecriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value }});
  }

  handleCardEdit = () => {
    const { name, description, author, state } = this.state.task;
    const { cardId, onClose} = this.props;
    TaskRepository.update(cardId, {task: {
      name,
      description,
      author_id: author.id,
      state
  }}).then(() => {
    onClose(state);
  })
  }

  handleCardDelete = () => {
     TaskRepository.destroy(this.props.cardId)
      .then( () => {
          this.props.onClose(this.state.task.state);
      });
  }

  render () {
    const { id, state, name, description, author } = this.state.task
    const { show, onClose  } = this.props
    if (this.state.isLoading) {
      return (
        <Modal
        animation={false}
        show={show} 
        onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Info
            </Modal.Title>
          </Modal.Header>
           <Modal.Body>
            Your task is loading. Please be patient.
          </Modal.Body>
           <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div>
        <Modal 
        animation={false}
        show={show} 
        onHide={onClose}>
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
                  placeholder='Set the name for the task'
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionName">
                <Form.Label>Task description:</Form.Label>
                <Form.Control
                  as="textarea" rows="3"
                  value={description}
                  placeholder='Set the description for the task'
                  onChange={this.handleDecriptionChange}
                />
              </Form.Group>
            </Form>
            Author: {author.first_name} {author.last_name}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCardDelete}>Delete</Button>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="primary" onClick={this.handleCardEdit}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  cardId: PropTypes.number
};