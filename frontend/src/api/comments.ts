export interface Comment {
    id: number;
    user_id: string;
    author: string;
    text: string;
    date: string;
    likes: number;
    image: string;
  }
  
  const API_URL = "http://localhost:8000/api";

  export async function listComments(): Promise<Comment[]> {
    const res = await fetch(`${API_URL}/comments/`);
    if (!res.ok) {
      throw new Error(`Failed to load comments: ${res.status}`);
    }
    return res.json();
  }

  export async function addComment(text: string): Promise<Comment> {
    const res = await fetch(`${API_URL}/comments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: "Admin", text }),
    });
    if (!res.ok) {
      throw new Error(`Failed to add comment: ${res.status}`);
    }
    return res.json();
  }

  export async function updateComment(id: number, text: string): Promise<Comment> {
    const res = await fetch(`${API_URL}/comments/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      throw new Error(`Failed to update comment: ${res.status}`);
    }
    return res.json();
  }
  
  export async function deleteComment(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/comments/${id}/`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete comment: ${res.status}`);
    }
  }