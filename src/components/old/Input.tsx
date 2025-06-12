import type { FormEvent } from "react";

export default function Input({
  onSend,
}: {
  onSend: (message: string) => void;
}) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // @ts-expect-error: unknown
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
    onSend(data.message as string);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          id={"message"}
          name={"message"}
          placeholder={"Type your message..."}
        />
        <button>Send</button>
      </form>
    </>
  );
}
