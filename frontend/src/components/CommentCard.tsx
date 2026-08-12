import { useState } from "react";
import type { Comment } from "../api/comments";
import Avatar from "./Avatar";

interface CommentCardProps {
  comment: Comment;
  childrenMap: Map<string, Comment[]>;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

//If comment has no children, it will plot itself
// it has children, plot CommentCard(children)
// inputs -> top level comment to be passed in 
//            need all the direct children -> recursion on the children  
function CommentCard({ comment, childrenMap, onEdit, onDelete }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.text);

  const children = childrenMap.get(comment.id.toString()) || [];

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
    <div className="comment-thread">
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
      {children.length > 0 && (
        <div className="comment-children"> {
          children.map((c) => (
            <CommentCard key={c.id} comment={c} childrenMap={childrenMap} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentCard;