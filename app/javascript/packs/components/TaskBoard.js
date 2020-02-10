import React from "react";
import Board from "react-trello";
import LaneHeader from './LaneHeader';
import Button from 'react-bootstrap/Button';
import CreatePopup from './CreatePopup';
import EditPopup from './EditPopup';
import  TaskRepository  from './TaskRepository';

const components = {
  LaneHeader: LaneHeader
};

export default class TasksBoard extends React.Component {
  state = {
    board: {
      newTask: null,
      inDevelopment: null,
      inQa: null,
      inCodeReview: null,
      readyForRelease: null,
      released: null,
      archived: null
    },
    addPopupShow: false,
    editPopupShow: false,
    editCardId: null,
  }

  generateLane(id, title) {
    const tasks = this.state[id];

    return {
      id,
      title,
      totalCount: (tasks) ? tasks.meta.totalCount : 'None',
      cards: (tasks) ? tasks.items.map((task) => {
        return {
          ...task,
          label: task.state,
          title: task.name
        };
      }) : []
    }
  }

  getBoard() {
    return {
      lanes: [
        this.generateLane('new_task', 'New'),
        this.generateLane('in_development', 'In Dev'),
        this.generateLane('in_qa', 'In QA'),
        this.generateLane('in_code_review', 'in CR'),
        this.generateLane('ready_for_release', 'Ready for release'),
        this.generateLane('released', 'Released'),
        this.generateLane('archived', 'Archived'),
      ],
    };
  }

  loadLines() {
    this.loadLine('new_task');
    this.loadLine('in_development');
    this.loadLine('in_qa');
    this.loadLine('in_code_review');
    this.loadLine('ready_for_release');
    this.loadLine('released');
    this.loadLine('archived');
  }

  componentDidMount() {
    this.loadLines();
  }

  loadLine(state, page = 1) {
    this.fetchLine(state, page).then(( data ) => {
      this.setState({
        [state]: data
      });
    });
  }

  fetchLine(state, page = 1) {
    return TaskRepository.index(state, page).then(({data}) => {
      return data;
    })
  }

  onLaneScroll = (requestedPage, state) => {
    return this.fetchLine(state, requestedPage).then(({items}) => {
      return items.map((task) => {
        return {
          ...task,
          label: task.state,
          title: task.name
        };
      });
    })
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
      TaskRepository.update(cardId, {task: {state: targetLaneId}}).then(() => {
        this.loadLine(sourceLaneId);
        this.loadLine(targetLaneId);
      });
  }

  handleAddShow = () => {
    this.setState({ addPopupShow: true });
  }
  
  handleTaskAdded = () => {
    this.setState({ addPopupShow: false });
    this.loadLine('new_task');
  }

  handleAddHide = () => {
    this.setState({ addPopupShow: false });
  }
  
  onCardClick = (cardId) => {
    this.setState({editCardId: cardId});
    this.handleEditShow();
  }
  
  handleEditClose = ( edited = '' ) => {
    this.setState({ editPopupShow: false, editCardId: null});
    switch (edited) {
      case 'new_task':
      case 'in_development':
      case 'in_qa':
      case 'in_code_review':
      case 'ready_for_release':
      case 'released':
      case 'archived':
        this.loadLine(edited);
        break;
      default:
        break;
    }
  }
  
  handleEditShow = () => {
    this.setState({ editPopupShow: true });
  }

  render() {
    return <div>
      <h1>Your tasks</h1>
      <Button variant="primary" 
          onClick={this.handleAddShow}>Create new task
      </Button>
      <Board
        data={this.getBoard()}
        onLaneScroll={this.onLaneScroll}
        customLaneHeader={<LaneHeader/>}
        cardsMeta={this.state}
        draggable laneDraggable={false}
        handleDragEnd={this.handleDragEnd}
        components={components} 
        onCardClick={this.onCardClick}
      />
      <CreatePopup
        show = {this.state.addPopupShow}
        onClose = {this.handleAddHide}
        onTaskAdded = {this.handleTaskAdded}
      />
      {this.state.editPopupShow &&
      <EditPopup
        show = {this.state.editPopupShow}
        onClose={this.handleEditClose}
        cardId ={this.state.editCardId}
      />}
    </div>;
  }
}