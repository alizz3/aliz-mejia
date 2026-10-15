/* =========================================================================
   Portafolio de Aliz Mejía · lógica de la página
   - Inicio compacto: hero, destacados, tecnologías, lab, sobre mí,
     experiencia y contacto.
   - Rutas: #/proyectos (todos, con filtros), #/habilidades,
     #/proyecto/<slug> (caso de estudio). Lo demás son secciones del inicio.
   - Tema claro/oscuro e idioma (es, en, pt) guardados en el navegador.
   ========================================================================= */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const ico = (id, cls = "") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const IDIOMAS = ["es", "en", "pt"];
  let lang = IDIOMAS.includes(document.documentElement.lang) ? document.documentElement.lang : "es";
  const T = () => I18N[lang];
  const tx = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.es : obj);
  const pt = (p) => p.t[lang] || p.t.es;
  const porSlug = (s) => PROYECTOS.find((p) => p.slug === s);

  const estado = { filtro: "todos", busqueda: "" };

  /* ---------------- toast y copiar ---------------- */
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
    window.ALIZ_LAB?.idioma(l);
    renderTodo();
  }

  /* ---------------- menú ---------------- */
  const SECCIONES = ["inicio", "proyectos", "lab", "sobre", "experiencia", "contacto"];
  function renderMenu() {
    const n = T().nav;
    $("#menu").innerHTML = SECCIONES.map((id) => `<a href="#${id}" data-sec="${id}">${n[id]}</a>`).join("");
    $("#hablemos").textContent = T().hablemos;
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

  /* ---------------- piezas reutilizables ---------------- */
  const badge = (p) => `<span class="badge ${p.estado}"><i></i>${T().estados[p.estado]}</span>`;
  const chips = (arr, max = 99) => arr.slice(0, max).map((s) => `<span class="chip">${esc(s)}</span>`).join("");
  const img = (i, extra = "") => `<img src="${i.src}" alt="${esc(tx(i.alt))}" loading="lazy" decoding="async" ${extra}>`;
  const iconoTec = (k, size = 22) => { const i = ICONOS[k]; return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path fill="${i.c === "#000000" ? "#111" : i.c}" d="${i.d}"/></svg>`; };

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

  /* Portada de tarjeta: captura de escritorio con el celular encima, o solo celulares */
  function portadaDestacado(p) {
    const d = p.imagenes.find((i) => i.tipo === "desk");
    const m = p.imagenes.filter((i) => i.tipo === "mob");
    if (p.composicion === "telefonos" || !d) {
      return `<div class="pc-media pc-tels">${m.slice(0, 2).map((i) => `<div class="mini-tel">${img(i, 'width="390" height="844"')}</div>`).join("")}</div>`;
    }
    return `<div class="pc-media"><div class="mini-nav"><div class="bar"><i></i><i></i><i></i></div>${img(d, 'width="1440" height="900"')}</div>${m[0] ? `<div class="mini-tel flot">${img(m[0], 'width="390" height="844"')}</div>` : ""}</div>`;
  }

  function cover(p) {
    const i = p.imagenes[0];
    if (i) return `<div class="cover">${img(i, i.tipo === "mob" ? 'class="mob"' : "")}</div>`;
    if (p.portada?.tipo === "tarjeta") return `<div class="cover"><div class="cover-card" aria-hidden="true"><div><i></i><i></i><i></i></div></div><span class="cover-note">${T().sinCaptura}</span></div>`;
    const lin = (p.codigo?.texto || "").split("\n").slice(0, 6).map((l) => esc(l)).join("\n");
    return `<div class="cover"><div class="cover-code" aria-hidden="true"><b>${esc(p.portada?.etiqueta || "")}</b>${lin ? `<pre>${lin}</pre>` : '<span class="ph" style="width:70%"></span><span class="ph" style="width:45%"></span><span class="ph" style="width:60%"></span>'}</div><span class="cover-note">${T().sinCaptura}</span></div>`;
  }

  /* ---------------- inicio ---------------- */
  const TECS = ["react", "vuedotjs", "javascript", "firebase", "vite", "tailwindcss", "python", "odoo", "php", "mysql", "git", "vercel", "figma"];

  function renderInicio() {
    const t = T(); const P = PERFIL;
    const dest = PROYECTOS.filter((p) => p.destacado);

    $("#inicio-raiz").innerHTML = `
    <section class="hero" id="inicio" aria-labelledby="hero-titulo">
      <div class="wrap hero-grid">
        <div class="hero-txt">
          <span class="eyebrow">${t.hero.eyebrow}</span>
          <h1 id="hero-titulo" class="hero-logo"><img src="assets/marca/logo-principal.webp" alt="Aliz · Freelance Developer" width="1100" height="701" fetchpriority="high"></h1>
          <p class="rol">${t.hero.rol}</p>
          <p class="lead">${t.hero.lead}</p>
          <ul class="chips-foco">${t.hero.chips.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
          <div class="actions">
            <a class="btn btn-primary" href="#proyectos">${t.hero.cta1} ${ico("i-arrow")}</a>
            <a class="btn btn-ghost" href="#sobre">${t.hero.cta2}</a>
          </div>
          <div class="redes">
            <a href="${P.github}" target="_blank" rel="noopener" aria-label="GitHub">${ico("i-gh")}</a>
            <a href="${P.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ico("i-in")}</a>
            <a href="mailto:${P.email}" aria-label="${esc(P.email)}">${ico("i-mail")}</a>
          </div>
        </div>
        <div class="hero-vis" aria-hidden="true">
          <div class="halo"></div>
          <span class="estrella e1">${ico("i-star")}</span><span class="estrella e2">${ico("i-star")}</span>
          <img class="ilustracion" src="assets/marca/ilustracion.webp" alt="" width="1200" height="643" fetchpriority="high">
        </div>
      </div>
    </section>

    <section class="sec" id="proyectos" aria-labelledby="t-dest">
      <div class="wrap">
        <div class="sec-head-row">
          <div><h2 class="h-sec" id="t-dest">${t.dest.titulo}</h2><p class="sec-lead">${t.dest.sub}</p></div>
          <a class="link-arrow" href="#/proyectos">${t.dest.todos} ${ico("i-arrow")}</a>
        </div>
        <div class="carrusel">
          <ul class="dest-grid" id="dest-grid">
            ${dest.map((p) => {
              const c = pt(p);
              return `<li class="pcard"><a href="#/proyecto/${p.slug}" class="pcard-link" aria-label="${esc(p.nombre + " · " + t.dest.ver)}"></a>
                ${portadaDestacado(p)}
                <div class="pc-body">
                  <div class="pc-row"><h3>${esc(p.nombre)}</h3>${badge(p)}</div>
                  <p class="pc-tipo">${esc(c.tipo)}</p>
                  <div class="pc-tags">${chips(p.stack, 3)}</div>
                  <p class="pc-res">${esc(c.resumen)}</p>
                  <div class="pc-foot"><span class="link-arrow">${t.dest.ver} ${ico("i-arrow")}</span>${p.vivo ? `<a class="pc-vivo" href="${p.vivo}" target="_blank" rel="noopener">${T().btn.vivo} ${ico("i-out")}</a>` : ""}</div>
                </div></li>`;
            }).join("")}
          </ul>
          <div class="car-ctrl">
            <button type="button" class="icon-btn" data-car="-1" aria-label="${t.dest.ant}">${ico("i-back")}</button>
            <div class="car-dots" aria-hidden="true">${dest.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</div>
            <button type="button" class="icon-btn" data-car="1" aria-label="${t.dest.sig}">${ico("i-arrow")}</button>
          </div>
        </div>
        <div class="tec-band">
          <div class="tec-head"><h3>${t.tec.titulo}</h3><a class="link-arrow" href="#/habilidades">${t.tec.todas} ${ico("i-arrow")}</a></div>
          <ul class="tec-list">${TECS.map((k) => `<li><span class="tec-ico">${iconoTec(k)}</span>${esc(ICONOS[k].n)}</li>`).join("")}</ul>
        </div>
      </div>
    </section>

    <section class="sec lab" id="lab" aria-labelledby="t-lab">
      <div class="wrap">
        <div class="sec-head-row"><div><span class="eyebrow">${t.lab.eyebrow}</span><h2 class="h-sec" id="t-lab">${t.lab.titulo}</h2><p class="sec-lead">${t.lab.sub}</p></div></div>
        <div id="lab-raiz"></div>
      </div>
    </section>

    <section class="sec" id="sobre" aria-labelledby="t-sobre">
      <div class="wrap sobre">
        <div>
          <span class="eyebrow">${t.sobre.eyebrow}</span>
          <h2 class="h-sec" id="t-sobre">${t.sobre.titulo}</h2>
          <p class="txt">${esc(t.sobre.txt)}</p>
          <ul class="checks">${t.sobre.puntos.map((x) => `<li>${ico("i-check")}${esc(x)}</li>`).join("")}</ul>
          <p class="busco">${esc(t.sobre.busco)}</p>
        </div>
        <div class="sobre-vis">${P.fotoSobreMi ? `<img class="foto" src="assets/foto/aliz-sobre-mi.webp" alt="Aliz Mejía" loading="lazy">` : `<img class="sello" src="assets/marca/sello.webp" alt="" loading="lazy" width="446" height="445">`}</div>
      </div>
    </section>

    <section class="sec" id="experiencia" aria-labelledby="t-exp">
      <div class="wrap">
        <h2 class="h-sec h-sm" id="t-exp">${t.exp.titulo}</h2>
        <div class="exp-grupos">${["trabajo", "estudio"].map((tipo) => `
          <div class="exp-grupo"><h3 class="exp-sub">${t.exp[tipo]}</h3>
          <ol class="linea">${TRAYECTORIA.filter((h) => h.tipo === tipo).map((h) => `
            <li class="hito ${h.tipo}">
              ${h.periodo ? `<span class="per">${esc(tx(h.periodo))}</span>` : ""}
              <h4>${esc(h.lugar)}</h4>
              <span class="cargo">${esc(tx(h.cargo))}</span>
              <p>${esc(tx(h.texto))}</p>
            </li>`).join("")}
          </ol></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="sec" id="contacto" aria-labelledby="t-con">
      <div class="wrap">
        <div class="cta">
          <span class="estrella e3" aria-hidden="true">${ico("i-star")}</span>
          <div>
            <h2 class="h-sec h-sm" id="t-con">${t.cta.titulo}</h2>
            <p>${t.cta.sub}</p>
          </div>
          <div class="cta-acc">
            <a class="btn btn-primary" href="mailto:${P.email}">${t.cta.boton} ${ico("i-send")}</a>
            <button type="button" class="btn btn-ghost" data-copiar="${P.email}">${ico("i-mail")} ${P.email}</button>
          </div>
        </div>
      </div>
    </section>`;

    conectarCarrusel(); observarReveal(); observarSecciones();
    window.ALIZ_LAB?.montar($("#lab-raiz"), lang);
  }

  /* ---------------- carrusel (en celular) ---------------- */
  function conectarCarrusel() {
    const g = $("#dest-grid"); if (!g) return;
    const dots = $$(".car-dots i");
    const paso = () => (g.querySelector(".pcard")?.getBoundingClientRect().width || 300) + 16;
    $$("[data-car]").forEach((b) => b.addEventListener("click", () => g.scrollBy({ left: paso() * +b.dataset.car, behavior: reduceMotion ? "auto" : "smooth" })));
    g.addEventListener("scroll", () => {
      const i = Math.round(g.scrollLeft / paso());
      dots.forEach((d, n) => d.classList.toggle("on", n === i));
    }, { passive: true });
  }

  /* ---------------- página: todos los proyectos ---------------- */
  const CATS = ["todos", "web", "dashboard", "backend", "cliente", "academico", "prototipo"];
  function filtrados() {
    const q = norm(estado.busqueda.trim());
    return PROYECTOS.filter((p) => (estado.filtro === "todos" || p.categorias.includes(estado.filtro)) &&
      (!q || norm([p.nombre, pt(p).tipo, pt(p).resumen, ...p.stack].join(" ")).includes(q)));
  }
  function renderPaginaProyectos(cont) {
    const t = T();
    cont.innerHTML = `
      <a class="volver" href="#proyectos">${ico("i-back")}<span>${t.btn.volver}</span></a>
      <header class="pag-head"><h1 class="h-sec">${t.paginas.proyectos[0]}</h1><p class="sec-lead">${t.paginas.proyectos[1]}</p></header>
      <div class="explorar-bar">
        <div class="filtros" role="group" aria-label="${esc(t.paginas.proyectos[0])}" id="filtros"></div>
        <label class="buscar"><span class="sr-only">${t.buscar}</span>${ico("i-search")}<input id="q" type="search" placeholder="${esc(t.buscar)}" autocomplete="off" value="${esc(estado.busqueda)}"></label>
      </div>
      <p class="sr-only" aria-live="polite" id="conteo"></p>
      <div class="grid-proy" id="grid"></div>`;
    renderFiltros(); renderGrid();
    document.title = `${t.paginas.proyectos[0]} · Aliz Mejía`;
  }
  function renderFiltros() {
    const t = T(); const f = $("#filtros"); if (!f) return;
    f.innerHTML = CATS.map((c) => {
      const n = c === "todos" ? PROYECTOS.length : PROYECTOS.filter((p) => p.categorias.includes(c)).length;
      return n ? `<button class="filtro" type="button" data-cat="${c}" aria-pressed="${estado.filtro === c}">${t.cats[c]} <span>${n}</span></button>` : "";
    }).join("");
  }
  function renderGrid() {
    const t = T(); const g = $("#grid"); if (!g) return; const lista = filtrados();
    $("#conteo").textContent = t.resultados(lista.length);
    g.innerHTML = lista.length ? lista.map((p, i) => {
      const c = pt(p);
      return `<a class="card" href="#/proyecto/${p.slug}" style="animation-delay:${reduceMotion ? 0 : i * 35}ms">
        ${cover(p)}
        <div class="body">
          <div class="row">${badge(p)}<span class="anio">${p.anio}</span></div>
          <h3>${esc(p.nombre)}</h3>
          <p>${esc(c.resumen)}</p>
          <div class="stack">${chips(p.stack, 4)}</div>
        </div></a>`;
    }).join("") : `<div class="vacio"><b>${t.vacio[0]}</b>${t.vacio[1]}</div>`;
  }

  /* ---------------- página: tecnologías ---------------- */
  function renderPaginaHabilidades(cont) {
    const t = T();
    cont.innerHTML = `
      <a class="volver" href="#proyectos">${ico("i-back")}<span>${t.btn.volver}</span></a>
      <header class="pag-head"><h1 class="h-sec">${t.paginas.habilidades[0]}</h1><p class="sec-lead">${t.paginas.habilidades[1]}</p></header>
      <div class="skills">${HABILIDADES.map((g) => `
        <div class="skill-grupo"><h2>${esc(tx(g.grupo))}</h2>
          ${g.items.map((it) => `<div class="skill"><b>${esc(tx(it.n))}</b><span class="en">${it.p.map((sl) => { const pr = porSlug(sl); return pr ? `<a href="#/proyecto/${sl}">${esc(pr.nombre)}</a>` : ""; }).join("")}</span></div>`).join("")}
        </div>`).join("")}
      </div>`;
    document.title = `${t.paginas.habilidades[0]} · Aliz Mejía`;
  }

  /* ---------------- página: caso de estudio ---------------- */
  function renderCaso(cont, slug) {
    const p = porSlug(slug); const t = T();
    if (!p) return render404(cont);
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
      <a class="volver" href="#proyectos">${ico("i-back")}<span>${t.btn.volver}</span></a>
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
          <div><dt>${k.stack}</dt><dd class="ficha-chips">${chips(p.stack)}</dd></div>
          <div><dt>${k.enlaces}</dt><dd class="acc">${botonesProyecto(p, { caso: false })}</dd></div>
        </dl>
      </header>
      ${p.imagenes.length ? `<div class="galeria" aria-label="${k.galeria}">${p.imagenes.map((i, n) => `<button type="button" class="${i.tipo}" data-ampliar="${n}" aria-label="${esc(k.ampliar + ": " + tx(i.alt))}">${img(i)}</button>`).join("")}</div>` : `<div style="height:28px"></div>`}
      <div class="caso-cuerpo">
        <nav class="caso-indice" aria-label="${esc(p.nombre)}">${secciones.map(([id]) => `<a href="#/proyecto/${p.slug}/${id}">${k[id]}</a>`).join("")}</nav>
        <div>${secciones.map(([id, html], n) => `<section class="bloque" id="b-${id}"><h2><small>${String(n + 1).padStart(2, "0")}</small>${k[id]}</h2>${html}</section>`).join("")}</div>
      </div>
      <div class="caso-sig">
        <a class="btn btn-ghost" href="#proyectos">${ico("i-back")} ${t.btn.volver}</a>
        <a class="btn btn-primary" href="#/proyecto/${sig.slug}">${t.btn.siguiente}: ${esc(sig.nombre)} ${ico("i-arrow")}</a>
      </div>`;
    document.title = `${p.nombre} · Aliz Mejía`;
    $$("[data-ampliar]", cont).forEach((b) => b.addEventListener("click", () => abrirVisor(p.imagenes[+b.dataset.ampliar], b)));
  }
  function render404(cont) {
    const t = T();
    cont.innerHTML = `<div class="nf"><h1>404</h1><h2>${t.nf[0]}</h2><p>${t.nf[1]}</p><a class="btn btn-primary" href="#/proyectos">${t.nf[2]}</a></div>`;
    document.title = "404 · Aliz Mejía";
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

  /* ---------------- eventos globales ---------------- */
  document.addEventListener("click", (e) => {
    const f = e.target.closest(".filtro");
    if (f) { estado.filtro = f.dataset.cat; $$(".filtro").forEach((b) => b.setAttribute("aria-pressed", String(b === f))); renderGrid(); }
    const cp = e.target.closest("[data-copiar]");
    if (cp) copiar(cp.dataset.copiar);
    const dm = e.target.closest("[data-demo]");
    if (dm) setTimeout(() => window.ALIZ_LAB?.abrir(dm.dataset.demo), 60);
  });
  document.addEventListener("input", (e) => {
    if (e.target.id === "q") { estado.busqueda = e.target.value; renderGrid(); }
  });

  /* ---------------- animaciones al hacer scroll ---------------- */
  let revObs;
  function observarReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    revObs?.disconnect();
    revObs = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("entra"); revObs.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    $$(".pcard, .tec-band, .sobre > *, .hito, .cta").forEach((el) => { el.classList.add("rev"); if (el.getBoundingClientRect().top > innerHeight) revObs.observe(el); });
  }
  let secObs;
  function observarSecciones() {
    secObs?.disconnect();
    secObs = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) $$("#menu a").forEach((a) => a.classList.toggle("activo", a.dataset.sec === en.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    SECCIONES.forEach((id) => { const el = document.getElementById(id); if (el) secObs.observe(el); });
  }

  /* ---------------- pie ---------------- */
  function renderPie() {
    const t = T(); const P = PERFIL; const dest = PROYECTOS.filter((p) => p.destacado);
    $("#pie").innerHTML = `<div class="wrap">
      <div class="pie-grid">
        <div class="pie-marca">
          <img class="pie-logo" src="assets/marca/logo-firma.webp" alt="Aliz Mejía · Freelance Developer" width="634" height="366">
          <p>${t.pie.desc}</p>
          <div class="redes">
            <a href="${P.github}" target="_blank" rel="noopener" aria-label="GitHub">${ico("i-gh")}</a>
            <a href="${P.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ico("i-in")}</a>
            <a href="mailto:${P.email}" aria-label="${esc(P.email)}">${ico("i-mail")}</a>
          </div>
        </div>
        <nav aria-label="${t.pie.navegacion}"><h2>${t.pie.navegacion}</h2>${SECCIONES.map((id) => `<a href="#${id}">${t.nav[id]}</a>`).join("")}</nav>
        <nav aria-label="${t.pie.proyectos}"><h2>${t.pie.proyectos}</h2>${dest.map((p) => `<a href="#/proyecto/${p.slug}">${esc(p.nombre)}</a>`).join("")}<a href="#/proyectos">${t.dest.todos}</a></nav>
        <div class="pie-con"><h2>${t.pie.contacto}</h2><a href="mailto:${P.email}">${P.email}</a><span>${t.pie.remoto}</span>${P.cafe ? `<a class="btn-cafe" href="${P.cafe}" target="_blank" rel="noopener" title="${esc(t.pie.cafeTxt)}">${ico("i-cafe")} ${t.pie.cafe}</a>` : ""}</div>
      </div>
      <div class="legal"><span>© ${new Date().getFullYear()} Aliz Mejía · ${t.pie.hecho}</span><span>${t.pie.derechos}</span></div>
    </div>`;
  }

  /* ---------------- botones flotantes ---------------- */
  const fab = $("#fab"), panel = $("#fab-panel"), arriba = $("#arriba");
  function renderFlotantes() {
    const f = T().fab; const P = PERFIL;
    $("#fab-txt").textContent = f.boton;
    arriba.setAttribute("aria-label", f.arriba);
    panel.innerHTML = `
      <p class="fab-tit">${f.titulo}</p>
      <div class="fab-op"><a role="menuitem" class="fab-op-link" href="mailto:${P.email}"><span class="fab-ico">${ico("i-mail")}</span><span><b>${f.correo}</b><small>${P.email}</small></span></a><button type="button" class="fab-copiar" data-copiar="${P.email}">${f.copiar}</button></div>
      <a role="menuitem" class="fab-op" href="${P.linkedin}" target="_blank" rel="noopener"><span class="fab-ico">${ico("i-in")}</span><span><b>${f.linkedin}</b><small>${f.linkedinSub}</small></span></a>`;
  }
  function abrirPanel(ab) {
    panel.hidden = !ab; fab.setAttribute("aria-expanded", String(ab)); fab.classList.toggle("abierto", ab);
    if (ab) panel.querySelector("a")?.focus();
  }
  fab.addEventListener("click", () => abrirPanel(panel.hidden));
  document.addEventListener("click", (e) => { if (!panel.hidden && !e.target.closest(".fab-wrap")) abrirPanel(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) { abrirPanel(false); fab.focus(); } });
  panel.addEventListener("click", (e) => { if (e.target.closest("a")) abrirPanel(false); });
  arriba.addEventListener("click", () => { scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); $("#top a.brand")?.focus({ preventScroll: true }); });
  addEventListener("scroll", () => { arriba.hidden = scrollY < 700; }, { passive: true });

  /* ---------------- rutas ---------------- */
  function ruta() {
    const h = decodeURIComponent(location.hash.slice(1));
    const pag = $("#pagina");
    if (h.startsWith("/")) {
      $("#inicio-raiz").hidden = true; pag.hidden = false;
      const m = h.match(/^\/proyecto\/([^/]+)(?:\/(.+))?$/);
      if (m) renderCaso(pag, m[1]);
      else if (h === "/proyectos") renderPaginaProyectos(pag);
      else if (h === "/habilidades") renderPaginaHabilidades(pag);
      else render404(pag);
      const sub = m && m[2] && document.getElementById("b-" + m[2]);
      if (sub) sub.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); else scrollTo({ top: 0 });
      $("#contenido").focus({ preventScroll: true });
      return;
    }
    const venia = !pag.hidden;
    pag.hidden = true; pag.innerHTML = ""; $("#inicio-raiz").hidden = false;
    document.title = "Aliz Mejía · " + T().hero.rol;
    if (venia) requestAnimationFrame(() => document.getElementById(h || "inicio")?.scrollIntoView());
  }
  addEventListener("hashchange", ruta);

  /* ---------------- arranque ---------------- */
  function renderTodo() {
    renderMenu(); pintarTema(); renderInicio(); renderPie(); renderFlotantes();
    if (!$("#pagina").hidden) ruta();
  }
  $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  renderTodo();
  ruta();
})();
