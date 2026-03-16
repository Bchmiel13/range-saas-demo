import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Pool } from "pg";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8080);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const databaseUrl = process.env.DATABASE_URL;

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
    })
  : null;

app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json());

const demoUsers = [
  {
    id: "1",
    email: "admin@system.pl",
    password: "Admin123!",
    role: "SUPERADMIN",
    firstName: "Super",
    lastName: "Admin",
  },
  {
    id: "2",
    email: "admin@alpha.pl",
    password: "AdminRange123!",
    role: "RANGE_ADMIN",
    firstName: "Jan",
    lastName: "Kowalski",
  },
  {
    id: "3",
    email: "user@alpha.pl",
    password: "User123!",
    role: "USER",
    firstName: "Anna",
    lastName: "Nowak",
  },
] as const;

const dashboardByRole = {
  SUPERADMIN: {
    stats: [
      { label: "Strzelnice w systemie", value: "12" },
      { label: "MRR", value: "8 940 zł" },
      { label: "Subskrypcje roczne", value: "7" },
      { label: "Użytkownicy końcowi", value: "1 824" },
    ],
    organizations: [
      { name: "Strzelnica Alpha", plan: "Roczny", status: "Aktywna", admins: 2, users: 184 },
      { name: "Range Bravo", plan: "Miesięczny", status: "Aktywna", admins: 1, users: 76 },
      { name: "Delta Shooting Club", plan: "Roczny", status: "Wygasa za 5 dni", admins: 3, users: 241 },
    ],
  },
  RANGE_ADMIN: {
    stats: [
      { label: "Dzisiejsze rezerwacje", value: "18" },
      { label: "Przychód dziś", value: "4 860 zł" },
      { label: "Wolne tory teraz", value: "3 / 4" },
      { label: "Status subskrypcji", value: "Aktywna" },
    ],
    reservations: [
      { id: "R-1021", user: "Jan Kowalski", date: "2026-03-18", time: "16:00 - 17:00", status: "Opłacona", total: "320 zł" },
      { id: "R-1022", user: "Anna Nowak", date: "2026-03-18", time: "17:00 - 18:00", status: "Oczekuje na płatność", total: "180 zł" },
      { id: "R-1023", user: "Piotr Malec", date: "2026-03-19", time: "10:00 - 11:00", status: "Opłacona", total: "140 zł" },
    ],
    lanes: [
      { name: "Tor 1", status: "Wolny" },
      { name: "Tor 2", status: "Wolny" },
      { name: "Tor 3", status: "Zajęty" },
      { name: "Tor 4", status: "Wolny" },
    ],
    weapons: [
      { id: 1, name: "Glock 17", type: "Pistolet", available: 4, price: 45 },
      { id: 2, name: "CZ Shadow 2", type: "Pistolet", available: 2, price: 60 },
      { id: 3, name: "AR-15", type: "Karabinek", available: 3, price: 85 },
      { id: 4, name: "Mossberg 500", type: "Strzelba", available: 1, price: 95 },
    ],
  },
  USER: {
    availableSlots: ["10:00 - 11:00", "11:00 - 12:00", "13:00 - 14:00", "16:00 - 17:00", "17:00 - 18:00"],
    lanes: [
      { name: "Tor 1", status: "Wolny" },
      { name: "Tor 2", status: "Wolny" },
      { name: "Tor 3", status: "Zajęty" },
      { name: "Tor 4", status: "Wolny" },
    ],
    weapons: [
      { id: 1, name: "Glock 17", type: "Pistolet", available: 4, price: 45 },
      { id: 2, name: "CZ Shadow 2", type: "Pistolet", available: 2, price: 60 },
      { id: 3, name: "AR-15", type: "Karabinek", available: 3, price: 85 },
      { id: 4, name: "Mossberg 500", type: "Strzelba", available: 1, price: 95 },
    ],
    reservations: [
      { id: "R-1021", date: "2026-03-18", time: "16:00 - 17:00", status: "Opłacona", total: "320 zł" },
      { id: "R-1022", date: "2026-03-18", time: "17:00 - 18:00", status: "Oczekuje na płatność", total: "180 zł" },
    ],
  },
} as const;

app.get("/health", async (_req, res) => {
  try {
    if (pool) {
      await pool.query("SELECT 1");
    }
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ status: "error" });
  }
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  const user = demoUsers.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ message: "Nieprawidłowy email lub hasło." });
  }

  return res.json({
    token: `demo-token-${user.role}`,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
});

app.get("/api/demo/dashboard/:role", (req, res) => {
  const role = req.params.role as keyof typeof dashboardByRole;
  const data = dashboardByRole[role];

  if (!data) {
    return res.status(404).json({ message: "Nie znaleziono widoku dla roli." });
  }

  return res.json(data);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, interestType, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    interestType?: string;
    message?: string;
  };

  if (!name || !email || !interestType || !message) {
    return res.status(400).json({
      message: "Pola name, email, interestType i message są wymagane.",
    });
  }

  if (!pool) {
    return res.status(500).json({
      message: "Brak konfiguracji DATABASE_URL po stronie backendu.",
    });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO contact_requests (name, email, phone, interest_type, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at
      `,
      [name, email, phone || null, interestType, message]
    );

    return res.status(201).json({
      message: "Zgłoszenie zostało zapisane.",
      contactRequest: result.rows[0],
    });
  } catch (error) {
    console.error("Błąd zapisu contact request:", error);
    return res.status(500).json({
      message: "Nie udało się zapisać zgłoszenia.",
    });
  }
});

app.listen(port, () => {
  console.log(`Backend działa na porcie ${port}`);
});

app.get("/api/contact-requests", async (_req, res) => {
  if (!pool) {
    return res.status(500).json({
      message: "Brak konfiguracji DATABASE_URL po stronie backendu.",
    });
  }

  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        phone,
        interest_type,
        message,
        status,
        created_at
      FROM contact_requests
      ORDER BY created_at DESC
    `);

    return res.json({
      items: result.rows,
    });
  } catch (error) {
    console.error("Błąd pobierania contact requests:", error);
    return res.status(500).json({
      message: "Nie udało się pobrać zgłoszeń.",
    });
  }
});

app.patch("/api/contact-requests/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status?: string };

  const allowedStatuses = ["new", "in_progress", "done", "rejected"];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: `Nieprawidłowy status. Dozwolone: ${allowedStatuses.join(", ")}.`,
    });
  }

  if (!pool) {
    return res.status(500).json({
      message: "Brak konfiguracji DATABASE_URL po stronie backendu.",
    });
  }

  try {
    const result = await pool.query(
      `
      UPDATE contact_requests
      SET status = $1
      WHERE id = $2
      RETURNING id, name, email, phone, interest_type, message, status, created_at
      `,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Nie znaleziono zgłoszenia o podanym id.",
      });
    }

    return res.json({
      message: "Status zgłoszenia został zaktualizowany.",
      item: result.rows[0],
    });
  } catch (error) {
    console.error("Błąd aktualizacji statusu contact request:", error);
    return res.status(500).json({
      message: "Nie udało się zaktualizować statusu zgłoszenia.",
    });
  }
});