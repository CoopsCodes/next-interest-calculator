"use client";

import { useFormStatus } from "react-dom";

export default function Button({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button className="primary-button" disabled={pending}>
      {children}
    </button>
  );
}
