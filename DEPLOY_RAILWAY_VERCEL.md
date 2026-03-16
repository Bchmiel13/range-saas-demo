# Deploy demo

## Railway — backend
- root directory: `backend`
- build command: `npm run build`
- start command: `npm start`
- variables:
  - `FRONTEND_URL=https://twoj-frontend.vercel.app`
  - `JWT_SECRET=jakis_dlugi_sekret`

## Vercel — frontend
- root directory: `frontend`
- variable:
  - `VITE_API_URL=https://twoj-backend.up.railway.app/api`

## PostgreSQL
Ten demo backend działa bez bazy. Folder `database/` jest przygotowany jako fundament pod dalszą rozbudowę.
