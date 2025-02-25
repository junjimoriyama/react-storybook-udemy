import React from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import store, { updateTaskState } from "../lib/store";

type TaskType = {
  id: string;
  title: string;
  state: string;
};

type TaskListProps = {
  loading: boolean;
  tasks: TaskType[];
};

const TaskList = () => {

  const status = useSelector((state: any) => state.taskBox.status);

  const dispatch = useDispatch()

  // pinをつける処理
  const pinTask = (value: string) => {
    dispatch(updateTaskState({id: value, newTaskState: "TASK_PINNED"}))
  }

  // タスク終了
  const archiveTask = (value: string) => {
    dispatch(updateTaskState({id: value, newTaskState: "TASK_ARCHIVED"}))
  }


  const tasks = useSelector((state: any) => {
    const tasksInOrder = [ 
      ...state.taskBox.tasks.filter((t: any) => t.state === "TASK_PINNED"),
      ...state.taskBox.tasks.filter((t: any) => t.state !== "TASK_PINNED"),
    ]
    const filteredTasks = tasksInOrder.filter((t: any) => t.state === "TASK_INBOX" ||  t.state === "TASK_PINNED")
    return filteredTasks
  })

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox"></span>
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  )

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading">
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
    <div className="list-items" data-testid="empty" key={"loading"}>
      <div className="wrapper-message">
        <span className="icon-check"></span>
        <p className="title-message">You have no tasks</p>
        <p className="subtitle-message">Sit back and relax</p>
      </div>
    </div>)
  }
  return (
    <div className="list-items">
      {tasks.map((task: TaskType) => (
        <Task 
        key={task.id}                                       
        task={task} 
        pinTask={() => pinTask(task.id)}
        archiveTask={() => archiveTask(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
