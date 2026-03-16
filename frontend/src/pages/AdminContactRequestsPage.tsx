import React, { useEffect, useState } from "react";

type ContactRequestStatus = "new" | "in_progress" | "done" | "rejected";

type ContactRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest_type: string;
  message: string;
  status: ContactRequestStatus;
  created_at: string;
};

const API_URL = "https://range-saas-demo-production.up.railway.app";

export default function AdminContactRequestsPage() {
  const [items, setItems] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadItems = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/contact-requests`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Nie udało się pobrać zgłoszeń.");
      }

      setItems(data.items || []);
    } catch (err: any) {
      console.error("Błąd pobierania zgłoszeń:", err);
      setError(err?.message || "Wystąpił błąd podczas pobierania zgłoszeń.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleStatusChange = async (id: string, status: ContactRequestStatus) => {
    setUpdatingId(id);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/contact-requests/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Nie udało się zaktualizować statusu.");
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );
    } catch (err: any) {
      console.error("Błąd aktualizacji statusu:", err);
      setError(err?.message || "Wystąpił błąd podczas aktualizacji statusu.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d0b] px-4 py-10 text-zinc-100 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500/80">
              Admin
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Zgłoszenia kontaktowe
            </h1>
            <p className="mt-3 text-zinc-400">
              Lista leadów z formularza landing page.
            </p>
          </div>

          <button
            onClick={loadItems}
            className="rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800"
          >
            Odśwież
          </button>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.25)]">
          {isLoading ? (
            <div className="p-6 text-zinc-400">Ładowanie zgłoszeń...</div>
          ) : items.length === 0 ? (
            <div className="p-6 text-zinc-400">Brak zgłoszeń.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="border-b border-zinc-800 bg-zinc-900/80">
                  <tr className="text-sm text-zinc-400">
                    <th className="px-4 py-4 font-medium">Data</th>
                    <th className="px-4 py-4 font-medium">Imię i nazwisko</th>
                    <th className="px-4 py-4 font-medium">Email</th>
                    <th className="px-4 py-4 font-medium">Telefon</th>
                    <th className="px-4 py-4 font-medium">Temat</th>
                    <th className="px-4 py-4 font-medium">Wiadomość</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-zinc-900 align-top">
                      <td className="px-4 py-4 text-sm text-zinc-300 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString("pl-PL")}
                      </td>
                      <td className="px-4 py-4 text-sm text-zinc-100">{item.name}</td>
                      <td className="px-4 py-4 text-sm text-zinc-300">{item.email}</td>
                      <td className="px-4 py-4 text-sm text-zinc-300">
                        {item.phone || "-"}
                      </td>
                      <td className="px-4 py-4 text-sm text-zinc-300">
                        {item.interest_type}
                      </td>
                      <td className="max-w-[320px] px-4 py-4 text-sm text-zinc-300">
                        <div className="whitespace-pre-wrap break-words">{item.message}</div>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={item.status}
                          disabled={updatingId === item.id}
                          onChange={(e) =>
                            handleStatusChange(
                              item.id,
                              e.target.value as ContactRequestStatus
                            )
                          }
                          className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-500/40 disabled:opacity-60"
                        >
                          <option value="new">new</option>
                          <option value="in_progress">in_progress</option>
                          <option value="done">done</option>
                          <option value="rejected">rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}