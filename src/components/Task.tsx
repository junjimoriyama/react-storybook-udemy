import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";


type TaskProps = {
  task: {
    id: string;
    title: string;
    state: string;
  };
  pinTask: (value: string) => void,
  archiveTask: (value: string) => void
};

export default function Task ({ task: { id, title, state }, pinTask, archiveTask}: TaskProps) {

  // const status = useSelector((state: any) => state.taskBox.status);
  

  return (
    <div className={`list-item ${state}`}>
      <label 
      htmlFor="checked" 
      className="checkbox"
      >
        <input 
        type="checkbox" 
        name="checked" 
        id={`archiveTask-${id}`} 
        />
        <span 
        className="checkbox-custom"
        onClick={() => archiveTask(id)}
        aria-label={`archiveTask-${id}`}
        ></span>
      </label>

      <label htmlFor="title" className="title" aria-label={title}>
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          placeholder="Input title"
        />
      </label>

      {state !== "TASK_ARCHIVED" && (
        <button
          className="pin-button"
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          onClick={() => pinTask(id)}
        >
        <span className="icon-star"></span>
        </button>
      )}
    </div>
  );
};

