/* =========================================================================
   Interactive Lab · recreaciones de mis apps con datos ficticios.
   Nada de aquí se conecta a Firebase ni a los sistemas reales.
   Cada demo guarda su estado en memoria mientras la página está abierta.
   ========================================================================= */
(function () {
  "use strict";
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pesos = (n) => "$" + Math.round(n).toLocaleString("es-CO");
  const toast = (m) => window.ALIZ_TOAST && window.ALIZ_TOAST(m);
  let lang = "es"; let raiz = null; let activa = "vane";

  /* ---------- textos internos de las demos ---------- */
  const L = {
    es: {
      v: { titulo: "Dashboard del taller", entrar: "Entrar como usuaria demo", entrarNota: "En el sistema real se entra con la cuenta de Google de la marca. Aquí no se pide ningún dato.", resumen: "Resumen", pedidos: "Pedidos", productos: "Productos", salir: "Salir", demoUser: "demo@taller.app",
        kNuevos: "Pedidos nuevos", kCurso: "En curso", kMes: "Ventas del mes", kTotal: "Ventas acumuladas", grafica: "Ventas entregadas por mes", lineas: "Cuentas por línea", ultimos: "Últimos pedidos", linea: "Línea", mes: "Este mes", total: "Total", cant: "Pedidos",
        buscar: "Buscar cliente o producto", orden: "Ordenar", recientes: "Más recientes", valor: "Mayor valor", enCurso: "En curso", todos: "Todos", simular: "Simular pedido nuevo", llego: "Llegó un pedido nuevo", cliente: "Cliente", producto: "Producto", fecha: "Fecha", estado: "Estado", valorCol: "Valor",
        detalle: "Detalle del pedido", precio: "Precio final (COP)", entrega: "Fecha de entrega", notas: "Notas internas", guardar: "Guardar cambios", cancelar: "Cancelar", guardado: "Pedido actualizado", sinPrecio: "Por definir", foto: "Trajo foto de referencia", origen: "Origen",
        nuevoProd: "Nuevo producto", nombre: "Nombre", categoria: "Categoría", desde: "Precio desde (opcional)", crear: "Crear producto", creado: "Producto creado", visible: "Visible en la tienda", oculto: "Oculto", errNombre: "Escribe el nombre del producto.", errPrecio: "El precio debe ser un número positivo.", todas: "Todas", vacioP: "No hay productos con ese filtro.", vacioPed: "No hay pedidos con ese filtro.", cerrar: "Cerrar" },
      x: { pantalla: "Pantalla · computador", control: "Control · celular", conectados: "conectados", notas: "Notas", anterior: "Anterior", inicio: "Inicio", siguiente: "Siguiente", pausa: "Pausa", seguir: "Seguir", tema: "Tema", tocar: "Toca una tarjeta para resaltarla", mensaje: "Mensaje rápido", msgs: ["¡Un minuto!", "Más despacio", "Sigues tú"], pausada: "Presentación en pausa", expone: "Expone", de: "de" },
      e: { panel: "Panel del local", cliente: "Lo que ve el cliente", agotados: "Marca lo que se acabó", categorias: "Categorías completas", aviso: "Aviso del día", avisoPh: "Ej.: hoy cerramos a las 9 p. m.", agotado: "Agotado", agregar: "Agregar", pedido: "Tu pedido", vacio: "Toca Agregar en un producto.", enviar: "Enviar por WhatsApp", preview: "Así llegaría el mensaje", previewNota: "En la carta real este botón abre WhatsApp con el mensaje listo. Aquí solo se muestra.", hola: "¡Hola Emily Pizza! Quiero pedir:", totalTxt: "Total", catAgotada: "No disponible hoy", quitar: "Quitar" },
    },
    en: {
      v: { titulo: "Workshop dashboard", entrar: "Sign in as demo user", entrarNota: "The real system uses the brand's Google account. No data is requested here.", resumen: "Overview", pedidos: "Orders", productos: "Products", salir: "Sign out", demoUser: "demo@taller.app",
        kNuevos: "New orders", kCurso: "In progress", kMes: "Sales this month", kTotal: "All-time sales", grafica: "Delivered sales per month", lineas: "Earnings by line", ultimos: "Latest orders", linea: "Line", mes: "This month", total: "Total", cant: "Orders",
        buscar: "Search customer or product", orden: "Sort", recientes: "Newest", valor: "Highest value", enCurso: "In progress", todos: "All", simular: "Simulate new order", llego: "A new order came in", cliente: "Customer", producto: "Product", fecha: "Date", estado: "Status", valorCol: "Amount",
        detalle: "Order details", precio: "Final price (COP)", entrega: "Delivery date", notas: "Internal notes", guardar: "Save changes", cancelar: "Cancel", guardado: "Order updated", sinPrecio: "To be set", foto: "Reference photo attached", origen: "Source",
        nuevoProd: "New product", nombre: "Name", categoria: "Category", desde: "Starting price (optional)", crear: "Create product", creado: "Product created", visible: "Visible in store", oculto: "Hidden", errNombre: "Enter the product name.", errPrecio: "The price must be a positive number.", todas: "All", vacioP: "No products match that filter.", vacioPed: "No orders match that filter.", cerrar: "Close" },
      x: { pantalla: "Screen · computer", control: "Remote · phone", conectados: "connected", notas: "Notes", anterior: "Previous", inicio: "Start", siguiente: "Next", pausa: "Pause", seguir: "Resume", tema: "Theme", tocar: "Tap a card to highlight it", mensaje: "Quick message", msgs: ["One minute!", "Slow down", "Your turn"], pausada: "Presentation paused", expone: "Presenting", de: "of" },
      e: { panel: "Owner panel", cliente: "What the customer sees", agotados: "Mark what ran out", categorias: "Whole categories", aviso: "Today's notice", avisoPh: "E.g. we close at 9 p.m. today", agotado: "Sold out", agregar: "Add", pedido: "Your order", vacio: "Tap Add on a product.", enviar: "Send via WhatsApp", preview: "This is the message that would arrive", previewNota: "On the real menu this button opens WhatsApp with the message ready. Here it's only shown.", hola: "Hi Emily Pizza! I'd like to order:", totalTxt: "Total", catAgotada: "Not available today", quitar: "Remove" },
    },
    pt: {
      v: { titulo: "Painel do ateliê", entrar: "Entrar como usuária demo", entrarNota: "No sistema real o login é com a conta Google da marca. Aqui nenhum dado é pedido.", resumen: "Resumo", pedidos: "Pedidos", productos: "Produtos", salir: "Sair", demoUser: "demo@taller.app",
        kNuevos: "Pedidos novos", kCurso: "Em andamento", kMes: "Vendas do mês", kTotal: "Vendas acumuladas", grafica: "Vendas entregues por mês", lineas: "Vendas por linha", ultimos: "Últimos pedidos", linea: "Linha", mes: "Este mês", total: "Total", cant: "Pedidos",
        buscar: "Buscar cliente ou produto", orden: "Ordenar", recientes: "Mais recentes", valor: "Maior valor", enCurso: "Em andamento", todos: "Todos", simular: "Simular pedido novo", llego: "Chegou um pedido novo", cliente: "Cliente", producto: "Produto", fecha: "Data", estado: "Status", valorCol: "Valor",
        detalle: "Detalhe do pedido", precio: "Preço final (COP)", entrega: "Data de entrega", notas: "Notas internas", guardar: "Salvar", cancelar: "Cancelar", guardado: "Pedido atualizado", sinPrecio: "A definir", foto: "Com foto de referência", origen: "Origem",
        nuevoProd: "Novo produto", nombre: "Nome", categoria: "Categoria", desde: "Preço a partir de (opcional)", crear: "Criar produto", creado: "Produto criado", visible: "Visível na loja", oculto: "Oculto", errNombre: "Escreva o nome do produto.", errPrecio: "O preço deve ser um número positivo.", todas: "Todas", vacioP: "Nenhum produto com esse filtro.", vacioPed: "Nenhum pedido com esse filtro.", cerrar: "Fechar" },
      x: { pantalla: "Tela · computador", control: "Controle · celular", conectados: "conectados", notas: "Notas", anterior: "Anterior", inicio: "Início", siguiente: "Próximo", pausa: "Pausar", seguir: "Continuar", tema: "Tema", tocar: "Toque num cartão para destacá-lo", mensaje: "Mensagem rápida", msgs: ["Um minuto!", "Mais devagar", "Sua vez"], pausada: "Apresentação pausada", expone: "Apresenta", de: "de" },
      e: { panel: "Painel do local", cliente: "O que o cliente vê", agotados: "Marque o que acabou", categorias: "Categorias inteiras", aviso: "Aviso do dia", avisoPh: "Ex.: hoje fechamos às 21h", agotado: "Esgotado", agregar: "Adicionar", pedido: "Seu pedido", vacio: "Toque em Adicionar num produto.", enviar: "Enviar pelo WhatsApp", preview: "Assim chegaria a mensagem", previewNota: "No cardápio real este botão abre o WhatsApp com a mensagem pronta. Aqui só é mostrada.", hola: "Olá Emily Pizza! Quero pedir:", totalTxt: "Total", catAgotada: "Indisponível hoje", quitar: "Remover" },
    },
  };
  const tl = () => L[lang];

  /* ======================= El Taller de Vane ======================= */
  const ESTADOS = [
    { id: "nuevo", es: "Nuevo", en: "New", pt: "Novo" },
    { id: "confirmado", es: "Confirmado", en: "Confirmed", pt: "Confirmado" },
    { id: "proceso", es: "En proceso", en: "In progress", pt: "Em produção" },
    { id: "listo", es: "Listo", en: "Ready", pt: "Pronto" },
    { id: "entregado", es: "Entregado", en: "Delivered", pt: "Entregue" },
    { id: "cancelado", es: "Cancelado", en: "Cancelled", pt: "Cancelado" },
  ];
  const CATS = { tejido: { es: "Tejidos", en: "Knitwear", pt: "Tricô" }, pano: { es: "Muñecos en paño", en: "Felt dolls", pt: "Bonecos de feltro" }, deco: { es: "Decoración", en: "Decor", pt: "Decoração" }, papel: { es: "Papelería", en: "Paper goods", pt: "Papelaria" } };
  const nomEstado = (id) => (ESTADOS.find((e) => e.id === id) || {})[lang] || id;
  const PRODUCTOS_BASE = [
    ["munecos-grado", "Muñecos de grado personalizados", "pano", "grado", 85000],
    ["princesa-gala", "Princesa de gala", "pano", "princesa", 70000],
    ["carpetas-crochet", "Carpetas de crochet a dos tonos", "tejido", "carpeta-turquesa", 25000],
    ["set-bebe", "Set bebé: gorro osito y botines", "tejido", "set-osito", 45000],
    ["forro-buho", "Forro de silla búho y calabaza", "deco", "forro-buho", 38000],
    ["bruja-pelirroja", "Bruja pelirroja con escoba", "pano", "bruja-pelirroja", 60000],
    ["conejo-copa", "Conejo de copa", "pano", "conejo", 65000],
    ["cartelera-cumple", "Cartelera de cumpleaños o quince", "papel", "lunita", 30000],
    ["gorro-flor", "Gorro tejido con flor", "tejido", "gorro-rosa", 35000],
    ["muneco-nieve", "Muñeco de nieve con Papá Noel", "pano", "muneco-nieve", 62000],
    ["frankenstein", "Frankenstein de paño", "pano", "frankenstein", 55000],
    ["corona-halloween", "Corona de puerta Halloween", "deco", "corona-morada", 48000],
  ];
  const CLIENTES = ["Laura P.", "Andrés M.", "Camila R.", "Julián T.", "Valentina S.", "Diego C.", "Sofía L.", "Mateo G.", "Paula A.", "Santiago V.", "Daniela O.", "Felipe B."];
  const hoy = new Date();
  const dias = (n) => { const d = new Date(hoy); d.setDate(d.getDate() - n); return d; };
  const fmtFecha = (d) => d.toLocaleDateString({ es: "es-CO", en: "en-US", pt: "pt-BR" }[lang], { day: "numeric", month: "short" });
  function semillaVane() {
    const est = ["nuevo", "nuevo", "confirmado", "proceso", "proceso", "listo", "entregado", "entregado", "entregado", "entregado", "cancelado", "entregado", "entregado", "confirmado"];
    const pedidos = est.map((e, i) => {
      const pr = PRODUCTOS_BASE[(i * 5) % PRODUCTOS_BASE.length];
      const total = e === "nuevo" ? null : pr[4] + ((i * 7000) % 21000);
      return { id: "P-" + (1040 - i), cliente: CLIENTES[i % CLIENTES.length], producto: pr[1], cat: pr[2], estado: e, total, fecha: dias(i * 2 + (i > 6 ? 9 : 0)), entrega: "", notas: "", foto: i % 3 === 0, origen: i % 4 === 0 ? "catalogo" : "tienda" };
    });
    const productos = PRODUCTOS_BASE.map(([id, nombre, cat, foto, desde], i) => ({ id, nombre, cat, foto: `assets/demo/vane/${foto}.webp`, desde, visible: i !== 6 }));
    return { logged: false, vista: "resumen", pedidos, productos, filtro: "activos", q: "", orden: "fecha", catP: "todas", qP: "", nuevos: 0 };
  }
  let V = semillaVane();
  const historico = [520000, 610000, 480000, 735000, 690000]; // 5 meses anteriores (ficticio)

  function renderVane(cont) {
    const t = tl().v;
    if (!V.logged) {
      cont.innerHTML = `<div class="lv lv-solo"><div class="lv-login">
        <img src="assets/logos/vane.svg" alt="El Taller de Vane" width="180" height="60">
        <h3>${t.titulo}</h3>
        <button type="button" class="lv-btn lv-grad" data-v="entrar">${t.entrar}</button>
        <p>${t.entrarNota}</p></div></div>`;
      return;
    }
    const nNuevos = V.pedidos.filter((p) => p.estado === "nuevo").length;
    const menu = ["resumen", "pedidos", "productos"].map((v) => `<button type="button" class="${V.vista === v ? "on" : ""}" data-v="vista" data-x="${v}" aria-current="${V.vista === v ? "page" : "false"}">${t[v]}${v === "pedidos" && nNuevos ? ` <span class="lv-burbuja">${nNuevos}</span>` : ""}</button>`).join("");
    let main = "";
    if (V.vista === "resumen") main = vaneResumen(t);
    if (V.vista === "pedidos") main = vanePedidos(t);
    if (V.vista === "productos") main = vaneProductos(t);
    cont.innerHTML = `<div class="lv"><aside class="lv-side"><img src="assets/logos/vane.svg" alt="El Taller de Vane" width="150" height="50"><nav aria-label="Dashboard">${menu}</nav><div class="lv-user"><small>${t.demoUser}</small><button type="button" class="lv-btn lv-borde lv-sm" data-v="salir">${t.salir}</button></div></aside><div class="lv-main">${main}</div></div>`;
  }
  function vaneResumen(t) {
    const P = V.pedidos; const esMes = (d) => d.getMonth() === hoy.getMonth() && d.getFullYear() === hoy.getFullYear();
    const ent = P.filter((p) => p.estado === "entregado");
    const ventasMes = ent.filter((p) => esMes(p.fecha)).reduce((s, p) => s + (p.total || 0), 0);
    const ventasTot = ent.reduce((s, p) => s + (p.total || 0), 0) + historico.reduce((a, b) => a + b, 0);
    const curso = P.filter((p) => !["entregado", "cancelado"].includes(p.estado)).length;
    const meses = []; for (let i = 5; i >= 0; i--) { const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1); meses.push(d.toLocaleDateString({ es: "es-CO", en: "en-US", pt: "pt-BR" }[lang], { month: "short" })); }
    const valores = [...historico, ventasMes];
    const max = Math.max(...valores, 1) * 1.15;
    const W = 520, H = 200, pad = 28, bw = (W - pad * 2) / valores.length;
    const barras = valores.map((v, i) => { const h = (v / max) * (H - 50); const x = pad + i * bw + bw * .18; const y = H - 28 - h; return `<g><rect x="${x}" y="${y}" width="${bw * .64}" height="${h}" rx="6" class="${i === valores.length - 1 ? "lv-bar-hoy" : "lv-bar"}"><title>${meses[i]}: ${pesos(v)}</title></rect><text x="${x + bw * .32}" y="${H - 10}" text-anchor="middle" class="lv-ax">${meses[i]}</text><text x="${x + bw * .32}" y="${y - 6}" text-anchor="middle" class="lv-val">${Math.round(v / 1000)}k</text></g>`; }).join("");
    const lineas = Object.keys(CATS).map((c) => { const suyas = ent.filter((p) => p.cat === c); return { c, mes: suyas.filter((p) => esMes(p.fecha)).reduce((s, p) => s + p.total, 0), tot: suyas.reduce((s, p) => s + p.total, 0), n: suyas.length }; });
    return `<div class="lv-head"><h4>${t.resumen}</h4></div>
      <div class="lv-kpis">
        <div class="lv-kpi"><span>${t.kNuevos}</span><b>${P.filter((p) => p.estado === "nuevo").length}</b></div>
        <div class="lv-kpi"><span>${t.kCurso}</span><b>${curso}</b></div>
        <div class="lv-kpi"><span>${t.kMes}</span><b>${pesos(ventasMes)}</b></div>
        <div class="lv-kpi"><span>${t.kTotal}</span><b>${pesos(ventasTot)}</b></div>
      </div>
      <div class="lv-dos">
        <section class="lv-card"><h5>${t.grafica}</h5><svg viewBox="0 0 ${W} ${H}" class="lv-chart" role="img" aria-label="${t.grafica}"><line x1="${pad}" x2="${W - pad}" y1="${H - 28}" y2="${H - 28}" class="lv-axis"/>${barras}</svg></section>
        <section class="lv-card"><h5>${t.lineas}</h5><div class="lv-tabla-wrap"><table class="lv-tabla"><thead><tr><th>${t.linea}</th><th>${t.mes}</th><th>${t.total}</th><th>${t.cant}</th></tr></thead><tbody>${lineas.map((l) => `<tr><td>${CATS[l.c][lang]}</td><td>${pesos(l.mes)}</td><td>${pesos(l.tot)}</td><td>${l.n}</td></tr>`).join("")}</tbody></table></div></section>
      </div>
      <section class="lv-card"><h5>${t.ultimos}</h5><ul class="lv-ult">${[...P].sort((a, b) => b.fecha - a.fecha).slice(0, 4).map((p) => `<li><button type="button" data-v="abrir" data-x="${p.id}"><b>${esc(p.cliente)}</b><span>${esc(p.producto)}</span><span class="lv-est lv-${p.estado}">${nomEstado(p.estado)}</span></button></li>`).join("")}</ul></section>`;
  }
  function vanePedidos(t) {
    const P = V.pedidos;
    const cuenta = (id) => id === "activos" ? P.filter((p) => !["entregado", "cancelado"].includes(p.estado)).length : id === "todos" ? P.length : P.filter((p) => p.estado === id).length;
    const filtros = [{ id: "activos", n: t.enCurso }, ...ESTADOS.map((e) => ({ id: e.id, n: e[lang] })), { id: "todos", n: t.todos }];
    const q = V.q.trim().toLowerCase();
    let lista = P.filter((p) => V.filtro === "todos" ? true : V.filtro === "activos" ? !["entregado", "cancelado"].includes(p.estado) : p.estado === V.filtro)
      .filter((p) => !q || (p.cliente + " " + p.producto + " " + p.id).toLowerCase().includes(q));
    lista.sort(V.orden === "valor" ? (a, b) => (b.total || 0) - (a.total || 0) : (a, b) => b.fecha - a.fecha);
    return `<div class="lv-head"><h4>${t.pedidos}</h4><button type="button" class="lv-btn lv-grad lv-sm" data-v="simular">+ ${t.simular}</button></div>
      <div class="lv-chips" role="group" aria-label="${t.estado}">${filtros.map((f) => `<button type="button" class="lv-chip ${V.filtro === f.id ? "on" : ""}" aria-pressed="${V.filtro === f.id}" data-v="filtro" data-x="${f.id}">${f.n} <span>${cuenta(f.id)}</span></button>`).join("")}</div>
      <div class="lv-tools"><label class="lv-input"><span class="sr-only">${t.buscar}</span><input type="search" id="lv-q" placeholder="${t.buscar}" value="${esc(V.q)}"></label>
        <label class="lv-sel"><span>${t.orden}</span><select id="lv-orden"><option value="fecha" ${V.orden === "fecha" ? "selected" : ""}>${t.recientes}</option><option value="valor" ${V.orden === "valor" ? "selected" : ""}>${t.valor}</option></select></label></div>
      <div class="lv-tabla-wrap"><table class="lv-tabla lv-click"><thead><tr><th>#</th><th>${t.cliente}</th><th>${t.producto}</th><th>${t.fecha}</th><th>${t.estado}</th><th style="text-align:right">${t.valorCol}</th></tr></thead>
      <tbody>${lista.length ? lista.map((p) => `<tr class="${p.flash ? "lv-flash" : ""}" tabindex="0" data-v="abrir" data-x="${p.id}"><td class="lv-mono">${p.id}</td><td>${esc(p.cliente)}</td><td>${esc(p.producto)}</td><td>${fmtFecha(p.fecha)}</td><td><span class="lv-est lv-${p.estado}">${nomEstado(p.estado)}</span></td><td style="text-align:right" class="lv-mono">${p.total ? pesos(p.total) : `<em>${t.sinPrecio}</em>`}</td></tr>`).join("") : `<tr><td colspan="6" class="lv-vacio">${t.vacioPed}</td></tr>`}</tbody></table></div>`;
  }
  function vaneProductos(t) {
    const q = V.qP.trim().toLowerCase();
    const lista = V.productos.filter((p) => (V.catP === "todas" || p.cat === V.catP) && (!q || p.nombre.toLowerCase().includes(q)));
    return `<div class="lv-head"><h4>${t.productos}</h4><button type="button" class="lv-btn lv-grad lv-sm" data-v="nuevoProd">+ ${t.nuevoProd}</button></div>
      <div class="lv-tools"><label class="lv-input"><span class="sr-only">${t.buscar}</span><input type="search" id="lv-qp" placeholder="${t.nombre}…" value="${esc(V.qP)}"></label>
      <label class="lv-sel"><span>${t.categoria}</span><select id="lv-cat"><option value="todas">${t.todas}</option>${Object.keys(CATS).map((c) => `<option value="${c}" ${V.catP === c ? "selected" : ""}>${CATS[c][lang]}</option>`).join("")}</select></label></div>
      <div class="lv-prods">${lista.length ? lista.map((p) => `<article class="lv-prod ${p.visible ? "" : "off"}">
        ${p.foto ? `<img src="${p.foto}" alt="${esc(p.nombre)}" loading="lazy" width="360" height="360">` : `<div class="lv-ph">${esc(p.nombre[0] || "?")}</div>`}
        <div><b>${esc(p.nombre)}</b><small>${CATS[p.cat][lang]}${p.desde ? " · " + pesos(p.desde) : ""}</small>
        <label class="lv-switch"><input type="checkbox" data-v="visible" data-x="${p.id}" ${p.visible ? "checked" : ""}><span></span>${p.visible ? t.visible : t.oculto}</label></div></article>`).join("") : `<p class="lv-vacio">${t.vacioP}</p>`}</div>`;
  }
  function modalVane(html, alCerrar) {
    const m = document.createElement("div");
    m.className = "lab-modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
    m.innerHTML = `<div class="lab-modal-caja">${html}</div>`;
    const cerrar = () => { m.remove(); document.removeEventListener("keydown", tecla); alCerrar?.(); };
    const tecla = (e) => { if (e.key === "Escape") cerrar(); };
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-cerrar]")) cerrar(); });
    document.addEventListener("keydown", tecla);
    document.body.appendChild(m);
    (m.querySelector("input,select,textarea,button") || m).focus();
    return { m, cerrar };
  }
  function abrirPedido(id, origen) {
    const t = tl().v; const p = V.pedidos.find((x) => x.id === id); if (!p) return;
    const { m, cerrar } = modalVane(`
      <div class="lab-modal-head"><h4>${t.detalle} <span class="lv-mono">${p.id}</span></h4><button type="button" class="icon-btn" data-cerrar aria-label="${t.cerrar}"><svg aria-hidden="true"><use href="#i-x"/></svg></button></div>
      <dl class="lv-dl"><div><dt>${t.cliente}</dt><dd>${esc(p.cliente)} · 300 ••• ••${p.id.slice(-2)}</dd></div><div><dt>${t.producto}</dt><dd>${esc(p.producto)}</dd></div><div><dt>${t.fecha}</dt><dd>${fmtFecha(p.fecha)}</dd></div><div><dt>${t.origen}</dt><dd>${p.origen}${p.foto ? " · " + t.foto : ""}</dd></div></dl>
      <form class="lv-form" id="lv-form-ped">
        <label>${t.estado}<select name="estado">${ESTADOS.map((e) => `<option value="${e.id}" ${p.estado === e.id ? "selected" : ""}>${e[lang]}</option>`).join("")}</select></label>
        <label>${t.precio}<input name="total" inputmode="numeric" value="${p.total ?? ""}" placeholder="0"></label>
        <label>${t.entrega}<input name="entrega" type="date" value="${p.entrega}"></label>
        <label class="full">${t.notas}<textarea name="notas" rows="3">${esc(p.notas)}</textarea></label>
        <p class="lv-err full" id="lv-err-ped"></p>
        <div class="full lv-acc"><button type="button" class="lv-btn lv-borde" data-cerrar>${t.cancelar}</button><button class="lv-btn lv-grad">${t.guardar}</button></div>
      </form>`, () => origen?.focus());
    m.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault(); const f = e.target; const v = f.total.value.replace(/[^\d]/g, "");
      if (f.total.value && !v) { m.querySelector("#lv-err-ped").textContent = t.errPrecio; return; }
      Object.assign(p, { estado: f.estado.value, total: v ? +v : null, entrega: f.entrega.value, notas: f.notas.value.slice(0, 500) });
      cerrar(); renderLab(); toast(t.guardado);
    });
  }
  function nuevoProducto(origen) {
    const t = tl().v;
    const { m, cerrar } = modalVane(`
      <div class="lab-modal-head"><h4>${t.nuevoProd}</h4><button type="button" class="icon-btn" data-cerrar aria-label="${t.cerrar}"><svg aria-hidden="true"><use href="#i-x"/></svg></button></div>
      <form class="lv-form" id="lv-form-prod" novalidate>
        <label class="full">${t.nombre}<input name="nombre" maxlength="60" required></label>
        <label>${t.categoria}<select name="cat">${Object.keys(CATS).map((c) => `<option value="${c}">${CATS[c][lang]}</option>`).join("")}</select></label>
        <label>${t.desde}<input name="desde" inputmode="numeric" placeholder="45000"></label>
        <p class="lv-err full" id="lv-err-prod" role="alert"></p>
        <div class="full lv-acc"><button type="button" class="lv-btn lv-borde" data-cerrar>${t.cancelar}</button><button class="lv-btn lv-grad">${t.crear}</button></div>
      </form>`, () => origen?.focus());
    m.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault(); const f = e.target; const err = m.querySelector("#lv-err-prod");
      const nombre = f.nombre.value.trim(); const d = f.desde.value.trim();
      if (!nombre) { err.textContent = t.errNombre; f.nombre.focus(); return; }
      if (d && !/^\d+$/.test(d.replace(/[.\s]/g, ""))) { err.textContent = t.errPrecio; f.desde.focus(); return; }
      V.productos.unshift({ id: "nuevo-" + Date.now(), nombre, cat: f.cat.value, foto: "", desde: d ? +d.replace(/[.\s]/g, "") : null, visible: true });
      V.catP = "todas"; V.qP = ""; cerrar(); renderLab(); toast(t.creado);
    });
  }
  function eventosVane(cont) {
    cont.onclick = (e) => {
      const b = e.target.closest("[data-v]"); if (!b) return; const a = b.dataset.v; const x = b.dataset.x;
      if (a === "entrar") { V.logged = true; renderLab(); }
      if (a === "salir") { V.logged = false; renderLab(); }
      if (a === "vista") { V.vista = x; renderLab(); }
      if (a === "filtro") { V.filtro = x; renderLab(); }
      if (a === "abrir") abrirPedido(x, b);
      if (a === "nuevoProd") nuevoProducto(b);
      if (a === "simular") {
        const pr = PRODUCTOS_BASE[Math.floor(Math.random() * PRODUCTOS_BASE.length)];
        const n = 1041 + V.nuevos++;
        V.pedidos.forEach((p) => delete p.flash);
        V.pedidos.unshift({ id: "P-" + n, cliente: CLIENTES[(n * 7) % CLIENTES.length], producto: pr[1], cat: pr[2], estado: "nuevo", total: null, fecha: new Date(), entrega: "", notas: "", foto: true, origen: "tienda", flash: true });
        V.filtro = "activos"; renderLab(); toast(tl().v.llego);
      }
    };
    cont.onchange = (e) => {
      if (e.target.id === "lv-orden") { V.orden = e.target.value; renderLab(); }
      if (e.target.id === "lv-cat") { V.catP = e.target.value; renderLab(); }
      if (e.target.dataset.v === "visible") { const p = V.productos.find((q) => q.id === e.target.dataset.x); p.visible = e.target.checked; renderLab(); }
    };
    cont.oninput = (e) => {
      if (e.target.id === "lv-q") { V.q = e.target.value; renderConFoco("lv-q"); }
      if (e.target.id === "lv-qp") { V.qP = e.target.value; renderConFoco("lv-qp"); }
    };
    cont.onkeydown = (e) => { if (e.key === "Enter" && e.target.matches("tr[data-v]")) abrirPedido(e.target.dataset.x, e.target); };
  }
  function renderConFoco(id) {
    const el = document.getElementById(id); const pos = el.selectionStart;
    renderLab(); const n = document.getElementById(id); if (n) { n.focus(); n.setSelectionRange(pos, pos); }
  }

  /* ======================= .EXE ======================= */
  const SLIDES = {
    es: [
      { t: ".EXE", s: "Presentaciones con control remoto", cards: [], n: "Presentamos la idea: una sola plataforma para todas las exposiciones." },
      { t: "Una carpeta = una presentación", s: "El motor se escribe una vez", cards: [["core/", "Motor compartido"], ["p/<slug>/", "Cada exposición"], ["control/", "Control remoto"]], n: "Mostrar la estructura del repositorio." },
      { t: "El control en tu celular", s: "Sin instalar nada", cards: [["1 · QR", "Escaneas el código"], ["2 · Nombre", "Eliges quién eres"], ["3 · Control", "Pasas y resaltas"]], n: "Pedir a alguien del público que escanee." },
      { t: "Todo se sincroniza", s: "Realtime Database", cards: [["Diapositiva", "Todos ven la misma"], ["Resaltado", "Señala una tarjeta"], ["Pausa", "Congela la pantalla"]], n: "Resaltar cada tarjeta mientras se explica." },
      { t: "¡Gracias!", s: "¿Preguntas?", cards: [], n: "Abrir espacio para preguntas." },
    ],
    en: [
      { t: ".EXE", s: "Presentations with a remote control", cards: [], n: "Introduce the idea: one platform for every presentation." },
      { t: "One folder = one deck", s: "The engine is written once", cards: [["core/", "Shared engine"], ["p/<slug>/", "Each deck"], ["control/", "Remote control"]], n: "Show the repository structure." },
      { t: "The remote on your phone", s: "Nothing to install", cards: [["1 · QR", "Scan the code"], ["2 · Name", "Pick who you are"], ["3 · Control", "Move and highlight"]], n: "Ask someone in the audience to scan." },
      { t: "Everything syncs", s: "Realtime Database", cards: [["Slide", "Everyone sees the same"], ["Highlight", "Point to a card"], ["Pause", "Freeze the screen"]], n: "Highlight each card while explaining." },
      { t: "Thank you!", s: "Questions?", cards: [], n: "Open the floor for questions." },
    ],
    pt: [
      { t: ".EXE", s: "Apresentações com controle remoto", cards: [], n: "Apresentar a ideia: uma plataforma para todas as apresentações." },
      { t: "Uma pasta = uma apresentação", s: "O motor é escrito uma vez", cards: [["core/", "Motor compartilhado"], ["p/<slug>/", "Cada apresentação"], ["control/", "Controle remoto"]], n: "Mostrar a estrutura do repositório." },
      { t: "O controle no seu celular", s: "Sem instalar nada", cards: [["1 · QR", "Escaneie o código"], ["2 · Nome", "Escolha quem você é"], ["3 · Controle", "Passe e destaque"]], n: "Pedir a alguém da plateia para escanear." },
      { t: "Tudo sincroniza", s: "Realtime Database", cards: [["Slide", "Todos veem o mesmo"], ["Destaque", "Aponte um cartão"], ["Pausa", "Congela a tela"]], n: "Destacar cada cartão enquanto explica." },
      { t: "Obrigada!", s: "Perguntas?", cards: [], n: "Abrir espaço para perguntas." },
    ],
  };
  const EQ = { es: ["Aliz", "Integrante 2", "Integrante 3"], en: ["Aliz", "Teammate 2", "Teammate 3"], pt: ["Aliz", "Integrante 2", "Integrante 3"] };
  const equipo = () => EQ[lang];
  const REPARTO = [0, 0, 1, 2, 0];
  let X = { slide: 0, resalte: null, oscuro: false, pausa: false, msg: null, conectados: [true, true, false] };
  function renderExe(cont) {
    const t = tl().x; const S = SLIDES[lang]; const s = S[X.slide];
    const pantalla = `<div class="lx-screen ${X.oscuro ? "dark" : ""}" aria-live="polite">
      <div class="lx-bar"><img src="assets/logos/exe-oscuro.svg" alt=".EXE" width="56" height="20"><span>${t.expone}: ${equipo()[REPARTO[X.slide]]}</span><span>${X.slide + 1} ${t.de} ${S.length}</span></div>
      <div class="lx-body ${s.cards.length ? "" : "lx-portada"}"><h5>${esc(s.t)}</h5><p>${esc(s.s)}</p>
        ${s.cards.length ? `<div class="lx-cards">${s.cards.map((c, i) => `<div class="lx-card ${X.resalte === i ? "hl" : ""} ${X.resalte !== null && X.resalte !== i ? "dim" : ""}"><b>${esc(c[0])}</b><span>${esc(c[1])}</span></div>`).join("")}</div>` : ""}
      </div>
      <div class="lx-foot">${equipo().join(" · ")}</div>
      ${X.pausa ? `<div class="lx-pausa">${t.pausada}</div>` : ""}
      ${X.msg ? `<div class="lx-msg">${esc(X.msg)}</div>` : ""}
    </div>`;
    const control = `<div class="lx-phone"><div class="lx-ctrl">
      <div class="lx-ctrl-top"><b>.EXE</b><span class="lx-dot"></span><small>${X.conectados.filter(Boolean).length} ${t.conectados}</small></div>
      <div class="lx-presencia">${equipo().map((n, i) => `<button type="button" class="${X.conectados[i] ? "on" : ""}" data-x="presencia" data-i="${i}" aria-pressed="${X.conectados[i]}">${esc(n)}</button>`).join("")}</div>
      <div class="lx-mini"><small>${s.cards.length ? t.tocar : esc(s.t)}</small>${s.cards.map((c, i) => `<button type="button" class="${X.resalte === i ? "on" : ""}" data-x="resaltar" data-i="${i}" aria-pressed="${X.resalte === i}">${esc(c[0])}</button>`).join("")}</div>
      <div class="lx-notas"><small>${t.notas} · ${equipo()[REPARTO[X.slide]]}</small><p>${esc(s.n)}</p></div>
      <div class="lx-row"><button type="button" data-x="pausa" aria-pressed="${X.pausa}">${X.pausa ? t.seguir : t.pausa}</button><button type="button" data-x="tema" aria-pressed="${X.oscuro}">${t.tema}</button></div>
      <label class="lx-msgsel"><span>${t.mensaje}</span><select data-x="msg"><option value="">—</option>${t.msgs.map((m) => `<option ${X.msg === m ? "selected" : ""}>${esc(m)}</option>`).join("")}</select></label>
      <div class="lx-nav"><button type="button" data-x="ant" ${X.slide === 0 ? "disabled" : ""}>‹ ${t.anterior}</button><button type="button" data-x="ini">${t.inicio}</button><button type="button" data-x="sig" class="pri" ${X.slide === S.length - 1 ? "disabled" : ""}>${t.siguiente} ›</button></div>
    </div></div>`;
    cont.innerHTML = `<div class="lx"><div class="lx-col"><small class="lx-label">${t.pantalla}</small>${pantalla}</div><div class="lx-col lx-col-tel"><small class="lx-label">${t.control}</small>${control}</div></div>`;
  }
  function eventosExe(cont) {
    const S = () => SLIDES[lang];
    cont.onclick = (e) => {
      const b = e.target.closest("[data-x]"); if (!b || b.tagName === "SELECT") return;
      const a = b.dataset.x;
      if (a === "sig" && X.slide < S().length - 1) { X.slide++; X.resalte = null; }
      if (a === "ant" && X.slide > 0) { X.slide--; X.resalte = null; }
      if (a === "ini") { X.slide = 0; X.resalte = null; }
      if (a === "pausa") X.pausa = !X.pausa;
      if (a === "tema") X.oscuro = !X.oscuro;
      if (a === "resaltar") { const i = +b.dataset.i; X.resalte = X.resalte === i ? null : i; }
      if (a === "presencia") { const i = +b.dataset.i; X.conectados[i] = !X.conectados[i]; }
      renderLab(b.dataset.x === "presencia" || b.dataset.x === "resaltar" ? `[data-x="${a}"][data-i="${b.dataset.i}"]` : `[data-x="${a}"]`);
    };
    cont.onchange = (e) => { if (e.target.dataset.x === "msg") { X.msg = e.target.value || null; renderLab('[data-x="msg"]'); } };
    cont.onkeydown = (e) => {
      if (e.target.matches("input, select, textarea")) return;
      if (e.key === "ArrowRight" && X.slide < S().length - 1) { X.slide++; X.resalte = null; renderLab(); e.preventDefault(); }
      if (e.key === "ArrowLeft" && X.slide > 0) { X.slide--; X.resalte = null; renderLab(); e.preventDefault(); }
    };
  }

  /* ======================= Emily Pizza ======================= */
  const MENU = [
    { id: "hamburguesas", n: "Hamburguesas", img: "hamburguesas", items: [["Sencilla", 11000], ["Hawaiana", 14000], ["Colombiana", 18000], ["Doble carne", 18000], ["Ranchera", 18000], ["Criolla", 20000]] },
    { id: "pizzas", n: "Pizza personal", img: "pizzas", items: [["Tres carnes", 14000], ["Criolla", 14000], ["Mexicana", 14000], ["Hawaiana", 14000], ["Napolitana", 14000], ["Chocoreo", 14000]] },
    { id: "perros", n: "Perros", img: "perros", items: [["Sencillo", 11000], ["Hawaiano", 15000], ["Especial", 18000], ["Criollo", 20000], ["Súper especial", 22000]] },
    { id: "salchipapas", n: "Salchipapas", img: "salchipapas", items: [["Sencilla", 11000], ["Especial", 15000], ["Súper", 18000], ["Salchi Emily", 18000]] },
  ];
  let E = { agot: { "hamburguesas|Colombiana": true }, catOff: {}, aviso: "", cat: "hamburguesas", carrito: [] };
  const clave = (c, n) => c + "|" + n;
  function renderEmily(cont) {
    const t = tl().e; const cat = MENU.find((c) => c.id === E.cat);
    const panel = `<div class="le-panel">
      <div class="le-ph"><img src="assets/logos/emily-oscuro.webp" alt="Emily Pizza" width="90" height="81"><b>${t.panel}</b></div>
      <label class="le-aviso"><span>${t.aviso}</span><input id="le-aviso" maxlength="80" placeholder="${t.avisoPh}" value="${esc(E.aviso)}"></label>
      <p class="le-sub">${t.categorias}</p>
      <div class="le-cats">${MENU.map((c) => `<label class="le-tog"><input type="checkbox" data-e="cat" data-c="${c.id}" ${E.catOff[c.id] ? "" : "checked"}><span></span>${c.n}</label>`).join("")}</div>
      <p class="le-sub">${t.agotados}</p>
      ${MENU.map((c) => `<details ${c.id === E.cat ? "open" : ""}><summary>${c.n}</summary><div class="le-items">${c.items.map(([n]) => `<label class="le-chk"><input type="checkbox" data-e="agot" data-k="${esc(clave(c.id, n))}" ${E.agot[clave(c.id, n)] ? "checked" : ""}>${esc(n)}<em>${t.agotado}</em></label>`).join("")}</div></details>`).join("")}
    </div>`;
    const total = E.carrito.reduce((s, x) => s + x.p * x.q, 0);
    const telefono = `<div class="le-phone"><div class="le-app">
      <div class="le-top"><img src="assets/logos/emily-oscuro.webp" alt="Emily Pizza" width="60" height="54"></div>
      ${E.aviso ? `<div class="le-banner" role="status">${esc(E.aviso)}</div>` : ""}
      <div class="le-tabs" role="tablist">${MENU.map((c) => `<button type="button" role="tab" aria-selected="${c.id === E.cat}" data-e="tab" data-c="${c.id}" class="${E.catOff[c.id] ? "off" : ""}"><img src="assets/demo/emily/${c.img}.webp" alt="" width="44" height="44">${c.n.split(" ")[0]}</button>`).join("")}</div>
      <div class="le-lista">${E.catOff[cat.id] ? `<p class="le-off">${t.catAgotada}</p>` : cat.items.map(([n, p]) => { const ag = !!E.agot[clave(cat.id, n)]; return `<div class="le-item ${ag ? "ag" : ""}"><div><b>${esc(n)}</b><span>${pesos(p)}</span></div>${ag ? `<em>${t.agotado}</em>` : `<button type="button" data-e="add" data-n="${esc(n)}" data-p="${p}">+ ${t.agregar}</button>`}</div>`; }).join("")}</div>
      <div class="le-cart"><b>${t.pedido}</b>${E.carrito.length ? `<ul>${E.carrito.map((x, i) => `<li><span>${x.q}× ${esc(x.cat)} ${esc(x.n)}</span><span>${pesos(x.p * x.q)}</span><button type="button" data-e="quitar" data-i="${i}" aria-label="${t.quitar} ${esc(x.n)}">×</button></li>`).join("")}</ul><div class="le-total"><span>${t.totalTxt}</span><b>${pesos(total)}</b></div><button type="button" class="le-wa" data-e="enviar">${t.enviar}</button>` : `<p>${t.vacio}</p>`}</div>
    </div></div>`;
    cont.innerHTML = `<div class="le"><div class="le-col"><small class="lx-label">${t.panel}</small>${panel}</div><div class="le-col le-col-tel"><small class="lx-label">${t.cliente}</small>${telefono}</div></div>`;
  }
  function eventosEmily(cont) {
    cont.onchange = (e) => {
      const el = e.target;
      if (el.dataset.e === "agot") { E.agot[el.dataset.k] = el.checked; E.carrito = E.carrito.filter((x) => !E.agot[clave(x.c, x.n)]); renderLab(`[data-k="${CSS.escape(el.dataset.k)}"]`); }
      if (el.dataset.e === "cat") { E.catOff[el.dataset.c] = !el.checked; E.carrito = E.carrito.filter((x) => !E.catOff[x.c]); renderLab(`[data-e="cat"][data-c="${el.dataset.c}"]`); }
    };
    cont.oninput = (e) => { if (e.target.id === "le-aviso") { E.aviso = e.target.value; renderConFoco("le-aviso"); } };
    cont.onclick = (e) => {
      const b = e.target.closest("[data-e]"); if (!b || b.tagName === "INPUT") return; const a = b.dataset.e;
      if (a === "tab") { E.cat = b.dataset.c; renderLab(`[data-e="tab"][data-c="${b.dataset.c}"]`); }
      if (a === "add") { const cat = MENU.find((c) => c.id === E.cat); const ya = E.carrito.find((x) => x.c === E.cat && x.n === b.dataset.n); if (ya) ya.q++; else E.carrito.push({ c: E.cat, cat: cat.n.replace(/s$/, ""), n: b.dataset.n, p: +b.dataset.p, q: 1 }); renderLab(); }
      if (a === "quitar") { E.carrito.splice(+b.dataset.i, 1); renderLab(); }
      if (a === "enviar") {
        const t = tl().e; const total = E.carrito.reduce((s, x) => s + x.p * x.q, 0);
        const msg = `${t.hola}\n${E.carrito.map((x) => `• ${x.q} × ${x.cat} ${x.n} — ${pesos(x.p * x.q)}`).join("\n")}\n${t.totalTxt}: ${pesos(total)}`;
        modalVane(`<div class="lab-modal-head"><h4>${t.preview}</h4><button type="button" class="icon-btn" data-cerrar aria-label="${tl().v.cerrar}"><svg aria-hidden="true"><use href="#i-x"/></svg></button></div><pre class="le-wa-msg">${esc(msg)}</pre><p class="le-nota">${t.previewNota}</p>`, () => b.focus());
      }
    };
    cont.onkeydown = null;
  }

  /* ======================= contenedor ======================= */
  const DEMOS = { vane: [renderVane, eventosVane, "#6D4AFF", "V"], exe: [renderExe, eventosExe, "#9440DD", ".E"], emily: [renderEmily, eventosEmily, "#bfa173", "E"] };
  function renderShell() {
    const T = window.I18N[lang].lab;
    raiz.innerHTML = `
      <div class="lab-tabs" role="tablist" aria-label="Demos">${Object.keys(DEMOS).map((k) => `<button type="button" role="tab" class="lab-tab" id="tab-${k}" aria-controls="lab-panel" aria-selected="${activa === k}" data-demo-tab="${k}"><span class="lt-ico" style="background:color-mix(in srgb, ${DEMOS[k][2]} 16%, transparent);color:${DEMOS[k][2]}">${DEMOS[k][3]}</span><span><b>${T.tabs[k][0]}</b><small>${T.tabs[k][1]}</small></span></button>`).join("")}</div>
      <div class="lab-aviso"><span><strong>${T.aviso}</strong></span><span style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="nivel">${T.nivel}</span><button type="button" class="btn btn-ghost btn-sm" data-reset>${T.reiniciar}</button></span></div>
      <div class="lab-stage" id="lab-panel" role="tabpanel" aria-labelledby="tab-${activa}"></div>
      <div class="lab-explica">${T.explica[activa].map(([a, b]) => `<div><b>${a}</b>${b}</div>`).join("")}</div>`;
    raiz.querySelectorAll("[data-demo-tab]").forEach((b) => b.addEventListener("click", () => abrir(b.dataset.demoTab, true)));
    raiz.querySelector("[data-reset]").addEventListener("click", () => {
      if (activa === "vane") V = semillaVane();
      if (activa === "exe") X = { slide: 0, resalte: null, oscuro: false, pausa: false, msg: null, conectados: [true, true, false] };
      if (activa === "emily") E = { agot: { "hamburguesas|Colombiana": true }, catOff: {}, aviso: "", cat: "hamburguesas", carrito: [] };
      renderLab();
    });
    const tabs = [...raiz.querySelectorAll("[data-demo-tab]")];
    raiz.querySelector(".lab-tabs").addEventListener("keydown", (e) => {
      const i = tabs.indexOf(document.activeElement); if (i < 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); abrir(n.dataset.demoTab, true); }
    });
    renderLab();
  }
  function renderLab(focoSel) {
    const cont = raiz?.querySelector("#lab-panel"); if (!cont) return;
    const [render, eventos] = DEMOS[activa];
    render(cont); eventos(cont);
    if (focoSel) cont.querySelector(focoSel)?.focus();
  }
  function abrir(id, desdeTab) {
    if (!DEMOS[id] || !raiz) return;
    activa = id; renderShell();
    if (desdeTab) raiz.querySelector(`#tab-${id}`)?.focus();
    else document.getElementById("lab")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  window.ALIZ_LAB = {
    montar(el, l) { raiz = el; lang = l; renderShell(); },
    idioma(l) { lang = l; },
    abrir(id) { abrir(id, false); },
  };
})();
