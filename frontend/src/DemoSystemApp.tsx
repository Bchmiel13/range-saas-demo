import React, { useMemo, useState } from 'react';
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

type Role = 'SUPERADMIN' | 'RANGE_ADMIN' | 'USER';

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
  };
};

type SuperadminDashboard = {
  stats: { label: string; value: string; sub?: string }[];
  organizations: { name: string; plan: string; status: string; admins: number; users: number }[];
};

type RangeAdminDashboard = {
  stats: { label: string; value: string; sub?: string }[];
  reservations: { id: string; user: string; date: string; time: string; status: string; total: string }[];
  lanes: { name: string; status: string }[];
  weapons: { id: number; name: string; type: string; available: number; price: number }[];
};

type UserDashboard = {
  slots: string[];
  lanes: { name: string; status: string }[];
  weapons: { id: number; name: string; type: string; available: number; price: number }[];
  reservations: { id: string; date: string; time: string; status: string; total: string }[];
};

const Pill = ({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'green' | 'amber' | 'red' | 'blue' }) => {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-rose-100 text-rose-700',
    blue: 'bg-blue-100 text-blue-700'
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
};

const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
    <div className="text-sm text-slate-500">{label}</div>
    <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</div>
    {sub ? <div className="mt-1 text-sm text-slate-500">{sub}</div> : null}
  </div>
);

function DemoSystemApp() {
  const [email, setEmail] = useState('admin@system.pl');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');
  const [session, setSession] = useState<LoginResponse | null>(null);
  const [selectedDay, setSelectedDay] = useState('2026-03-18');
  const [selectedSlot, setSelectedSlot] = useState('16:00 - 17:00');
  const [selectedLanes, setSelectedLanes] = useState(['Tor 1']);
  const [selectedWeapons, setSelectedWeapons] = useState([{ id: 1, name: 'Glock 17', qty: 2, price: 45 }]);

  const dashboard = useMemo(() => {
    if (session?.user.role === 'SUPERADMIN') {
      return {
        stats: [
          { label: 'Strzelnice w systemie', value: '12', sub: '10 aktywnych, 2 testowe' },
          { label: 'MRR', value: '8 940 zł', sub: 'abonament miesięczny' },
          { label: 'Subskrypcje roczne', value: '7', sub: 'najwyższa wartość LTV' },
          { label: 'Użytkownicy końcowi', value: '1 824', sub: 'wszystkie tenanty' }
        ],
        organizations: [
          { name: 'Strzelnica Alpha', plan: 'Roczny', status: 'Aktywna', admins: 2, users: 184 },
          { name: 'Range Bravo', plan: 'Miesięczny', status: 'Aktywna', admins: 1, users: 76 },
          { name: 'Delta Shooting Club', plan: 'Roczny', status: 'Wygasa za 5 dni', admins: 3, users: 241 }
        ]
      };
    }

    if (session?.user.role === 'RANGE_ADMIN') {
      return {
        stats: [
          { label: 'Dzisiejsze rezerwacje', value: '18', sub: '5 opłaconych od rana' },
          { label: 'Przychód dziś', value: '4 860 zł', sub: 'rezerwacje + sprzęt' },
          { label: 'Wolne tory teraz', value: '3 / 4', sub: 'aktywny przedział 16:00–17:00' },
          { label: 'Status subskrypcji', value: 'Aktywna', sub: 'plan roczny' }
        ],
        reservations: [
          { id: 'R-1021', user: 'Jan Kowalski', date: '2026-03-18', time: '16:00 - 17:00', status: 'Opłacona', total: '320 zł' },
          { id: 'R-1022', user: 'Anna Nowak', date: '2026-03-18', time: '17:00 - 18:00', status: 'Oczekuje na płatność', total: '180 zł' },
          { id: 'R-1023', user: 'Piotr Malec', date: '2026-03-19', time: '10:00 - 11:00', status: 'Opłacona', total: '140 zł' }
        ],
        lanes: [
          { name: 'Tor 1', status: 'Wolny' },
          { name: 'Tor 2', status: 'Wolny' },
          { name: 'Tor 3', status: 'Zajęty' },
          { name: 'Tor 4', status: 'Wolny' }
        ],
        weapons: [
          { id: 1, name: 'Glock 17', type: 'Pistolet', available: 4, price: 45 },
          { id: 2, name: 'CZ Shadow 2', type: 'Pistolet', available: 2, price: 60 },
          { id: 3, name: 'AR-15', type: 'Karabinek', available: 3, price: 85 },
          { id: 4, name: 'Mossberg 500', type: 'Strzelba', available: 1, price: 95 }
        ]
      };
    }

    return {
      slots: ['10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '16:00 - 17:00', '17:00 - 18:00'],
      lanes: [
        { name: 'Tor 1', status: 'Wolny' },
        { name: 'Tor 2', status: 'Wolny' },
        { name: 'Tor 3', status: 'Zajęty' },
        { name: 'Tor 4', status: 'Wolny' }
      ],
      weapons: [
        { id: 1, name: 'Glock 17', type: 'Pistolet', available: 4, price: 45 },
        { id: 2, name: 'CZ Shadow 2', type: 'Pistolet', available: 2, price: 60 },
        { id: 3, name: 'AR-15', type: 'Karabinek', available: 3, price: 85 },
        { id: 4, name: 'Mossberg 500', type: 'Strzelba', available: 1, price: 95 }
      ],
      reservations: [
        { id: 'R-1021', date: '2026-03-18', time: '16:00 - 17:00', status: 'Opłacona', total: '320 zł' },
        { id: 'R-1022', date: '2026-03-18', time: '17:00 - 18:00', status: 'Oczekuje na płatność', total: '180 zł' }
      ]
    };
  }, [session]);

  const superadminDashboard = session?.user.role === 'SUPERADMIN' ? (dashboard as SuperadminDashboard) : null;
  const rangeAdminDashboard = session?.user.role === 'RANGE_ADMIN' ? (dashboard as RangeAdminDashboard) : null;
  const userDashboard = session?.user.role === 'USER' ? (dashboard as UserDashboard) : null;

  const total = useMemo(() => {
    const lanesCost = selectedLanes.length * 80;
    const weaponsCost = selectedWeapons.reduce((sum, w) => sum + w.qty * w.price, 0);
    return lanesCost + weaponsCost;
  }, [selectedLanes, selectedWeapons]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const body = await response.json();
        setError(body.message || 'Błąd logowania');
        return;
      }

      const body = (await response.json()) as LoginResponse;
      setSession(body);
    } catch {
      setError('Nie udało się połączyć z backendem.');
    }
  };

  const toggleLane = (laneName: string) => {
    setSelectedLanes((prev) =>
      prev.includes(laneName) ? prev.filter((x) => x !== laneName) : [...prev, laneName]
    );
  };

  const changeWeaponQty = (weapon: { id: number; name: string; price: number; available: number }, delta: number) => {
    setSelectedWeapons((prev) => {
      const existing = prev.find((w) => w.id === weapon.id);
      if (!existing && delta > 0) return [...prev, { ...weapon, qty: 1 }];
      if (!existing) return prev;
      const nextQty = existing.qty + delta;
      if (nextQty <= 0) return prev.filter((w) => w.id !== weapon.id);
      if (nextQty > weapon.available) return prev;
      return prev.map((w) => (w.id === weapon.id ? { ...w, qty: nextQty } : w));
    });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-xl ring-1 ring-slate-200 lg:grid lg:grid-cols-2">
          <div className="bg-slate-900 p-8 text-white md:p-10">
            <div className="text-sm uppercase tracking-[0.2em] text-slate-300">Demo systemu</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">System obsługi strzelnicy SaaS</h1>
            <p className="mt-4 text-slate-300">Zaloguj się jednym z kont demo, żeby zobaczyć trzy różne panele: użytkownika, administratora strzelnicy i właściciela platformy.</p>
            <div className="mt-8 space-y-3 text-sm">
              <div className="rounded-2xl bg-slate-800 p-4">admin@system.pl / Admin123!</div>
              <div className="rounded-2xl bg-slate-800 p-4">admin@alpha.pl / AdminRange123!</div>
              <div className="rounded-2xl bg-slate-800 p-4">user@alpha.pl / User123!</div>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Logowanie</h2>
            <p className="mt-2 text-sm text-slate-500">Frontend łączy się z backendem po API i przełącza widok zależnie od roli.</p>
            <form className="mt-8 space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Hasło</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
              </div>
              {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
              <button className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white hover:opacity-90">Zaloguj się</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 rounded-[28px] bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-slate-300">Zalogowano jako</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{session.user.firstName} {session.user.lastName}</h1>
              <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">Rola: {session.user.role}. To jest wersja demo z przykładowymi danymi i mockiem logowania.</p>
            </div>
            <button onClick={() => setSession(null)} className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-900">Wyloguj</button>
          </div>
        </div>

        {session.user.role === 'SUPERADMIN' && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              {superadminDashboard?.stats.map((stat) => <Stat key={stat.label} {...stat} />)}
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Strzelnice korzystające z platformy</h2>
                <div className="mt-4 space-y-3">
                  {superadminDashboard?.organizations.map((org) => (
                    <div key={org.name} className="rounded-3xl border border-slate-200 p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="text-lg font-semibold text-slate-900">{org.name}</div>
                          <div className="mt-1 text-sm text-slate-500">Administratorzy: {org.admins} • Użytkownicy: {org.users}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Pill tone={org.status.includes('Wygasa') ? 'amber' : 'green'}>{org.status}</Pill>
                          <Pill tone="blue">Plan: {org.plan}</Pill>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900">Szybkie akcje</h2>
                  <div className="mt-4 grid gap-3">
                    {['Dodaj nową strzelnicę', 'Utwórz plan subskrypcji', 'Aktywuj konto testowe', 'Zawieś nieopłaconą organizację', 'Zobacz zgłoszenia kontaktowe'].map((x) => (
                      <button key={x} className="rounded-2xl bg-slate-900 px-4 py-3 text-left font-medium text-white">{x}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {session.user.role === 'RANGE_ADMIN' && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Rezerwacje strzelnicy</h2>
                <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-left text-slate-600">
                      <tr>
                        <th className="px-4 py-3 font-medium">ID</th>
                        <th className="px-4 py-3 font-medium">Klient</th>
                        <th className="px-4 py-3 font-medium">Termin</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Kwota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {rangeAdminDashboard?.reservations.map((r) => (
                        <tr key={r.id}>
                          <td className="px-4 py-3 font-medium text-slate-900">{r.id}</td>
                          <td className="px-4 py-3 text-slate-600">{r.user}</td>
                          <td className="px-4 py-3 text-slate-600">{r.date} • {r.time}</td>
                          <td className="px-4 py-3">{r.status === 'Opłacona' ? <Pill tone="green">{r.status}</Pill> : <Pill tone="amber">{r.status}</Pill>}</td>
                          <td className="px-4 py-3 text-slate-900">{r.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900">Dostępność zasobów</h2>
                  <div className="mt-4 space-y-3">
                    {rangeAdminDashboard?.lanes.map((lane) => (
                      <div key={lane.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <div className="font-medium text-slate-900">{lane.name}</div>
                        <Pill tone={lane.status === 'Wolny' ? 'green' : 'red'}>{lane.status}</Pill>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900">Magazyn broni</h2>
                  <div className="mt-4 space-y-3">
                    {rangeAdminDashboard?.weapons.map((w) => (
                      <div key={w.id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                        <div>
                          <div className="font-medium text-slate-900">{w.name}</div>
                          <div className="text-sm text-slate-500">{w.type}</div>
                        </div>
                        <Pill tone={w.available > 1 ? 'green' : 'amber'}>{w.available} szt.</Pill>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {session.user.role === 'USER' && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Rezerwacja toru</h2>
                <p className="mt-1 text-sm text-slate-500">Użytkownik widzi tylko wolne terminy, dostępne tory i dostępną broń.</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <div className="mb-2 text-sm font-medium text-slate-700">Data</div>
                    <input value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} type="date" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" />
                  </label>
                  <div>
                    <div className="mb-2 text-sm font-medium text-slate-700">Godzina</div>
                    <div className="grid grid-cols-2 gap-2">
                      {userDashboard?.slots.map((slot) => (
                        <button key={slot} onClick={() => setSelectedSlot(slot)} className={`rounded-2xl px-3 py-3 text-sm font-medium transition ${selectedSlot === slot ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Wybór torów</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {userDashboard?.lanes.map((lane) => {
                    const disabled = lane.status !== 'Wolny';
                    const active = selectedLanes.includes(lane.name);
                    return (
                      <button key={lane.name} disabled={disabled} onClick={() => toggleLane(lane.name)} className={`rounded-3xl border p-4 text-left transition ${disabled ? 'cursor-not-allowed border-slate-200 bg-slate-100 opacity-60' : active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white hover:border-slate-400'}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-semibold">{lane.name}</div>
                            <div className={`mt-1 text-sm ${active ? 'text-slate-200' : 'text-slate-500'}`}>80 zł / godz.</div>
                          </div>
                          <Pill tone={disabled ? 'red' : 'green'}>{lane.status}</Pill>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Wybór broni</h2>
                <div className="mt-4 space-y-3">
                  {userDashboard?.weapons.map((weapon) => {
                    const current = selectedWeapons.find((w) => w.id === weapon.id)?.qty || 0;
                    return (
                      <div key={weapon.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-semibold text-slate-900">{weapon.name}</div>
                          <div className="mt-1 text-sm text-slate-500">{weapon.type} • dostępne: {weapon.available} szt. • {weapon.price} zł / szt.</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => changeWeaponQty(weapon, -1)} className="h-10 w-10 rounded-2xl bg-slate-100 text-lg font-semibold text-slate-700">−</button>
                          <div className="w-10 text-center text-lg font-semibold">{current}</div>
                          <button onClick={() => changeWeaponQty(weapon, 1)} className="h-10 w-10 rounded-2xl bg-slate-900 text-lg font-semibold text-white">+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
                <div className="text-sm text-slate-300">Podsumowanie rezerwacji</div>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-sm text-slate-400">Termin</div>
                    <div className="mt-1 font-medium">{selectedDay} • {selectedSlot}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Tory</div>
                    <div className="mt-1 font-medium">{selectedLanes.length ? selectedLanes.join(', ') : 'Nie wybrano'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Broń</div>
                    <div className="mt-1 space-y-1 text-sm">
                      {selectedWeapons.length ? selectedWeapons.map((w) => <div key={w.id}>{w.name}: {w.qty} szt.</div>) : <div>Nie wybrano</div>}
                    </div>
                  </div>
                </div>
                <div className="my-5 h-px bg-slate-700" />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-400">Łącznie</div>
                    <div className="mt-1 text-3xl font-semibold">{total} zł</div>
                  </div>
                  <button className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-900">Przejdź do płatności</button>
                </div>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Moje rezerwacje</h2>
                <div className="mt-4 space-y-3">
                  {userDashboard?.reservations.map((r) => (
                    <div key={r.id} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium text-slate-900">{r.id}</div>
                        <Pill tone={r.status === 'Opłacona' ? 'green' : 'amber'}>{r.status}</Pill>
                      </div>
                      <div className="mt-2 text-sm text-slate-600">{r.date} • {r.time}</div>
                      <div className="mt-1 text-sm text-slate-600">Kwota: {r.total}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoSystemApp;
