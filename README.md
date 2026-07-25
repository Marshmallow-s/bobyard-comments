# Bobyard Comments

A YouTube/Reddit-style comment feed with full CRUD (add, list, edit, delete).

- **Backend** — Django + Django REST Framework, PostgreSQL (via Docker)
- **Frontend** — React + TypeScript (Vite)

## Prerequisites

- Docker (for PostgreSQL)
- Python 3.11+
- Node 18+

## 1. Start the database

```bash
docker compose up -d db
```

Starts Postgres 16 with database/user/password all set to `bobyard`.
These match the backend defaults in `settings.py`, so no configuration is needed.

## 2. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate           # create the database tables
python manage.py seed_comments     # load comments.json into the database
python manage.py runserver         # API at http://localhost:8000
```

Re-run `python manage.py seed_comments --flush` at any time to reset
to the original 16 comments.

## 3. Frontend (in a second terminal)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — the page loads comments from the backend,
and you can add, edit, and delete them.

## API endpoints

| Method | URL | Purpose |
|---|---|---|
| GET | /api/comments/ | List all comments |
| POST | /api/comments/ | Add a comment (as Admin, stamped with current time) |
| PATCH | /api/comments/{id}/ | Edit a comment's text |
| DELETE | /api/comments/{id}/ | Delete a comment |

## Notes / next steps

With more time I would add:

- A working like button (likes are currently display-only)
- Pagination for long comment lists
- Real authentication instead of the hard-coded "Admin" author
- API and Frontend component tests