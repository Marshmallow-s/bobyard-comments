import { useEffect, useState } from "react";
import type { Comment } from "./api/comments";
import { addComment, deleteComment, listComments, updateComment } from "./api/comments";
import CommentCard from "./components/CommentCard";
import AddCommentForm from "./components/AddCommentForm";
import "./App.css";

function App() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    listComments().then(setComments);
  }, []);

  async function handleAdd(text: string) {
    const newComment = await addComment(text);
    setComments([newComment, ...comments]);
  }

  async function handleEdit(id: number, text: string) {
    const updated = await updateComment(id, text);
    setComments(comments.map((c) => (c.id === id ? updated : c)));
  }

  async function handleDelete(id: number) {
    await deleteComment(id);
    setComments(comments.filter((c) => c.id !== id));
  }

  return (
    <main className="page">
      <h1>Bobyard Comments</h1>
      <AddCommentForm onAdd={handleAdd} />
      {comments.map((c) => (
        <CommentCard key={c.id} comment={c} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </main>
  );
}
export default App;