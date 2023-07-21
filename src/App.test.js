import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders add customer button", () => {
  render(<App />);
  const addButton = screen.getByText(/add customer/i);
  expect(addButton).toBeInTheDocument();
});
