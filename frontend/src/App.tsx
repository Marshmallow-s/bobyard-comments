import { useEffect, useMemo, useState } from "react";
import type { Comment } from "./api/comments";
import { addComment, deleteComment, listComments, updateComment } from "./api/comments";
import CommentCard from "./components/CommentCard";
import AddCommentForm from "./components/AddCommentForm";
import "./App.css";
import seed from "./data/comments_userid.json";

type SortOrder = "newest" | "oldest";

function App() {
  const [comments, setComments] = useState<Comment[]>(seed);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === "newest" ? -diff : diff;
    });
  }, [comments, sortOrder]);

  // useEffect(() => {
  //   listComments().then(setComments);
  // }, []);

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
      <div className="toolbar">
        <label htmlFor="sort" className="sort-label">Sort by</label>
        <select
          id="sort"
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      {sortedComments.map((c) => (
        <CommentCard key={c.id} comment={c} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </main>
  );
}
export default App;