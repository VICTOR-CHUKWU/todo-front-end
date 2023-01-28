import App from "../../App";
import { cleanup, screen, render as rtlRender } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "../../redux/store";

const render = (component) =>
  rtlRender(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );

describe("app", () => {
  test("show app", () => {
    render(<App />);
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });
});
