import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import Message from "../components/message";

describe("Message component", () => {
  const state = {
    message: "Initial message",
  };

  render(<Message state={state} />);

  test("renders message component", () => {
    expect(screen.getByText(/Initial message/i)).toBeDefined();
  });

  test("announces the message to assistive tech", () => {
    expect(screen.getByText(/initial message/i).getAttribute("aria-live")).toBe(
      "polite",
    );
  });
});
