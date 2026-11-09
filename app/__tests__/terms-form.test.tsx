import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import TermsForm from "../dashboard-components/terms-form";

test("renders the terms form, locates the header", () => {
  render(<TermsForm />);

  const section = within(
    screen.getByRole("region", { name: /Calculate your returns/i }),
  );

  expect(
    section.getByRole("heading", {
      level: 1,
      name: /Calculate your returns/i,
    }),
  ).toBeDefined();
});
