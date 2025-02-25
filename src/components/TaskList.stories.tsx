import React from "react";
import Task from "./Task";
import * as TaskStories from "./Task.stories";
import TaskList from "./TaskList";
import store, { defaultTask, TasksSlice } from "../lib/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, waitForElementToBeRemoved, within } from "@storybook/test";

 const MockedState = {
  tasks: Array.from({ length: 6 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Task ${i + 1}`,
    state: "TASK_INBOX",
  })),
  status: "idle",
  error: null,
};

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story: any) => <div style={{ padding: "3rem" }}>{story()}</div>],
  excludesStories: /.*MockedState$/
};


const MockStore = ({ taskBoxState, children }) => {
  return (
    // providerで囲む
    <Provider
      store={configureStore({
        reducer: {
          // TasksSlice.reducerをtaskBoxという名前で使えるようにする
          taskBox: TasksSlice.reducer,
        },
        preloadedState: {
          taskBox: taskBoxState,
        },
      })}
    >
      {children}
    </Provider>
  );
};

export const Default = {
  decorators: [
    (story: any) => (
      // story() を呼び出すことで TaskListをレンダリング
      <MockStore taskBoxState={MockedState}>{story()}</MockStore>
    ),
  ],
  play: ({canvasElement}) => {
    const canvas = within(canvasElement)
    fireEvent.click(canvas.getByLabelText("pinTask-3"))
    fireEvent.click(canvas.getByLabelText("pinTask-5"))
    fireEvent.click(canvas.getByLabelText("archiveTask-3"))
  }
};

export const WithPinnedTasks = {
  decorators: [
    (story: any) => {
      {
        // 6つのtaskのうち最後の1つのみpinnedにする
        const pinnedArray = [
          ...MockedState.tasks.slice(0, 5),
          { id: "6", title: "task pinned", state: "TASK_PINNED" },
        ];
        return (
          <MockStore
            taskBoxState={{
              ...MockedState,
              tasks: pinnedArray,
            }}
          >
            {story()}
          </MockStore>
        );
      }
    },
  ],
};

export const Loading = {
  decorators: [
    (story: any) => {
      return <MockStore 
        taskBoxState={{
          ...MockedState,
          status: "loading"
        }}
      >
        { story() }
      </MockStore>
    }
    
  ]
};

export const Empty = {
  decorators: [
    (story: any) => {
      return <MockStore
        taskBoxState={{
          ...MockedState,
          tasks: []
        }}
      >
        { story() }
      </MockStore>
    }
  ]
};