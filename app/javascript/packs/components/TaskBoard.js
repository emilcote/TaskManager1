import Board from "react-trello";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import LaneHeader from "./LaneHeader";
import CreatePopup from "./CreatePopup";
import EditPopup from "./EditPopup";
import TaskRepository from "./TaskRepository";

const components = {
  LaneHeader
};

const TasksBoard = props => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCardId, setEditCardId] = useState(null);
  const [board, setBoard] = useState({
    new_task: null,
    in_development: null,
    in_qa: null,
    in_code_review: null,
    ready_for_release: null,
    released: null,
    archived: null
  });

  const generateLane = (id, title) => {
    const tasks = board[id];
    return {
      id,
      title,
      totalCount: tasks ? tasks.meta.totalCount : "None",
      cards: tasks
        ? tasks.items.map(task => ({
            ...task,
            label: task.state,
            title: task.name,
            id: String(task.id)
          }))
        : []
    };
  };

  const getBoard = () => ({
    lanes: [
      generateLane("new_task", "New"),
      generateLane("in_development", "In Dev"),
      generateLane("in_qa", "In QA"),
      generateLane("in_code_review", "in CR"),
      generateLane("ready_for_release", "Ready for release"),
      generateLane("released", "Released"),
      generateLane("archived", "Archived")
    ]
  });

  const loadLines = () => {
    Promise.all([
      fetchLine("new_task"),
      fetchLine("archived"),
      fetchLine("in_development"),
      fetchLine("released"),
      fetchLine("ready_for_release"),
      fetchLine("in_qa"),
      fetchLine("in_code_review")
    ]).then(data => {
      const [
        new_task,
        archived,
        in_development,
        released,
        ready_for_release,
        in_qa,
        in_code_review
      ] = data;
      setBoard({
        new_task,
        in_development,
        in_qa,
        in_code_review,
        ready_for_release,
        released,
        archived
      });
    });
  };

  useEffect(() => {
    loadLines();
  }, []);

  const fetchLine = (state, page = 1) =>
    TaskRepository.index(state, page).then(({ data }) => data);

  const onLaneScroll = (requestedPage, state) =>
    fetchLine(state, requestedPage).then(({ items }) =>
      items.map(task => ({
        ...task,
        label: task.state,
        title: task.name
      }))
    );

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    TaskRepository.update(cardId, { task: { state: targetLaneId } }).then(
      () => {
        loadLines();
      }
    );
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateHide = () => {
    setIsCreateModalOpen(false);
  };

  const handleTaskCreated = () => {
    handleCreateHide();
    Promise.all([fetchLine("new_task")]).then(data => {
      const [new_task] = data;
      setBoard({ ...board, new_task });
    });
  };

  const onCardClick = cardId => {
    setEditCardId(cardId);
    handleEditShow();
  };

  const handleEditClose = (edited = "") => {
    setIsEditModalOpen(false);
    setEditCardId(null);
    loadLines();
  };

  const handleEditShow = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <h1>Your tasks</h1>
      <Button variant="info" onClick={handleCreateModalOpen}>
        Create new task
      </Button>
      <Board
        data={getBoard()}
        onLaneScroll={onLaneScroll}
        cardsMeta={board}
        draggable
        laneDraggable={false}
        handleDragEnd={handleDragEnd}
        components={components}
        onCardClick={onCardClick}
      />
      <CreatePopup
        show={isCreateModalOpen}
        onClose={handleCreateHide}
        onTaskCreate={handleTaskCreated}
      />
      {isEditModalOpen && (
        <EditPopup
          show={isEditModalOpen}
          onClose={handleEditClose}
          cardId={editCardId}
        />
      )}
    </div>
  );
};
export default TasksBoard;
