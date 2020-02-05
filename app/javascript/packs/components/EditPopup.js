import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetch } from './Fetch';

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
    fetch('GET', window.Routes.api_v1_task_path(cardId, {format: 'json'})).then(({data}) => {
      this.setState( { task: data, isLoading: false })
    });
  }

  componentDidUpdate (prevProps) {
    if (this.props.cardId != null && this.props.cardId !== prevProps.cardId) {
      this.loadCard(this.props.cardId);
    };
  }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value }});
  }

  handleDecriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value }});
  }

  handleCardEdit = () => {
    const { name, description, author, state, assignee } = this.state.task;

    fetch('PUT', 
      window.Routes.api_v1_task_path(this.props.cardId, {format: 'json'}), {
      name,
      description,
      author_id: author.id,
      state
    }).then( 
      (response) => { 
        if (response.data) {
          this.props.onClose(state);
        }
        else {
          alert(`Update failed! ${response.status} - ${response.statusText}`);
        }
      },
      (errors) => alert(`Update failed! ${errors}`)
    )
  }

  handleCardDelete = () => {
    fetch('DELETE', window.Routes.api_v1_task_path(this.props.cardId, { format: 'json' }))
      .then( response => {
        if (response.statusText == 'OK') {
          this.props.onClose(this.state.task.state);
        }
        else {
          alert('DELETE failed! ' + response.status + ' - ' + response.statusText);
        }
      });
  }

  render () {
    const { id, state, name, description, author } = this.state.task

    if (this.state.isLoading) {
      return (
        <Modal
        animation={false}
        show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Info
            </Modal.Title>
          </Modal.Header>
           <Modal.Body>
            Your task is loading. Please be patient.
          </Modal.Body>
           <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div>
        <Modal 
        animation={false}
        show={this.props.show} onHide={this.props.onClose}>
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
            <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
            <Button variant="primary" onClick={this.handleCardEdit}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}