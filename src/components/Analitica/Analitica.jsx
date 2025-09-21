import { useEffect, useMemo, useState } from "react";
import styles from "./Analitica.module.css";

export default function Analitica() {
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

useEffect(() => {
  (async () => {
    try {
      const res = await fetch("/canciones.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCanciones(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Error cargando JSON");
    } finally {
      setLoading(false);
    }
  })();
}, []);

// === Derivados (demostrando métodos básicos) ===


// 2) Estadísticas con reduce
const stats = useMemo(() => {
  if (!canciones.length) {
    return { avgRating: 0, count: 0, best: null };
  }

  const total = canciones.reduce((sum, m) => sum + (m.rating ?? 0), 0);
  const avgRating = total / canciones.length;

  const best = canciones.reduce((acc, m) => (m.rating > (acc?.rating ?? -1) ? m : acc), null);

  return { avgRating, count: canciones.length, best };
}, [canciones]);

// 3) Búsqueda con find (ejemplo simple)
// const inception = useMemo(
//    () => canciones.find((m) => m.title.toLowerCase().includes("insurreccion")),
//    [canciones]
//    log console (m)
//  );

// // 4) Validaciones con some / every
// const hasLowRated = useMemo(() => canciones.some((m) => (m.rating ?? 0) < 5), [canciones]);
// log console (some)
// const allAfter1990 = useMemo(() => canciones.every((m) => (m.year ?? 0) >= 1990), [canciones]);
// log console 


   if (loading) return <p className={styles.status}>Cargando…</p>;
   if (error) return <p className={styles.error}>Error: {error}</p>;

   return (
     <section className={styles.wrapper}>
       <header className={styles.header}>
         <h2>Analitica canciones</h2>
         <div className={styles.stats}>
           <span>Total: <strong>{stats.count}</strong></span>
           <span>Promedio ★ <strong>{stats.avgRating.toFixed(2)}</strong></span>
       
           {stats.best && <span>Top: <strong>{stats.best.title} ({stats.best.rating})</strong></span>}
         </div>

         <div></div>
         
       </header>

    </section>
   );
}
