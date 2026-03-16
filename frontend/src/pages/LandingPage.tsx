import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  CalendarDays,
  CreditCard,
  Users,
  BarChart3,
  CheckCircle2,
  Target,
  Laptop,
  ChevronRight,
  PlayCircle,
  Mail,
  Phone,
  Building2,
  Crosshair,
  Lock,
  Activity,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "199 zł",
    period: "/ mies.",
    desc: "Dla jednej strzelnicy, która chce uruchomić rezerwacje online i uporządkować obsługę klientów.",
    features: [
      "1 obiekt w systemie",
      "Rezerwacje torów i broni",
      "Panel administratora",
      "Płatności online",
      "Wsparcie mailowe",
    ],
    cta: "Umów demo",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "399 zł",
    period: "/ mies.",
    desc: "Dla aktywnie działających strzelnic, które chcą automatyzować sprzedaż i zarządzanie obiektem.",
    features: [
      "Wszystko ze Starter",
      "Raporty i statystyki",
      "Powiadomienia i automatyzacje",
      "Wielu administratorów",
      "Priorytetowe wsparcie",
    ],
    cta: "Wybierz plan",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Indywidualnie",
    period: "",
    desc: "Dla większych organizacji, wielu lokalizacji i niestandardowych wdrożeń.",
    features: [
      "Wiele lokalizacji",
      "Dedykowane wdrożenie",
      "Dodatkowe integracje",
      "Rozszerzone wsparcie",
      "Onboarding i SLA",
    ],
    cta: "Porozmawiajmy",
    highlighted: false,
  },
];

const features = [
  {
    icon: CalendarDays,
    title: "Rezerwacje online 24/7",
    desc: "Klient widzi tylko wolne terminy i samodzielnie rezerwuje tory, broń oraz wybrane zasoby.",
  },
  {
    icon: Shield,
    title: "Kontrola dostępu i ról",
    desc: "Osobne widoki i uprawnienia dla użytkownika, administratora strzelnicy i właściciela platformy.",
  },
  {
    icon: CreditCard,
    title: "Subskrypcje i płatności",
    desc: "Obsługa planów miesięcznych i rocznych oraz płatności za rezerwacje i dostęp do systemu.",
  },
  {
    icon: Crosshair,
    title: "Zarządzanie torami i bronią",
    desc: "Godziny pracy, blokady techniczne, dostępność sprzętu i pełna kontrola nad kalendarzem obiektu.",
  },
  {
    icon: BarChart3,
    title: "Raporty operacyjne",
    desc: "Obłożenie torów, aktywność klientów, podstawowe dane sprzedażowe i monitoring pracy obiektu.",
  },
  {
    icon: Laptop,
    title: "Nowoczesna platforma SaaS",
    desc: "Jedna platforma dla wielu strzelnic z separacją danych i wygodnym dostępem przez przeglądarkę.",
  },
];

const faqs = [
  {
    q: "Dla kogo jest ten system?",
    a: "Dla właścicieli i operatorów strzelnic, którzy chcą sprzedawać rezerwacje online i uporządkować codzienną obsługę obiektu.",
  },
  {
    q: "Czy mogę zobaczyć demo przed zakupem?",
    a: "Tak. Landing page prowadzi do prezentacji systemu, podczas której można zobaczyć panel klienta, administratora i właściciela platformy.",
  },
  {
    q: "Czy system obsługuje wiele obiektów?",
    a: "Tak. Architektura jest przygotowana pod wiele niezależnych strzelnic działających w jednej platformie SaaS.",
  },
  {
    q: "Czy mogę sprzedawać system w abonamencie?",
    a: "Tak. System wspiera model miesięczny i roczny, więc właściciele strzelnic mogą kupować dostęp jako subskrypcję.",
  },
];

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500/80">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-zinc-400 md:text-lg">{desc}</p>
    </div>
  );
}

function Button({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition ${
        secondary
          ? "bg-zinc-900 text-zinc-100 ring-1 ring-zinc-700 hover:bg-zinc-800"
          : "bg-amber-500 text-zinc-950 hover:bg-amber-400"
      }`}
    >
      {children}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0d0b] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.08),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(74,222,128,0.06),_transparent_30%)]" />

      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#0b0d0b]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/30 bg-zinc-900 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.08)]">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">System SaaS</div>
              <div className="font-semibold tracking-tight text-zinc-100">Obsługa Strzelnicy</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-400 lg:flex">
            <a href="#funkcje" className="hover:text-amber-400">Funkcje</a>
            <a href="#jak-dziala" className="hover:text-amber-400">Jak to działa</a>
            <a href="#cennik" className="hover:text-amber-400">Cennik</a>
            <a href="#faq" className="hover:text-amber-400">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button secondary>Zaloguj się</Button>
            </Link>
            <a href="#kontakt">
              <Button>Umów demo</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className="overflow-hidden border-b border-zinc-900">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-5xl flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
                <Shield className="h-4 w-4" />
                Platforma do zarządzania rezerwacjami i sprzedażą dla strzelnic
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
                Dark landing page dla systemu w klimacie militarnym
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
                Profesjonalna strona główna, która buduje klimat, pokazuje przewagę operacyjną systemu i prowadzi właściciela strzelnicy do demo, wyboru planu oraz wdrożenia.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#kontakt">
                  <Button>
                    Umów demo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </a>
                <Link to="/login">
                  <Button secondary>
                    <PlayCircle className="h-4 w-4" />
                    Zobacz jak działa system
                  </Button>
                </Link>
              </div>

              <div className="mt-10 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
                {[
                  ["24/7", "rezerwacje online"],
                  ["SaaS", "dla wielu strzelnic"],
                  ["3 role", "użytkownik, admin, właściciel"],
                ].map(([value, label]) => (
                  <div key={value} className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 text-center shadow-[0_0_30px_rgba(0,0,0,0.25)]">
                    <div className="text-3xl font-semibold tracking-tight text-amber-400">{value}</div>
                    <div className="mt-1 text-sm text-zinc-500">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-zinc-900 bg-[#0d100d]">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 md:px-6 lg:grid-cols-4 lg:px-8">
            {[
              { icon: Lock, label: "Bezpieczna architektura", value: "Role, uprawnienia, separacja danych" },
              { icon: Activity, label: "Stały podgląd operacyjny", value: "Kalendarz, zasoby, blokady i raporty" },
              { icon: CreditCard, label: "Monetyzacja systemu", value: "Subskrypcje miesięczne i roczne" },
              { icon: Users, label: "Obsługa klientów", value: "Rezerwacje online i płatności" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-4 text-sm text-zinc-500">{item.label}</div>
                  <div className="mt-1 font-medium text-zinc-200">{item.value}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="funkcje" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <SectionTitle
            eyebrow="Funkcje"
            title="Strona główna, która sprzedaje system w mocniejszym klimacie"
            desc="Militarny, ciemny charakter lepiej pasuje do branży i jednocześnie pozwala zachować nowoczesny, premium wygląd produktu SaaS."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-zinc-100">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="jak-dziala" className="border-y border-zinc-900 bg-[#101310]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 md:py-24">
            <SectionTitle
              eyebrow="Jak to działa"
              title="Jasny proces od pierwszego wejścia do uruchomienia systemu"
              desc="Odwiedzający ma od razu wiedzieć, co zyska, jak umówi demo i jak przejdzie z prezentacji do aktywnej subskrypcji."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-4">
              {[
                ["1", "Poznaj system", "Właściciel strzelnicy widzi korzyści, funkcje i przykładowe ekrany systemu."],
                ["2", "Umów demo", "Zostawia dane kontaktowe i wybiera prezentację platformy."],
                ["3", "Wybierz plan", "Porównuje abonamenty i decyduje o zakresie wdrożenia."],
                ["4", "Uruchom obiekt", "Otrzymuje dostęp i zaczyna obsługiwać rezerwacje online."],
              ].map(([step, title, desc]) => (
                <div key={step} className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-lg font-semibold text-amber-400">
                    {step}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-zinc-100">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cennik" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <SectionTitle
            eyebrow="Cennik"
            title="Plany subskrypcyjne w ciemnej, bardziej premium oprawie"
            desc="Strona główna ma nie tylko informować, ale też budować wartość i ułatwiać wybór odpowiedniego planu."
          />

          <div className="mt-14 grid gap-6 xl:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[32px] p-7 shadow-sm ring-1 ${
                  plan.highlighted
                    ? "bg-[linear-gradient(180deg,#1c1607,#11120e)] text-zinc-50 ring-amber-500/30"
                    : "bg-zinc-900/70 text-zinc-100 ring-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
                  {plan.highlighted ? (
                    <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                      Najczęściej wybierany
                    </span>
                  ) : null}
                </div>
                <p className={`mt-3 text-sm leading-7 ${plan.highlighted ? "text-zinc-300" : "text-zinc-400"}`}>{plan.desc}</p>
                <div className="mt-6 flex items-end gap-1">
                  <div className="text-4xl font-semibold tracking-tight text-amber-400">{plan.price}</div>
                  <div className={`pb-1 text-sm ${plan.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>{plan.period}</div>
                </div>
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span className={`text-sm leading-6 ${plan.highlighted ? "text-zinc-200" : "text-zinc-300"}`}>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <button
                    className={`w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${
                      plan.highlighted ? "bg-amber-500 text-zinc-950 hover:bg-amber-400" : "bg-zinc-100 text-zinc-950 hover:bg-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="kontakt" className="border-y border-zinc-900 bg-[linear-gradient(180deg,#0f120f,#090a09)] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 md:py-24">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500/80">Umów demo</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Pokażmy Ci system w praktyce</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                Umów prezentację i zobacz realny przepływ: od strony głównej, przez panel klienta, aż po zarządzanie torami, bronią i subskrypcjami w jednej platformie.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
                  <Mail className="h-5 w-5 text-amber-400" />
                  <div className="mt-3 text-sm text-zinc-500">E-mail</div>
                  <div className="mt-1 font-medium text-zinc-200">demo@obsluga-strzelnicy.pl</div>
                </div>
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
                  <Phone className="h-5 w-5 text-amber-400" />
                  <div className="mt-3 text-sm text-zinc-500">Telefon</div>
                  <div className="mt-1 font-medium text-zinc-200">+48 500 600 700</div>
                </div>
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
                  <Building2 className="h-5 w-5 text-amber-400" />
                  <div className="mt-3 text-sm text-zinc-500">Model</div>
                  <div className="mt-1 font-medium text-zinc-200">Miesięczny / roczny SaaS</div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-[0_0_80px_rgba(0,0,0,0.35)]">
              <div className="text-2xl font-semibold tracking-tight">Formularz kontaktowy</div>
              <p className="mt-2 text-sm leading-6 text-zinc-500">Zostaw dane, a wrócimy z propozycją prezentacji i doborem planu.</p>

              <div className="mt-6 space-y-4">
                <input className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-500/40" placeholder="Imię i nazwisko" />
                <input className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-500/40" placeholder="E-mail" />
                <input className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-500/40" placeholder="Telefon" />
                <select className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-amber-500/40">
                  <option>Interesuje mnie demo systemu</option>
                  <option>Interesuje mnie plan subskrypcyjny</option>
                  <option>Interesuje mnie wdrożenie dla wielu obiektów</option>
                </select>
                <textarea className="min-h-[140px] w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-500/40" placeholder="Napisz kilka słów o swojej strzelnicy i potrzebach" />
                <button className="w-full rounded-2xl bg-amber-500 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-amber-400">
                  Wyślij zgłoszenie
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-5xl px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <SectionTitle
            eyebrow="FAQ"
            title="Najczęstsze pytania przed wdrożeniem"
            desc="Ciemna stylistyka nie zmienia celu strony: ma szybko wyjaśniać produkt i prowadzić odwiedzającego do kontaktu lub zakupu."
          />

          <div className="mt-14 space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm">
                <div className="text-lg font-semibold tracking-tight text-zinc-100">{item.q}</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900 bg-[#0a0b0a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold tracking-tight text-zinc-100">Obsługa Strzelnicy</div>
              <div className="text-sm text-zinc-500">Landing page i platforma SaaS dla strzelnic</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-zinc-500">
            <a href="#funkcje" className="hover:text-amber-400">Funkcje</a>
            <a href="#jak-dziala" className="hover:text-amber-400">Jak to działa</a>
            <a href="#cennik" className="hover:text-amber-400">Cennik</a>
            <a href="#faq" className="hover:text-amber-400">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}