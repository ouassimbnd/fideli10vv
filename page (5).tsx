"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { configured, supabase, errorMessage } from "@/lib/supabase";
type Stat = { id: string; name: string; active: boolean; total: number; last7: number; last30: number };
export default function Caisse() {
  const [businessId, setBusinessId] = useState(""); const [name, setName] = useState(""); const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true); const [busy, setBusy] = useState(false); const [message, setMessage] = useState("");
  const load = useCallback(async () => {
    if (!configured) { setLoading(false); return; }
    try {
      const client = supabase(); const { data: { user } } = await client.auth.getUser();
      if (!user) { location.replace("/business/login"); return; }
      const { data: b, error } = await client.from("businesses").select("id").eq("owner_id", user.id).maybeSingle();
      if (error) throw error; if (!b) { location.replace("/business/new"); return; }
      setBusinessId(b.id);
      const res = await client.rpc("cashier_stats", { p_business: b.id }); if (res.error) throw res.error;
      setStats((res.data || []) as Stat[]);
    } catch (e) { setMessage(errorMessage(e)); } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const add = async (e: FormEvent) => {
    e.preventDefault(); if (busy || !businessId) return; setBusy(true); setMessage("");
    const { error } = await supabase().rpc("add_cashier", { p_business: businessId, p_name: name });
    setMessage(error ? error.message : "Caissier ajouté."); if (!error) { setName(""); await load(); } setBusy(false);
  };
  const toggle = async (s: Stat) => {
    if (busy) return; setBusy(true); setMessage("");
    const { error } = await supabase().rpc("set_cashier_active", { p_cashier: s.id, p_active: !s.active });
    setMessage(error ? error.message : s.active ? "Caissier désactivé." : "Caissier réactivé."); if (!error) await load(); setBusy(false);
  };
  if (!configured) return <div className="container page"><h1>Configuration requise</h1><p>Ajoutez les variables Supabase dans Vercel.</p></div>;
  if (loading) return <div className="container page"><p>Chargement de l’espace caisse…</p></div>;
  const max = Math.max(1, ...stats.map(s => s.total)); const total = stats.reduce((a, s) => a + s.total, 0);
  return <div className="container page dashboard">
    <div className="dashboard-header"><div><span className="kicker">ESPACE CAISSE</span><h1>Vos caissiers<span className="brand-period">.</span></h1><p>Ajoutez vos caissiers et suivez le nombre de fidélisations (passages validés) de chacun.</p></div><div className="panel-actions"><Link className="button outline" href="/business">← Tableau de bord</Link></div></div>
    <div className="stats"><div className="stat"><span>CAISSIERS ACTIFS</span><strong>{stats.filter(s => s.active).length}</strong><small>Peuvent valider des passages</small></div><div className="stat"><span>FIDÉLISATIONS ATTRIBUÉES</span><strong>{total}</strong><small>Passages validés par un caissier</small></div></div>
    <section className="panel"><span className="kicker">AJOUTER</span><h2>Nouveau caissier</h2>
      <form className="caisse-form" onSubmit={add}><input value={name} onChange={e => setName(e.target.value)} placeholder="Prénom du caissier" minLength={2} maxLength={60} required aria-label="Prénom du caissier"/><button className="button dark" disabled={busy}>Ajouter</button></form>
      <p>Sur le tableau de bord, choisissez le caissier avant de valider un passage : il sera compté dans ses résultats.</p></section>
    <section className="panel"><span className="kicker">RÉSULTATS</span><h2>Fidélisations par caissier</h2>
      {!stats.length ? <p>Aucun caissier pour l’instant. Ajoutez le premier ci-dessus.</p> : <div className="member-list">{stats.map(s => <div className="member-row" key={s.id} style={{ opacity: s.active ? 1 : .55 }}>
        <div style={{ flex: 1 }}><strong>{s.name}{!s.active && " (désactivé)"}</strong><p>{s.total} au total · {s.last30} sur 30 jours · {s.last7} sur 7 jours</p><div className="bar" aria-hidden="true"><i style={{ width: `${Math.round(s.total / max * 100)}%` }}/></div></div>
        <button className="button outline" disabled={busy} onClick={() => toggle(s)}>{s.active ? "Désactiver" : "Réactiver"}</button></div>)}</div>}
    </section>
    {message && <p role="status">{message}</p>}
  </div>;
}
