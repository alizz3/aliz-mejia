/* =========================================================================
   Portafolio de Aliz Mejía · lógica de la página
   - Pinta todas las secciones desde js/datos.js y js/i18n.js
   - Rutas: #/proyecto/<slug> abre un caso de estudio; el resto son secciones
   - Tema claro/oscuro e idioma (es, en, pt) guardados en el navegador
   ========================================================================= */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const ico = (id, cls = "") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const leer = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const IDIOMAS = ["es", "en", "pt"];
  let lang = IDIOMAS.includes(document.documentElement.lang) ? document.documentElement.lang : "es";
  const T = () => I18N[lang];
  const tx = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.es : obj);
  const pt = (p) => p.t[lang] || p.t.es;
  const porSlug = (s) => PROYECTOS.find((p) => p.slug === s);

  const estado = { filtro: "todos", busqueda: "" };

  /* ---------------- toast ---------------- */
  let toastT;
  function toast(msg) {
    $(".toast")?.remove();
    const el = document.createElement("div");
    el.className = "toast"; el.setAttribute("role", "status"); el.textContent = msg;
    document.body.appendChild(el);
    clearTimeout(toastT); toastT = setTimeout(() => el.remove(), 2600);
  }
  window.ALIZ_TOAST = toast;

  async function copiar(texto) {
    try { await navigator.clipboard.writeText(texto); toast(T().copiado); }
    catch (e) { toast(T().noCopiado); }
  }

  /* ---------------- tema ---------------- */
  const esOscuro = () => {
    const d = document.documentElement.dataset.theme;
    return d ? d === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  };
  function pintarTema() {
    const b = $("#tema"); const o = esOscuro();
    b.innerHTML = ico(o ? "i-sun" : "i-moon");
    b.setAttribute("aria-label", o ? T().tema.claro : T().tema.oscuro);
  }
  $("#tema").addEventListener("click", () => {
    const sig = esOscuro() ? "light" : "dark";
    document.documentElement.dataset.theme = sig; guardar("aliz-tema", sig); pintarTema();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", pintarTema);

  /* ---------------- idioma ---------------- */
  $$(".lang button").forEach((b) => b.addEventListener("click", () => cambiarIdioma(b.dataset.lang)));
  function cambiarIdioma(l) {
    if (!IDIOMAS.includes(l)) return;
    lang = l; document.documentElement.lang = l; guardar("aliz-idioma", l);
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
    renderTodo();
    window.ALIZ_LAB?.idioma(l);
  }

  /* ---------------- menú ---------------- */
  const SECCIONES = ["proyectos", "explorar", "lab", "habilidades", "sobre", "trayectoria", "contacto"];
  function renderMenu() {
    const n = T().nav;
    $("#menu").innerHTML = SECCIONES.map((id) => `<a href="#${id}" data-sec="${id}">${n[id]}</a>`).join("");
    $("#skip").textContent = T().skip;
    $("#burger").setAttribute("aria-label", T().menu);
  }
  $("#burger").addEventListener("click", () => {
    const m = $("#menu"); const ab = !m.classList.contains("abierto");
    m.classList.toggle("abierto", ab); $("#burger").setAttribute("aria-expanded", String(ab));
  });
  $("#menu").addEventListener("click", (e) => {
    if (e.target.closest("a")) { $("#menu").classList.remove("abierto"); $("#burger").setAttribute("aria-expanded", "false"); }
  });
  addEventListener("scroll", () => $("#top").classList.toggle("scrolled", scrollY > 8), { passive: true });

  /* ---------------- piezas ---------------- */
  const badge = (p) => `<span class="badge ${p.estado}"><i></i>${T().estados[p.estado]}</span>`;
  const chips = (arr, max = 99) => arr.slice(0, max).map((s) => `<span class="chip">${esc(s)}</span>`).join("");
  function botonesProyecto(p, { caso = true, demo = true } = {}) {
    const t = T().btn; const out = [];
    if (caso) out.push(`<a class="btn btn-primary btn-sm" href="#/proyecto/${p.slug}">${t.caso} ${ico("i-arrow")}</a>`);
    if (p.vivo) out.push(`<a class="btn btn-ghost btn-sm" href="${p.vivo}" target="_blank" rel="noopener">${t.vivo} ${ico("i-out")}</a>`);
    if (demo && p.lab) out.push(`<a class="btn btn-ghost btn-sm" href="#lab" data-demo="${p.lab}">${t.demo}</a>`);
    if (p.repo) {
      out.push(p.repo.publico
        ? `<a class="btn btn-ghost btn-sm" href="${p.repo.url}" target="_blank" rel="noopener">${ico("i-gh")} ${t.codigo}</a>`
        : `<span class="btn btn-ghost btn-sm" aria-disabled="true" title="${esc(T().privadoTip)}">${ico("i-lock")} ${t.privado}</span>`);
    }
    return out.join("");
  }
  function logoProyecto(p, cls) {
    if (!p.logo) return "";
    if (p.logo.claro === p.logo.oscuro) return `<img class="${cls}" src="${p.logo.claro}" alt="${esc(p.nombre)}" loading="lazy">`;
    return `<img class="${cls} solo-claro" src="${p.logo.claro}" alt="${esc(p.nombre)}" loading="lazy"><img class="${cls} solo-oscuro" src="${p.logo.oscuro}" alt="${esc(p.nombre)}" loading="lazy">`;
  }
  const img = (i, extra = "") => `<img src="${i.src}" alt="${esc(tx(i.alt))}" loading="lazy" decoding="async" ${extra}>`;

  function mediaDestacado(p) {
    const d = p.imagenes.filter((i) => i.tipo === "desk");
    const m = p.imagenes.filter((i) => i.tipo === "mob");
    const url = (p.vivo || "").replace(/^https?:\/\//, "").replace(/\/$/, "") || p.slug + " · local";
    const nav = (i) => `<div class="navegador"><div class="bar"><i></i><i></i><i></i><span>${esc(url)}</span></div>${img(i, 'width="1440" height="900"')}</div>`;
    const tel = (i) => `<div class="telefono">${img(i, 'width="390" height="844"')}</div>`;
    switch (p.composicion) {
      case "navegador": return `<div class="dest-media">${nav(d[0])}${m[0] ? tel(m[0]) : ""}</div>`;
      case "diapositivas": return `<div class="dest-media"><div class="diapos">${d.slice(0, 3).map((i) => img(i)).join("")}${m[0] ? tel(m[0]) : ""}</div></div>`;
      case "telefonos": return `<div class="dest-media"><div class="par-tel">${m.slice(0, 2).map(tel).join("")}</div></div>`;
      case "mixta": return `<div class="dest-media"><div class="mixta">${nav(d[0])}${m[0] ? tel(m[0]) : ""}</div></div>`;
      default: return `<div class="dest-media">${d[0] ? nav(d[0]) : ""}</div>`;
    }
  }

  function cover(p) {
    const i = p.imagenes[0];
    if (i) return `<div class="cover">${img(i, i.tipo === "mob" ? 'class="mob"' : "")}</div>`;
    if (p.portada?.tipo === "tarjeta") return `<div class="cover"><div class="cover-card" aria-hidden="true"><div><i></i><i></i><i></i></div></div><span class="cover-note">${T().sinCaptura}</span></div>`;
    const lin = (p.codigo?.texto || "").split("\n").slice(0, 6).map((l) => esc(l)).join("\n");
    return `<div class="cover"><div class="cover-code" aria-hidden="true"><b>${esc(p.portada?.etiqueta || "")}</b>${lin ? `<pre style="margin:0;white-space:pre;overflow:hidden">${lin}</pre>` : '<span class="ph" style="width:70%"></span><span class="ph" style="width:45%"></span><span class="ph" style="width:60%"></span><span class="ph" style="width:35%"></span>'}</div><span class="cover-note">${T().sinCaptura}</span></div>`;
  }

  /* ---------------- portada (todas las secciones) ---------------- */
  function renderPortada() {
    const t = T(); const P = PERFIL; const s = t.sec;
    const vivos = PROYECTOS.filter((p) => p.vivo && p.estado !== "archivo");
    const dest = PROYECTOS.filter((p) => p.destacado);
    const retrato = P.foto
      ? `<img src="assets/foto/aliz.webp" alt="${esc(t.hero.fotoAlt)}" width="1600" height="2000">`
      : `<img class="mono" src="assets/marca/monograma.webp" alt="" width="410" height="374">`;

    $("#portada").innerHTML = `
    <section class="hero" id="inicio" aria-labelledby="hero-titulo">
      <div class="wrap hero-grid">
        <div>
          <span class="eyebrow">${t.hero.eyebrow}</span>
          <h1 id="hero-titulo" class="hero-logo"><img src="assets/marca/logo-principal.webp" alt="Aliz · Freelance Developer" width="1428" height="910" fetchpriority="high"></h1>
          <p class="rol">${t.hero.rol[0]} <i></i> ${t.hero.rol[1]}</p>
          <p class="lead">${t.hero.lead}</p>
          <div class="actions">
            <a class="btn btn-primary" href="#proyectos">${t.hero.cta1} ${ico("i-arrow")}</a>
            <a class="btn btn-ghost" href="#lab">${t.hero.cta2}</a>
          </div>
          <div class="vivos"><small>${t.hero.vivos}</small>${vivos.map((p) => `<a class="vivo-link" href="${p.vivo}" target="_blank" rel="noopener"><i></i>${esc(p.nombre)}</a>`).join("")}</div>
        </div>
        <div class="retrato">
          <div class="orbita" aria-hidden="true"></div>
          <div class="marco">${retrato}</div>
          <span class="estrella e1">${ico("i-star")}</span><span class="estrella e2">${ico("i-star")}</span><span class="estrella e3">${ico("i-star")}</span>
          <div class="codigo-flot" aria-hidden="true"><div class="bar"><i></i><i></i><i></i></div><span class="tk-k">const</span> aliz = {<br>&nbsp;&nbsp;construye: [<span class="tk-s">"tiendas"</span>, <span class="tk-s">"dashboards"</span>],<br>&nbsp;&nbsp;stack: [<span class="tk-s">"React"</span>, <span class="tk-s">"Vue"</span>, <span class="tk-s">"Firebase"</span>],<br>&nbsp;&nbsp;base: <span class="tk-s">"Bogotá"</span>, remoto: <span class="tk-p">true</span><br>};</div>
        </div>
      </div>
    </section>

    <section class="sec" id="proyectos" aria-labelledby="t-dest">
      <div class="wrap">
        <div class="sec-head rev"><span class="eyebrow">${s.dest[0]}</span><h2 class="h-sec" id="t-dest">${s.dest[1]}</h2><p class="sec-lead">${s.dest[2]}</p></div>
        <div class="destacados">
          ${dest.map((p, i) => {
            const c = pt(p);
            return `<article class="dest rev ${i % 2 ? "inv" : ""}" aria-labelledby="d-${p.slug}">
              ${mediaDestacado(p)}
              <div>
                <div class="estado"><span class="dest-num">0${i + 1} · ${p.anio}</span>${badge(p)}</div>
                ${logoProyecto(p, "dest-logo")}
                <h3 id="d-${p.slug}">${esc(p.nombre)}</h3>
                <p class="tipo">${esc(c.tipo)}</p>
                <p class="resumen">${esc(c.resumen)}</p>
                <ul class="feats">${c.funciones.slice(0, 3).map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
                <div class="meta">${chips(p.stack, 5)}</div>
                <div class="acc">${botonesProyecto(p)}</div>
              </div>
            </article>`;
          }).join("")}
        </div>
      </div>
    </section>

    <section class="sec" id="explorar" aria-labelledby="t-exp" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head rev"><span class="eyebrow">${s.explorar[0]}</span><h2 class="h-sec" id="t-exp">${s.explorar[1]}</h2><p class="sec-lead">${s.explorar[2]}</p></div>
        <div class="explorar-bar">
          <div class="filtros" role="group" aria-label="${esc(s.explorar[0])}" id="filtros"></div>
          <label class="buscar"><span class="sr-only">${t.buscar}</span>${ico("i-search")}<input id="q" type="search" placeholder="${esc(t.buscar)}" autocomplete="off" value="${esc(estado.busqueda)}"></label>
        </div>
        <p class="sr-only" aria-live="polite" id="conteo"></p>
        <div class="grid-proy" id="grid"></div>
      </div>
    </section>

    <section class="sec lab" id="lab" aria-labelledby="t-lab">
      <div class="wrap">
        <div class="sec-head rev"><span class="eyebrow">${s.lab[0]}</span><h2 class="h-sec" id="t-lab">${s.lab[1]}</h2><p class="sec-lead">${s.lab[2]}</p></div>
        <div id="lab-raiz"></div>
      </div>
    </section>

    <section class="sec" id="habilidades" aria-labelledby="t-hab">
      <div class="wrap">
        <div class="sec-head rev"><span class="eyebrow">${s.skills[0]}</span><h2 class="h-sec" id="t-hab">${s.skills[1]}</h2><p class="sec-lead">${s.skills[2]}</p></div>
        <div class="skills">${HABILIDADES.map((g) => `
          <div class="skill-grupo rev"><h3>${esc(tx(g.grupo))}</h3>
            ${g.items.map((it) => `<div class="skill"><b>${esc(tx(it.n))}</b><span class="en">${it.p.map((sl) => { const pr = porSlug(sl); return pr ? `<a href="#/proyecto/${sl}">${esc(pr.nombre)}</a>` : ""; }).join("")}</span></div>`).join("")}
          </div>`).join("")}
        </div>
      </div>
    </section>

    <section class="sec" id="sobre" aria-labelledby="t-sobre" style="padding-top:0">
      <div class="wrap sobre">
        <div class="sobre-foto rev">${P.fotoSobreMi ? `<img class="foto" src="assets/foto/aliz-sobre-mi.webp" alt="${esc(t.hero.fotoAlt)}" loading="lazy">` : `<img class="sello" src="assets/marca/sello.webp" alt="" loading="lazy">`}</div>
        <div>
          <span class="eyebrow">${s.sobre[0]}</span>
          <h2 class="h-sec" id="t-sobre">${s.sobre[1]}</h2>
          <p class="big" style="margin-top:22px">${t.sobre.big}</p>
          <p class="txt">${esc(t.sobre.txt)}</p>
          <div class="principios">${t.sobre.principios.map((pr, i) => `<div class="principio"><span class="ico">${ico(["i-user", "i-life", "i-shield"][i])}</span><div><b>${esc(pr[0])}</b><span>${esc(pr[1])}</span></div></div>`).join("")}</div>
          <div class="busco"><b>${esc(t.sobre.busco[0])}</b>${esc(t.sobre.busco[1])}</div>
        </div>
      </div>
    </section>

    <section class="sec" id="trayectoria" aria-labelledby="t-tray" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head rev"><span class="eyebrow">${s.tray[0]}</span><h2 class="h-sec" id="t-tray">${s.tray[1]}</h2></div>
        <div class="linea">${TRAYECTORIA.map((h) => `
          <div class="hito ${h.tipo} rev">
            <span class="tag">${t.tray[h.tipo]}</span>
            <h3>${esc(tx(h.cargo))}</h3>
            ${h.periodo ? `<span class="per">${esc(tx(h.periodo))}</span>` : ""}
            <span class="lugar">${esc(h.lugar)}</span>
            <p>${esc(tx(h.texto))}</p>
          </div>`).join("")}
        </div>
      </div>
    </section>

    <section class="sec" id="contacto" aria-labelledby="t-con" style="padding-top:0">
      <div class="wrap">
        <div class="contacto rev">
          <div>
            <span class="eyebrow" style="color:inherit;opacity:.7">${s.contacto[0]}</span>
            <h2 class="h-sec" id="t-con">${s.contacto[1]}</h2>
            <p class="sec-lead">${s.contacto[2]}</p>
            <div class="canales">
              <div class="canal"><span class="ico">${ico("i-mail")}</span><a href="mailto:${P.email}" style="text-decoration:none;min-width:0"><small>${t.contacto.email}</small><b>${P.email}</b></a><button class="copiar" type="button" data-copiar="${P.email}">${T().btn.copiar}</button></div>
              <div class="canal"><span class="ico">${ico("i-wa")}</span><a href="https://wa.me/${P.whatsapp}" target="_blank" rel="noopener" style="text-decoration:none;min-width:0"><small>${t.contacto.whatsapp}</small><b>${P.whatsappTexto}</b></a><button class="copiar" type="button" data-copiar="${P.whatsappTexto}">${T().btn.copiar}</button></div>
              <a class="canal" href="${P.linkedin}" target="_blank" rel="noopener"><span class="ico">${ico("i-in")}</span><div><small>${t.contacto.linkedin}</small><b>in/alizz-doblezz</b></div></a>
              <a class="canal" href="${P.github}" target="_blank" rel="noopener"><span class="ico">${ico("i-gh")}</span><div><small>${t.contacto.github}</small><b>github.com/alizz3</b></div></a>
            </div>
          </div>
          <form class="form" id="form" novalidate>
            <h3 style="font-family:var(--display);font-size:24px;font-weight:600">${t.contacto.form.titulo}</h3>
            <div class="campo"><label for="f-nombre">${t.contacto.form.nombre}</label><input id="f-nombre" name="nombre" autocomplete="name" maxlength="80" required><span class="err" id="e-nombre"></span></div>
            <div class="campo"><label for="f-correo">${t.contacto.form.correo}</label><input id="f-correo" name="correo" type="email" autocomplete="email" maxlength="120" required><span class="err" id="e-correo"></span></div>
            <div class="campo"><label for="f-tipo">${t.contacto.form.tipo}</label><select id="f-tipo" name="tipo">${t.contacto.form.tipos.map((o) => `<option>${esc(o)}</option>`).join("")}</select></div>
            <div class="campo"><label for="f-msg">${t.contacto.form.mensaje}</label><textarea id="f-msg" name="mensaje" maxlength="2000" required></textarea><span class="err" id="e-msg"></span></div>
            <input type="text" name="sitio" id="f-sitio" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
            <button class="btn btn-primary" type="submit">${t.contacto.form.enviar} ${ico("i-arrow")}</button>
            <p class="form-nota">${t.contacto.form.nota}</p>
            <div id="form-ok" role="status"></div>
          </form>
        </div>
      </div>
    </section>`;

    renderFiltros(); renderGrid(); conectarFormulario(); observarReveal(); observarSecciones();
    window.ALIZ_LAB?.montar($("#lab-raiz"), lang);
  }

  /* ---------------- explorador ---------------- */
  const CATS = ["todos", "web", "dashboard", "backend", "cliente", "academico", "prototipo"];
  function filtrados() {
    const q = norm(estado.busqueda.trim());
    return PROYECTOS.filter((p) => (estado.filtro === "todos" || p.categorias.includes(estado.filtro)) &&
      (!q || norm([p.nombre, pt(p).tipo, pt(p).resumen, ...p.stack].join(" ")).includes(q)));
  }
  function renderFiltros() {
    const t = T();
    $("#filtros").innerHTML = CATS.map((c) => {
      const n = c === "todos" ? PROYECTOS.length : PROYECTOS.filter((p) => p.categorias.includes(c)).length;
      return n ? `<button class="filtro" type="button" data-cat="${c}" aria-pressed="${estado.filtro === c}">${t.cats[c]} <span>${n}</span></button>` : "";
    }).join("");
  }
  function renderGrid() {
    const t = T(); const lista = filtrados();
    $("#conteo").textContent = t.resultados(lista.length);
    $("#grid").innerHTML = lista.length ? lista.map((p, i) => {
      const c = pt(p);
      return `<a class="card" href="#/proyecto/${p.slug}" style="animation-delay:${reduceMotion ? 0 : i * 40}ms">
        ${cover(p)}
        <div class="body">
          <div class="row">${badge(p)}<span class="anio">${p.anio}</span></div>
          <h3>${esc(p.nombre)}</h3>
          <p>${esc(c.resumen)}</p>
          <div class="stack">${chips(p.stack, 4)}</div>
        </div></a>`;
    }).join("") : `<div class="vacio"><b>${t.vacio[0]}</b>${t.vacio[1]}</div>`;
  }
  document.addEventListener("click", (e) => {
    const f = e.target.closest(".filtro");
    if (f) { estado.filtro = f.dataset.cat; $$(".filtro").forEach((b) => b.setAttribute("aria-pressed", String(b === f))); renderGrid(); }
    const cp = e.target.closest("[data-copiar]");
    if (cp) copiar(cp.dataset.copiar);
    const dm = e.target.closest("[data-demo]");
    if (dm) { setTimeout(() => window.ALIZ_LAB?.abrir(dm.dataset.demo), 0); }
  });
  document.addEventListener("input", (e) => {
    if (e.target.id === "q") { estado.busqueda = e.target.value; renderGrid(); }
  });

  /* ---------------- formulario ---------------- */
  function conectarFormulario() {
    const f = $("#form"); if (!f) return;
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const m = T().contacto.form;
      if (f.sitio.value) return; // trampa para bots (honeypot)
      const nombre = f.nombre.value.trim(), correo = f.correo.value.trim(), msg = f.mensaje.value.trim();
      const errores = {
        nombre: nombre.length < 2 ? m.errNombre : "",
        correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo) ? "" : m.errCorreo,
        msg: msg.length < 10 ? m.errMensaje : "",
      };
      [["nombre", "f-nombre", "e-nombre"], ["correo", "f-correo", "e-correo"], ["msg", "f-msg", "e-msg"]].forEach(([k, inp, er]) => {
        $("#" + er).textContent = errores[k]; $("#" + inp).setAttribute("aria-invalid", String(!!errores[k]));
      });
      const primero = Object.keys(errores).find((k) => errores[k]);
      if (primero) { $({ nombre: "#f-nombre", correo: "#f-correo", msg: "#f-msg" }[primero]).focus(); return; }
      const asunto = `${f.tipo.value} · ${nombre}`;
      const cuerpo = `${msg}\n\n— ${nombre} (${correo})`;
      location.href = `mailto:${PERFIL.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      $("#form-ok").innerHTML = `<p class="form-ok">${esc(m.ok)}</p>`;
    });
  }

  /* ---------------- animaciones al hacer scroll ---------------- */
  let revObs;
  function observarReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    revObs?.disconnect();
    revObs = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("entra"); revObs.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    const alto = innerHeight;
    $$(".rev").forEach((el) => { if (el.getBoundingClientRect().top > alto) revObs.observe(el); });
  }
  let secObs;
  function observarSecciones() {
    secObs?.disconnect();
    secObs = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) $$("#menu a").forEach((a) => a.classList.toggle("activo", a.dataset.sec === en.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    SECCIONES.forEach((id) => { const el = document.getElementById(id); if (el) secObs.observe(el); });
  }

  /* ---------------- caso de estudio ---------------- */
  function renderCaso(slug) {
    const p = porSlug(slug); const t = T();
    const cont = $("#caso");
    if (!p) {
      cont.innerHTML = `<div class="nf"><h1>404</h1><h2 style="font-size:24px">${t.nf[0]}</h2><p>${t.nf[1]}</p><a class="btn btn-primary" href="#explorar">${t.nf[2]}</a></div>`;
      document.title = "404 · Aliz Mejía"; return;
    }
    const c = pt(p); const k = t.caso;
    const secciones = [
      ["contexto", c.contexto && `<p>${esc(c.contexto)}</p>`],
      ["problema", c.problema && `<p>${esc(c.problema)}</p>`],
      ["objetivo", c.objetivo && `<p>${esc(c.objetivo)}</p>`],
      ["solucion", c.solucion && `<p>${esc(c.solucion)}</p>`],
      ["arquitectura", p.flujo && `<div class="flujo">${p.flujo.map((n) => `<span>${esc(n)}</span>`).join("<i>→</i>")}</div>`],
      ["funciones", c.funciones && `<ul class="lista">${c.funciones.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`],
      ["decisiones", c.decisiones && `<ul class="lista">${c.decisiones.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`],
      ["codigo", p.codigo && `<span class="code-file">${esc(p.codigo.archivo)}</span><pre class="code" tabindex="0"><code>${esc(p.codigo.texto)}</code></pre>`],
      ["aprendizajes", c.aprendizajes && `<p>${esc(c.aprendizajes)}</p>`],
    ].filter((x) => x[1]);
    const idx = PROYECTOS.indexOf(p); const sig = PROYECTOS[(idx + 1) % PROYECTOS.length];
    cont.innerHTML = `
      <a class="caso-volver" href="#explorar">${ico("i-back", "")}<span>${t.btn.volver}</span></a>
      <header class="caso-head">
        <div>
          ${badge(p)}
          <h1>${esc(p.nombre)}</h1>
          <p class="tipo">${esc(c.tipo)}</p>
          <p class="resumen">${esc(c.resumen)}</p>
        </div>
        <dl class="ficha">
          <div><dt>${k.rol}</dt><dd>${esc(c.rol)}</dd></div>
          <div><dt>${k.anio}</dt><dd>${p.anio}</dd></div>
          <div><dt>${k.stack}</dt><dd style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">${chips(p.stack)}</dd></div>
          <div><dt>${k.enlaces}</dt><dd class="acc" style="margin-top:8px">${botonesProyecto(p, { caso: false })}</dd></div>
        </dl>
      </header>
      ${p.imagenes.length ? `<div class="galeria" aria-label="${k.galeria}">${p.imagenes.map((i, n) => `<button type="button" class="${i.tipo}" data-ampliar="${n}" aria-label="${esc(k.ampliar + ": " + tx(i.alt))}">${img(i)}</button>`).join("")}</div>` : `<div style="height:36px"></div>`}
      <div class="caso-cuerpo">
        <nav class="caso-indice" aria-label="${esc(p.nombre)}">${secciones.map(([id]) => `<a href="#/proyecto/${p.slug}/${id}" data-ir="b-${id}">${k[id]}</a>`).join("")}</nav>
        <div>${secciones.map(([id, html], n) => `<section class="bloque" id="b-${id}"><h2><small>${String(n + 1).padStart(2, "0")}</small>${k[id]}</h2>${html}</section>`).join("")}</div>
      </div>
      <div class="caso-sig">
        <a class="btn btn-ghost" href="#explorar">${ico("i-back")} ${t.btn.volver}</a>
        <a class="btn btn-primary" href="#/proyecto/${sig.slug}">${t.btn.siguiente}: ${esc(sig.nombre)} ${ico("i-arrow")}</a>
      </div>`;
    document.title = `${p.nombre} · Aliz Mejía`;
    $$("[data-ampliar]", cont).forEach((b) => b.addEventListener("click", () => abrirVisor(p.imagenes[+b.dataset.ampliar], b)));
  }

  function abrirVisor(i, origen) {
    const v = document.createElement("div");
    v.className = "visor"; v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true"); v.setAttribute("aria-label", tx(i.alt));
    v.innerHTML = `<img src="${i.src}" alt="${esc(tx(i.alt))}"><button class="icon-btn" type="button" aria-label="${T().btn.cerrar}">${ico("i-x")}</button>`;
    const cerrar = () => { v.remove(); document.removeEventListener("keydown", tecla); origen?.focus(); };
    const tecla = (e) => { if (e.key === "Escape") cerrar(); if (e.key === "Tab") { e.preventDefault(); v.querySelector("button").focus(); } };
    v.addEventListener("click", (e) => { if (e.target === v || e.target.closest("button")) cerrar(); });
    document.addEventListener("keydown", tecla);
    document.body.appendChild(v); v.querySelector("button").focus();
  }

  /* ---------------- pie ---------------- */
  function renderPie() {
    const t = T();
    $("#pie").innerHTML = `<div class="wrap">
      <div class="pie-grid">
        <div><img class="pie-logo" src="assets/marca/logo-firma.webp" alt="Aliz Mejía · Freelance Developer" width="634" height="366"></div>
        <nav aria-label="Secundaria">${SECCIONES.map((id) => `<a href="#${id}">${t.nav[id]}</a>`).join("")}</nav>
        <nav aria-label="Redes"><a href="${PERFIL.github}" target="_blank" rel="noopener">GitHub</a><a href="${PERFIL.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a href="mailto:${PERFIL.email}">${PERFIL.email}</a></nav>
      </div>
      <div class="legal"><span>© ${new Date().getFullYear()} Aliz Mejía · ${t.pie.hecho}</span><span>${t.pie.derechos}</span></div>
    </div>`;
  }

  /* ---------------- rutas ---------------- */
  function ruta() {
    const h = decodeURIComponent(location.hash.slice(1));
    const m = h.match(/^\/proyecto\/([^/]+)(?:\/(.+))?$/);
    if (m) {
      $("#portada").hidden = true; $("#caso").hidden = false;
      renderCaso(m[1]);
      if (m[2]) document.getElementById("b-" + m[2])?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      else scrollTo({ top: 0 });
      $("#contenido").focus({ preventScroll: true });
      return;
    }
    const venia = !$("#caso").hidden;
    $("#caso").hidden = true; $("#portada").hidden = false; document.title = "Aliz Mejía · " + T().hero.rol[0];
    if (venia) {
      const destino = document.getElementById(h || "inicio");
      requestAnimationFrame(() => destino?.scrollIntoView());
    }
  }
  addEventListener("hashchange", ruta);

  /* ---------------- arranque ---------------- */
  function renderTodo() {
    renderMenu(); pintarTema(); renderPortada(); renderPie();
    if (!$("#caso").hidden) ruta();
  }
  $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  renderTodo();
  ruta();
})();
