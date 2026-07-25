import { useState } from "react";

interface AddCommentFormProps {
  onAdd: (text: string) => void;
}

function AddCommentForm({ onAdd }: AddCommentFormProps) {
  const [text, setText] = useState("");

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  }

  return (
    <div className="add-form">
      <textarea
        className="add-input"
        placeholder="Add a comment as Admin..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="add-button" onClick={handleSubmit}>
        Comment
      </button>
    </div>
  );
}

export default AddCommentForm;