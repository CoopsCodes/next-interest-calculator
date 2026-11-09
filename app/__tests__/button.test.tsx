import { expect, test } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { useFormStatus } from "react-dom";
import Button from "../components/button";
import { vi, describe, afterEach, beforeEach } from "vitest";

vi.mock("react-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-dom")>();
  return {
    ...actual,
    useFormStatus: vi.fn(() => ({
      pending: false,
      data: null,
      method: null,
      action: null,
    })),
  };
});

describe("Button component", () => {
  beforeEach(() => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: false,
      data: null,
      method: null,
      action: null,
    });
  });

  afterEach(() => {
    cleanup();
  });

  test("renders button component, locates the button", async () => {
    render(<Button>Button Exists</Button>);
    expect(
      screen.getByRole("button", { name: /button exists/i }),
    ).toBeDefined();
  });

  test("clicking the button submits the form", () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Button>Click Button</Button>
      </form>,
    );

    fireEvent.click(screen.getByRole("button", { name: /click button/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test("renders standard state when not pending", () => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: false,
      data: null,
      method: null,
      action: null,
    });

    render(<Button>Standard Button</Button>);

    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: /standard button/i,
    });

    expect(button.disabled).toBe(false);
  });

  test("renders pending state when pending", () => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: true,
      data: new FormData(),
      method: "post",
      action: "/",
    });

    render(<Button>Pending Button</Button>);

    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: /pending button/i,
    });

    expect(button.disabled).toBe(true);
  });

  test("does not submit the form while pending", () => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: true,
      data: new FormData(),
      method: "post",
      action: "/",
    });

    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Button>Cant Submit While Pending</Button>
      </form>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /cant submit while pending/i }),
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
