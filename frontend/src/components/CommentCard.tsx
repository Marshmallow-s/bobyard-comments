import { useState } from "react";
import type { Comment } from "../api/comments";
import Avatar from "./Avatar";

interface CommentCardProps {
  comment: Comment;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

function CommentCard({ comment, onEdit, onDelete }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.text);

  const formattedDate = new Date(comment.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleSave() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onEdit(comment.id, trimmed);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(comment.text);
    setIsEditing(false);
  }

  return (
    <article className="comment-card">
      <Avatar name={comment.author} />
      <div className="comment-body">
        <header className="comment-header">
          <strong>{comment.author}</strong>
          <span className="comment-date">{formattedDate}</span>
        </header>

        {isEditing ? (
          <div className="edit-area">
            <textarea
              className="add-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="card-actions">
              <button className="text-button" onClick={handleSave}>Save</button>
              <button className="text-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <p className="comment-text">{comment.text}</p>
        )}

        {comment.image && (
          <img className="comment-image" src={comment.image} alt="" />
        )}
        <footer className="comment-footer">
          <span className="comment-likes">👍 {comment.likes}</span>
          {!isEditing && (
            <span className="card-actions">
              <button className="text-button" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="text-button" onClick={() => onDelete(comment.id)}>Delete</button>
            </span>
          )}
        </footer>
      </div>
    </article>
  );
}

export default CommentCard;