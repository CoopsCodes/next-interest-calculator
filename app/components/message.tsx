interface Message {
  message: string;
}

export default function Message({ state }: { state: Message }) {
  return (
    <div className="bg-brand-yellow p-md rounded-lg border-brand-black border-2">
      <p aria-live="polite">{state.message}</p>
    </div>
  );
}
