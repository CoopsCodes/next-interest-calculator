import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Dashboard from "../page";

test("renders the dashboard page, locates the header", () => {
  render(<Dashboard />);

  const main = within(screen.getByRole("main"));

  expect(
    main.getByRole("heading", {
      level: 1,
      name: /A simple calculator for term deposits/i,
    }),
  ).toBeDefined();
});
