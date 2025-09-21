import { useCallback } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Si hay campos inválidos, muestra los mensajes nativos del navegador
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 1) Log detallado de TODOS los elementos del formulario
    const all = Array.from(form.elements).map((el) => ({
      tag: el.tagName.toLowerCase(),
      type: el.type,
      name: el.name || null,
      id: el.id || null,
      value:
        el.type === "checkbox" ? el.checked
        : el.type === "radio" ? (el.checked ? el.value : "")
        : el.value,
      disabled: el.disabled || false,
      required: el.required || false,
    }));
    // console.log("🧩 Elementos del formulario:", all);

    // 2) Payload desde FormData (maneja múltiples valores con el mismo name)
    const fd = new FormData(form);
    const data = {};
    for (const [key, value] of fd.entries()) {
      if (key in data) {
        if (Array.isArray(data[key])) data[key].push(value);
        else data[key] = [data[key], value];
      } else {
        data[key] = value;
      }
    }
    // console.log("📦 Payload FormData:", data);

    // Aquí harías submit a tu API
    // fetch("/api", { method: "POST", body: fd })
  }, []);

  const handleReset = useCallback(() => {
    console.log("↩️ Form reset");
  }, []);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <h2>Formulario de ejemplo</h2>
        <p className={styles.subtitle}>
          Validaciones nativas HTML y estilos.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset} noValidate>
        {/* ——— Datos personales ——— */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Datos personales</legend>

          <div className={styles.grid2}>
            <label className={styles.label}>
              Nombre *
              <input
                className={styles.input}
                name="firstName"
                type="text"
                placeholder="Lucía"
                required
                minLength={2}
                maxLength={40}
                pattern="^[A-Za-zÀ-ÿ'\-\s]+$"
                title="Solo letras, espacios, apóstrofes o guiones"
              />
            </label>

            <label className={styles.label}>
              Apellidos *
              <input
                className={styles.input}
                name="lastName"
                type="text"
                placeholder="Pérez García"
                required
                minLength={2}
                maxLength={60}
                pattern="^[A-Za-zÀ-ÿ'\-\s]+$"
                title="Solo letras, espacios, apóstrofes o guiones"
              />
            </label>

            <label className={styles.label}>
              Email *
              <input
                className={styles.input}
                name="email"
                type="email"
                placeholder="lucia@ejemplo.com"
                required
              />
            </label>

            <label className={styles.label}>
              Teléfono
              <input
                className={styles.input}
                name="phone"
                type="tel"
                placeholder="+34 600 123 123"
                pattern="^[+0-9\s\-()]{7,20}$"
                title="Introduce un teléfono válido"
              />
            </label>

            <label className={styles.label}>
              Fecha de nacimiento *
              <input
                className={styles.input}
                name="birthdate"
                type="date"
                required
                max="2025-12-31"
              />
            </label>

            <label className={styles.label}>
              Edad *
              <input
                className={styles.input}
                name="age"
                type="number"
                required
                min={1}
                max={120}
                step={1}
              />
            </label>
          </div>
        </fieldset>

        {/* ——— Cuenta ——— */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Cuenta</legend>
          <div className={styles.grid2}>
            <label className={styles.label}>
              Usuario *
              <input
                className={styles.input}
                name="username"
                type="text"
                required
                minLength={4}
                maxLength={24}
                pattern="^[A-Za-z0-9_.-]+$"
                title="Letras, números, guiones, guiones bajos y puntos"
                placeholder="luciadev"
              />
            </label>

            <label className={styles.label}>
              Web
              <input
                className={styles.input}
                name="website"
                type="url"
                placeholder="https://tusitio.dev"
              />
            </label>

            <label className={styles.label}>
              Contraseña *
              <input
                className={styles.input}
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
              />
            </label>

            <label className={styles.label}>
              Hora preferida de contacto
              <input
                className={styles.input}
                name="contactTime"
                type="time"
              />
            </label>
          </div>
        </fieldset>

        {/* ——— Preferencias ——— */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Preferencias</legend>

          <div className={styles.grid2}>
            <label className={styles.label}>
              País *
              <select className={styles.select} name="country" required defaultValue="">
                <option value="" disabled>Selecciona...</option>
                <option value="ES">España</option>
                <option value="AR">Argentina</option>
                <option value="MX">México</option>
                <option value="CO">Colombia</option>
                <option value="CL">Chile</option>
              </select>
            </label>

            <label className={styles.label}>
              Ciudad
              <input className={styles.input} name="city" type="text" placeholder="Madrid" />
            </label>
          </div>

          <div className={styles.groupRow}>
            <span className={styles.groupLabel}>Newsletter *</span>
            <label className={styles.option}>
              <input type="radio" name="newsletter" value="yes" required />
              <span>Sí</span>
            </label>
            <label className={styles.option}>
              <input type="radio" name="newsletter" value="no" required />
              <span>No</span>
            </label>
          </div>

          <div className={styles.groupCol}>
            <span className={styles.groupLabel}>Géneros favoritos (múltiple)</span>
            <div className={styles.tags}>
              {["Drama", "Acción", "Sci-Fi", "Thriller", "Animación", "Comedia"].map((g) => (
                <label key={g} className={styles.tagCheck}>
                  <input type="checkbox" name="genres" value={g} />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          <label className={styles.label}>
            Valoración media que sueles dar (0–10)
            <input
              className={styles.range}
              name="ratingHabit"
              type="range"
              min="0"
              max="10"
              step="0.1"
              defaultValue="7.5"
            />
          </label>

          <label className={styles.label}>
            Color favorito
            <input className={styles.input} name="favColor" type="color" defaultValue="#111827" />
          </label>

          <label className={styles.label}>
            Sobre ti *
            <textarea
              className={styles.textarea}
              name="bio"
              required
              rows={4}
              maxLength={300}
              placeholder="Cuéntanos algo en 300 caracteres…"
            />
          </label>

          <label className={styles.checkboxRow}>
            <input type="checkbox" name="terms" required />
            <span>Acepto términos y condiciones *</span>
          </label>
        </fieldset>

        {/* ——— Acciones ——— */}
        <div className={styles.actions}>
          <button type="reset" className={styles.btnSecondary}>Reset</button>
          <button type="submit" className={styles.btnPrimary}>Enviar</button>
        </div>
      </form>
    </section>
  );
}
