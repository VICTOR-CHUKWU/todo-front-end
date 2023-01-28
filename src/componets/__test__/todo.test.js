import { cleanup, screen, render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import TodoList from "../TodoList";
import TodoListItem from "../TodoListItem";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("todo", () => {
  test("show todo list", () => {
    render(<TodoList />);
    // const list = screen.getByTestId("todo-list");
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    //   expect(true).toBe(true);
  });

  //   test("show todo list item", () => {
  //     render(<TodoListItem />);
  //     // const list = screen.getByTestId("todo-list");
  //     expect(screen.getByTestId("todo-list-item")).toBeInTheDocument();
  //     //   expect(true).toBe(true);
  //   });
});
