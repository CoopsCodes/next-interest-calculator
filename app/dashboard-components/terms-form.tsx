"use client";

import { JSX } from "react/jsx-runtime";
import { useActionState } from "react";
import { interestFormAction } from "./interest-form-action";
import Button from "../components/button";
import Message from "../components/message";

const initialState = {
  message: "",
};

export default function TermsForm(): JSX.Element | null {
  const [state, formAction, pending] = useActionState(
    interestFormAction,
    initialState,
  );

  return (
    <section aria-labelledby="calculate-returns-heading">
      <h1 id="calculate-returns-heading">Calculate your returns</h1>

      <form action={formAction} className="flex flex-col">
        {state?.message ? <Message state={state} /> : null}

        <label htmlFor="amount">Enter start deposit amount:</label>
        <input type="text" name="amount" id="amount" required />

        <label htmlFor="interestRate">
          Enter interest rate (e.g., 1.10 for 1.10%):
        </label>
        <input type="text" name="interestRate" id="interestRate" required />

        <label htmlFor="term">Enter investment term (years):</label>
        <input type="text" name="term" id="term" required />

        <label htmlFor="compoundingTerm">
          Interest paid (monthly/quarterly/annually/at maturity):
        </label>

        <input
          type="text"
          name="compoundingTerm"
          id="compoundingTerm"
          required
        />

        <Button>Calculate Returns</Button>
      </form>
    </section>
  );
}
