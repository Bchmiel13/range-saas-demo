# Range SaaS Demo

Demo repo systemu obsługi strzelnicy w modelu SaaS.

## Zawartość
- `frontend/` — React + Vite + TypeScript
- `backend/` — Node.js + Express + TypeScript
- `database/` — schema i seed dla PostgreSQL

## Szybki start lokalnie

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Dane demo
- `admin@system.pl` / `Admin123!`
- `admin@alpha.pl` / `AdminRange123!`
- `user@alpha.pl` / `User123!`

## Uwaga
To jest wersja demo/starter. Logika auth jest uproszczona, a płatności działają jako mock.
