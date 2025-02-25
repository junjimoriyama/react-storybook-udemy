import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../lib/store";
import { InboxScreen } from "./InboxScreen";
import { http, HttpResponse} from "msw";
// import { MockedState } from "./TaskList.stories";
import { fireEvent, waitFor, waitForElementToBeRemoved, within } from "@storybook/test";

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [
    (story) => (
      <Provider store={store}>
      {story()}
      </Provider>
    )
  ],
  tags: ["autobox"]
}

// useEffect(() => {
  // console.log(store.getState().taskBox.status)
// }, [store])


export const Default = {
  args: {
    // tasks : MockedState.tasks
  },
  play : async ({canvasElement}) => {
    const canvas = within(canvasElement)
    // await waitForElementToBeRemoved(await canvas.findByTestId("loading"))
    // await waitFor(async() => {
      // await fireEvent.click(canvas.getByText("delectus aut autem"))
      // await fireEvent.click(canvas.getByLabelText("pinTask-3"))
    // })
  }
  // parameters : {
  //   msw: {
  //     handlers: [
  //       http.get(
  //         "https://jsonplaceholder.typicode.com/todos?userId=1", 
  //         () => {
  //           [
  //             { id: 1, title: "Mocked Todo 1", state: "TASK_INBOX" },
  //             { id: 2, title: "Mocked Todo 2", state: "TASK_INBOX" },
  //           ]
  //       }),
  //     ],
  //   },
  // }
}

export const Error = {
  args: {

  }
}