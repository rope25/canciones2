import { useEffect, useMemo, useState } from "react";
import styles from "./ListaCancionesPreferidas.module.css";

export default function ListaCancionesPreferidas() {
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

  return (
    <section className={styles.list}>
      <header className={styles.header}>
        <h2>Mi lista de canciones preferidas</h2>
        <span className={styles.count}>{canciones.length}</span>
      </header>


      <ul className={styles.grid}>
        {canciones.map((m) => (
          <li className={styles.card} key={m.id}>
            <h3>{m.titulo}</h3>
            <img src={m.poster} />
            <h4 id="Artitsta">{m.album}</h4>
            <hr />
            <h4 id="duracion" >{m.duracion}</h4>
            <hr />
            <h4 id="calificacion">{m.rating}</h4>
            <hr />
          </li>
        ))}
      </ul>
    </section>
  );
}