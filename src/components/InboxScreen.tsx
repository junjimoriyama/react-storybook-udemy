import React, { useEffect } from "react";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../lib/store";
import { AppDispatch } from "../lib/type";

export const InboxScreen = () => {

  const { error } = useSelector((state : any) => state.taskBox)

  const dispatch: AppDispatch =  useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  if(error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad"></span>
          <div className="title-message">Oh no!</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">TaskBox</h1>
      </nav>
        <TaskList />
    </div>
  );
};
