import { useEffect, useState } from "react";
import type { Comment } from "./api/comments";
import { addComment, deleteComment, listComments, updateComment } from "./api/comments";
import CommentCard from "./components/CommentCard";
import AddCommentForm from "./components/AddCommentForm";
import "./App.css";

// 1
// | - 2 
//     | - 3
// | - 4
// 5
// | - 6 

//Map<parentid, [children comments]> 
// 1. parentid = null , continue
// 2. find comment.arentid in not map, set item -> 1:[2]
// 3. 2: [3]
// 4. found the parentId in the map, add itself to the list 1: [2,4]

function childrenMap(comments: Comment[]): Map<string, Comment[]> {
  const map = new Map<string, Comment[]>();

  for (const comment of comments) {
    if (comment.parent === "") {continue;}
    if (map.has(comment.parent)) {map.get(comment.parent)?.push(comment);} else {
      map.set(comment.parent, [comment]);
    }
  }
return map;
}


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

  const children = childrenMap(comments);
  const topComments = comments.filter((c) => c.parent === "")
  return (
    <main className="page">
      <h1>Bobyard Comments</h1>
      <AddCommentForm onAdd={handleAdd} />
      {topComments.map((c) => (
        <CommentCard key={c.id} comment={c} childrenMap= {children} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </main>
  );
}
export default App;