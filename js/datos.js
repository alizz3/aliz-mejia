/* =========================================================================
   Portafolio de Aliz Mejía · DATOS
   Todo el contenido del sitio vive aquí, separado del diseño.
   Para agregar un proyecto: copia un objeto de PROYECTOS y cambia sus datos.
   Textos en tres idiomas: { es, en, pt }.
   Lo que está marcado con "POR COMPLETAR" es información que falta confirmar.
   ========================================================================= */

window.PERFIL = {
  nombre: "Aliz Mejía",
  corto: "Aliz",
  ciudad: "Bogotá, Colombia",
  email: "dev.doblezz@gmail.com",
  whatsapp: "573113071168",
  whatsappTexto: "+57 311 307 1168",
  github: "https://github.com/alizz3",
  linkedin: "https://www.linkedin.com/in/alizz-doblezz",
  // Cuando tengas tu foto, ponla en assets/foto/aliz.webp y cambia a true.
  foto: false,
  fotoSobreMi: false,
};

/* ---------- Proyectos ----------
   estado:   vivo | desarrollo | academico | empresa | archivo
   categorias: web | dashboard | backend | cliente | academico | prototipo
   repo.publico: false = el repositorio es privado (el botón no se muestra como enlace)
   lab: id de la demo interactiva (vane | exe | emily) o null
*/
window.PROYECTOS = [
  {
    slug: "mumu",
    nombre: "MuMu",
    logo: { claro: "assets/logos/mumu.svg", oscuro: "assets/logos/mumu.svg" },
    destacado: true,
    estado: "vivo",
    anio: "2026",
    categorias: ["web", "dashboard", "backend"],
    stack: ["Vue 3", "Vite", "Firebase Auth", "Firestore", "Vercel Functions", "Google OAuth", "Gmail API", "Calendar API", "Classroom API", "Moodle Web Services", "PWA"],
    vivo: "https://mu-mu-blond.vercel.app/",
    repo: { url: "https://github.com/alizz3/MuMu", publico: true },
    lab: null,
    composicion: "mixta",
    imagenes: [
      { src: "assets/proyectos/mumu-1.webp", tipo: "desk", alt: { es: "Inicio de MuMu con la recomendación de qué hacer ahora y la vaquita", en: "MuMu home with the what-to-do-now suggestion and the cow mascot", pt: "Início do MuMu com a sugestão do que fazer agora e a vaquinha" } },
      { src: "assets/proyectos/mumu-2.webp", tipo: "mob", alt: { es: "MuMu en celular", en: "MuMu on a phone", pt: "MuMu no celular" } },
      { src: "assets/proyectos/mumu-3.webp", tipo: "mob", alt: { es: "La casita de la vaquita con Leo y Negra", en: "The cow's little house with Leo and Negra", pt: "A casinha da vaquinha com Leo e Negra" } },
    ],
    t: {
      es: {
        tipo: "Sistema operativo personal",
        resumen: "Agenda, hábitos, universidad y segundo cerebro en una sola app, con una vaquita que recomienda qué hacer ahora.",
        rol: "Proyecto propio: producto, diseño, ilustraciones, frontend, backend e integraciones.",
        contexto: "Tenía mis pendientes repartidos entre Tu Aula, Classroom, Gmail, el calendario y notas sueltas, y mucho de lo que aprendía en libros y podcasts se quedaba en la teoría.",
        problema: "Las apps de tareas solo muestran listas: no saben cuánto tiempo libre tengo, qué vence primero ni qué me ha funcionado antes. Y casi todas castigan cuando pierdes una racha.",
        objetivo: "Una app que una todas mis fuentes, me diga qué hacer en el tiempo libre que tengo y aprenda de mis propios datos, sin generar culpa.",
        solucion: "Una app en Vue 3 con un motor propio que cruza agenda, fechas límite, prioridad, energía y tiempo libre para recomendar una sola acción. Se conecta con Gmail, Google Calendar y Classroom por OAuth (varias cuentas, permisos mínimos y sumables) y con Tu Aula vía Moodle. Incluye modo enfoque de 5 minutos, rachas flexibles, experimentos personales que construyen “mi propio método”, analítica sobre mis datos y una casita que se decora con el progreso real.",
        funciones: ["“¿Qué hago ahora?”: recomendación según tiempo libre, fechas y energía", "Agenda que detecta huecos libres y agenda bloques para cada tarea", "Gmail, Calendar y Classroom con varias cuentas de Google", "Tu Aula (Moodle) con detección de tareas nuevas y cambios de fecha", "Modo “No quiero hacer esto 😭”: empezar con 5 minutos", "Hábitos con rachas flexibles (“18 de 24 días”)", "Mi cerebro: libros y podcasts → principios → experimentos", "Gamificación con la vaquita, Leo y Negra (ilustraciones SVG propias)", "Instalable como app (PWA) y modo claro/oscuro"],
        decisiones: ["Tokens de Google y de Moodle cifrados con AES-256-GCM en una zona de Firestore que el navegador no puede leer; la contraseña de Tu Aula se usa una vez y se descarta.", "Toda la API vive en una sola función serverless con un enrutador propio, para caber en el plan gratuito de Vercel.", "Permisos de Google incrementales: se suman sin perder los anteriores, y la app muestra lo que Google realmente entregó.", "Sin integraciones inventadas: lo que una web no puede hacer (leer el tiempo de pantalla, aparecer sobre otras apps) se registra a mano y queda listo para una futura app nativa."],
        aprendizajes: "Integrar APIs reales (OAuth, Moodle) enseña más sobre errores y permisos que cualquier tutorial. Próximo: conectar MuMu Finanzas y notificaciones push.",
      },
      en: {
        tipo: "Personal operating system",
        resumen: "Planner, habits, university and second brain in one app, with a cow mascot that tells you what to do next.",
        rol: "My own project: product, design, illustrations, frontend, backend and integrations.",
        contexto: "My to-dos were scattered across Tu Aula, Classroom, Gmail, my calendar and loose notes, and much of what I learned from books and podcasts stayed in theory.",
        problema: "To-do apps only show lists: they don't know how much free time I have, what's due first or what has worked for me before. And most of them punish you for breaking a streak.",
        objetivo: "One app that joins all my sources, tells me what to do with the free time I actually have and learns from my own data, without guilt.",
        solucion: "A Vue 3 app with its own engine that combines schedule, deadlines, priority, energy and free time to suggest a single action. It connects to Gmail, Google Calendar and Classroom through OAuth (multiple accounts, minimal and incremental permissions) and to Tu Aula through Moodle. It includes a 5-minute focus mode, flexible streaks, personal experiments that build “my own method”, analytics on my own data and a little house decorated with real progress.",
        funciones: ["“What should I do now?”: a suggestion based on free time, deadlines and energy", "Planner that finds free blocks and schedules sessions for each task", "Gmail, Calendar and Classroom with multiple Google accounts", "Tu Aula (Moodle) with new-task and due-date-change detection", "“I don't want to do this 😭” mode: start with 5 minutes", "Habits with flexible streaks (“18 of 24 days”)", "Second brain: books and podcasts → principles → experiments", "Gamification with the cow, Leo and Negra (original SVG illustrations)", "Installable (PWA) with light and dark mode"],
        decisiones: ["Google and Moodle tokens encrypted with AES-256-GCM in a Firestore area the browser can't read; the Tu Aula password is used once and discarded.", "The whole API runs in a single serverless function with a custom router, to fit Vercel's free plan.", "Incremental Google permissions: new ones add up without losing the old ones, and the app shows what Google actually granted.", "No fake integrations: what a website can't do (read screen time, draw over other apps) is logged manually and ready for a future native app."],
        aprendizajes: "Integrating real APIs (OAuth, Moodle) teaches more about errors and permissions than any tutorial. Next: connect MuMu Finanzas and push notifications.",
      },
      pt: {
        tipo: "Sistema operacional pessoal",
        resumen: "Agenda, hábitos, faculdade e segundo cérebro num só app, com uma vaquinha que recomenda o que fazer agora.",
        rol: "Projeto próprio: produto, design, ilustrações, frontend, backend e integrações.",
        contexto: "Minhas pendências estavam espalhadas entre o Tu Aula, o Classroom, o Gmail, a agenda e notas soltas, e muito do que eu aprendia em livros e podcasts ficava na teoria.",
        problema: "Os apps de tarefas só mostram listas: não sabem quanto tempo livre eu tenho, o que vence primeiro nem o que já funcionou para mim. E quase todos punem quando você perde uma sequência.",
        objetivo: "Um app que una todas as minhas fontes, diga o que fazer com o tempo livre que eu tenho e aprenda com os meus próprios dados, sem culpa.",
        solucion: "Um app em Vue 3 com um motor próprio que cruza agenda, prazos, prioridade, energia e tempo livre para recomendar uma única ação. Conecta-se ao Gmail, Google Agenda e Classroom via OAuth (várias contas, permissões mínimas e incrementais) e ao Tu Aula via Moodle. Inclui modo foco de 5 minutos, sequências flexíveis, experimentos pessoais que constroem “meu próprio método”, análises dos meus dados e uma casinha decorada com o progresso real.",
        funciones: ["“O que eu faço agora?”: sugestão pelo tempo livre, prazos e energia", "Agenda que encontra horários livres e agenda blocos para cada tarefa", "Gmail, Agenda e Classroom com várias contas Google", "Tu Aula (Moodle) com detecção de tarefas novas e mudanças de prazo", "Modo “Não quero fazer isso 😭”: começar com 5 minutos", "Hábitos com sequências flexíveis (“18 de 24 dias”)", "Segundo cérebro: livros e podcasts → princípios → experimentos", "Gamificação com a vaquinha, Leo e Negra (ilustrações SVG próprias)", "Instalável (PWA) e modo claro/escuro"],
        decisiones: ["Tokens do Google e do Moodle criptografados com AES-256-GCM numa área do Firestore que o navegador não lê; a senha do Tu Aula é usada uma vez e descartada.", "Toda a API roda numa única função serverless com roteador próprio, para caber no plano gratuito da Vercel.", "Permissões do Google incrementais: as novas se somam sem perder as anteriores, e o app mostra o que o Google realmente concedeu.", "Sem integrações inventadas: o que um site não pode fazer (ler o tempo de tela, aparecer sobre outros apps) é registrado manualmente e fica pronto para um futuro app nativo."],
        aprendizajes: "Integrar APIs reais (OAuth, Moodle) ensina mais sobre erros e permissões do que qualquer tutorial. Próximo: conectar o MuMu Finanzas e notificações push.",
      },
    },
    flujo: ["App · Vue 3 + PWA", "Motor · ¿qué hago ahora?", "API · 1 función en Vercel", "Google OAuth · Gmail, Calendar, Classroom", "Moodle · Tu Aula", "Firestore · datos + tokens cifrados"],
    codigo: {
      archivo: "api/_lib/crypto.js",
      lenguaje: "js",
      texto: `export function encrypt(value) {
  const iv = crypto.randomBytes(12)
  const c = crypto.createCipheriv('aes-256-gcm', key(), iv)
  const data = Buffer.concat([c.update(JSON.stringify(value), 'utf8'), c.final()])
  return \`v1.\${iv.toString('base64url')}.\${c.getAuthTag().toString('base64url')}.\${data.toString('base64url')}\`
}`,
    },
  },

  {
    slug: "el-taller-de-vane",
    nombre: "El Taller de Vane",
    logo: { claro: "assets/logos/vane.svg", oscuro: "assets/logos/vane-blanco.svg" },
    destacado: true,
    estado: "vivo",
    anio: "2026",
    categorias: ["web", "dashboard"],
    stack: ["React", "Vite", "Firebase Auth", "Firestore", "Firebase Storage", "Cloudinary", "React Router"],
    vivo: "https://el-taller-de-vane.web.app",
    repo: { url: "https://github.com/alizz3/el-taller-de-vane", publico: false },
    lab: "vane",
    composicion: "navegador",
    imagenes: [
      { src: "assets/proyectos/vane-1.webp", tipo: "desk", alt: { es: "Página de inicio de la tienda El Taller de Vane", en: "El Taller de Vane store home page", pt: "Página inicial da loja El Taller de Vane" } },
      { src: "assets/proyectos/vane-2.webp", tipo: "mob", alt: { es: "La tienda en celular", en: "The store on a phone", pt: "A loja no celular" } },
    ],
    t: {
      es: {
        tipo: "Tienda en línea + dashboard",
        resumen: "Tienda y panel de administración para una marca familiar de productos hechos a mano en Bogotá.",
        rol: "Proyecto propio: diseño de marca, interfaz, desarrollo y despliegue.",
        contexto: "El Taller de Vane reúne los tejidos, muñecos en paño y cartas pintadas a mano que hace mi familia. Antes todo se vendía por WhatsApp con fotos sueltas.",
        problema: "No había un catálogo organizado, los pedidos personalizados se perdían entre mensajes y no había forma de saber cuánto había vendido cada artesana.",
        objetivo: "Tener un catálogo que tome pedidos con los datos necesarios y un panel privado para gestionarlos de principio a fin.",
        solucion: "Una tienda en React con catálogo filtrable, ficha con varias fotos y un personalizador de muñecos de grado. Cada pedido llega con nombre, celular y foto de referencia. El dashboard, con login de Google, muestra los pedidos en vivo, permite subir y recortar fotos de productos, lleva las cuentas por artesana y administra reseñas y catálogos personales.",
        funciones: ["Catálogo con filtros y ficha de producto con varias fotos", "Personalizador de muñecos de grado", "Pedido con foto de referencia (sube a Storage)", "Dashboard con pedidos en vivo (onSnapshot) y estados", "Subida y recorte de fotos de productos", "Cuentas por artesana: ventas del mes y acumuladas", "Catálogos personales con enlace propio para compartir"],
        decisiones: ["Si Firebase no está configurado, la tienda funciona igual con productos de ejemplo y pedidos por WhatsApp. Así se pudo publicar antes de tener la base de datos lista.", "Toda la lectura y escritura a Firebase está en un solo archivo (lib/datos.js), para poder cambiar de base de datos tocando un solo lugar.", "Solo el correo de la marca puede leer pedidos y fotos; el cliente solo puede crearlos (reglas de Firestore y Storage)."],
        aprendizajes: "Diseñar pensando en quien administra, no solo en quien compra. Próximo paso: reportes por temporada y notificaciones de pedidos nuevos.",
      },
      en: {
        tipo: "Online store + dashboard",
        resumen: "Store and admin dashboard for a family brand of handmade goods in Bogotá.",
        rol: "My own project: brand design, interface, development and deployment.",
        contexto: "El Taller de Vane brings together the knitwear, felt dolls and hand-painted cards my family makes. Before this, everything was sold over WhatsApp with loose photos.",
        problema: "There was no organized catalog, custom orders got lost in chats and there was no way to see how much each artisan had sold.",
        objetivo: "A catalog that takes orders with the right details, plus a private dashboard to manage them end to end.",
        solucion: "A React store with a filterable catalog, multi-photo product pages and a graduation-doll customizer. Each order arrives with name, phone and a reference photo. The dashboard, behind Google sign-in, shows orders live, lets you upload and crop product photos, tracks earnings per artisan and manages reviews and personal catalogs.",
        funciones: ["Filterable catalog and multi-photo product pages", "Graduation-doll customizer", "Orders with a reference photo (uploaded to Storage)", "Dashboard with live orders (onSnapshot) and statuses", "Product photo upload and cropping", "Earnings per artisan: this month and all time", "Personal catalogs with their own shareable link"],
        decisiones: ["Without Firebase configured, the store still works with sample products and WhatsApp orders, so it could go live before the database was ready.", "All Firebase reads and writes live in one file (lib/datos.js), so the database can be swapped by touching one place.", "Only the brand account can read orders and photos; customers can only create them (Firestore and Storage rules)."],
        aprendizajes: "Designing for the person who runs the shop, not only the buyer. Next: seasonal reports and new-order notifications.",
      },
      pt: {
        tipo: "Loja online + painel",
        resumen: "Loja e painel administrativo para uma marca familiar de produtos feitos à mão em Bogotá.",
        rol: "Projeto próprio: identidade visual, interface, desenvolvimento e deploy.",
        contexto: "El Taller de Vane reúne os tricôs, bonecos de feltro e cartões pintados à mão que minha família faz. Antes, tudo era vendido pelo WhatsApp com fotos soltas.",
        problema: "Não havia catálogo organizado, os pedidos personalizados se perdiam nas conversas e não dava para saber quanto cada artesã tinha vendido.",
        objetivo: "Um catálogo que receba pedidos com os dados certos e um painel privado para gerenciá-los do início ao fim.",
        solucion: "Uma loja em React com catálogo filtrável, página de produto com várias fotos e um personalizador de bonecos de formatura. Cada pedido chega com nome, celular e foto de referência. O painel, com login do Google, mostra os pedidos ao vivo, permite enviar e recortar fotos, controla as vendas por artesã e administra avaliações e catálogos pessoais.",
        funciones: ["Catálogo com filtros e página de produto com várias fotos", "Personalizador de bonecos de formatura", "Pedido com foto de referência (enviada ao Storage)", "Painel com pedidos ao vivo (onSnapshot) e status", "Envio e recorte de fotos de produtos", "Vendas por artesã: do mês e acumuladas", "Catálogos pessoais com link próprio"],
        decisiones: ["Sem o Firebase configurado, a loja funciona com produtos de exemplo e pedidos pelo WhatsApp; deu para publicar antes do banco de dados estar pronto.", "Toda leitura e escrita no Firebase fica em um só arquivo (lib/datos.js), para trocar de banco mexendo em um lugar só.", "Só a conta da marca lê pedidos e fotos; o cliente só pode criá-los (regras do Firestore e do Storage)."],
        aprendizajes: "Projetar para quem administra, não só para quem compra. Próximo passo: relatórios por temporada e avisos de pedidos novos.",
      },
    },
    flujo: ["Tienda · React", "Firestore · productos / pedidos", "Storage · fotos de referencia", "Dashboard · /admin (Google Auth)"],
    codigo: {
      archivo: "src/lib/datos.js",
      lenguaje: "js",
      texto: `export async function cargarProductos() {
  if (!firebaseReady) return PRODUCTOS_EJEMPLO;
  try {
    const snap = await getDocs(query(
      collection(db, 'productos'), where('activo', '==', true)));
    const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (!lista.length) return PRODUCTOS_EJEMPLO;
    return lista.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
  } catch (e) {
    console.warn('No se pudieron leer los productos, uso los de ejemplo', e);
    return PRODUCTOS_EJEMPLO;
  }
}`,
    },
  },

  {
    slug: "exe-presentaciones",
    nombre: ".EXE",
    logo: { claro: "assets/logos/exe.svg", oscuro: "assets/logos/exe-oscuro.svg" },
    destacado: true,
    estado: "vivo",
    anio: "2026",
    categorias: ["web", "dashboard", "academico"],
    stack: ["JavaScript", "Firebase Realtime Database", "Firebase Auth", "PWA", "Service Worker", "Vercel"],
    vivo: null, // POR COMPLETAR: pon aquí el enlace de Vercel de .EXE
    repo: { url: "https://github.com/alizz3/exe-presentaciones", publico: false },
    lab: "exe",
    composicion: "diapositivas",
    imagenes: [
      { src: "assets/proyectos/exe-1.webp", tipo: "desk", alt: { es: "Presentación interactiva MONAMY sobre teoría de sistemas", en: "MONAMY interactive presentation on systems theory", pt: "Apresentação interativa MONAMY sobre teoria de sistemas" } },
      { src: "assets/proyectos/exe-2.webp", tipo: "desk", alt: { es: "Presentación sobre la distribución normal", en: "Presentation on the normal distribution", pt: "Apresentação sobre a distribuição normal" } },
      { src: "assets/proyectos/exe-3.webp", tipo: "desk", alt: { es: "Presentación sobre teorías éticas", en: "Presentation on ethical theories", pt: "Apresentação sobre teorias éticas" } },
      { src: "assets/proyectos/exe-4.webp", tipo: "mob", alt: { es: "Control remoto en el celular", en: "Phone remote control", pt: "Controle remoto no celular" } },
    ],
    t: {
      es: {
        tipo: "Presentaciones con control remoto",
        resumen: "Un motor de presentaciones web que se manejan desde el celular, sincronizadas en tiempo real, con dashboard para equipos y materias.",
        rol: "Proyecto propio: arquitectura, motor, diseño de marca y presentaciones.",
        contexto: "En la universidad expongo en grupo casi cada semana. Cada exposición terminaba siendo un repo, un hosting y una base de datos nuevos.",
        problema: "Repetir la configuración en cada exposición quitaba tiempo, y en clase pasar diapositivas y repartir turnos entre varias personas era desordenado.",
        objetivo: "Un solo proyecto para todas las exposiciones: agregar una carpeta y tener presentación, control remoto y reparto de turnos listos.",
        solucion: "Un motor compartido (navegación, pantalla grande, resaltado, tema, pausa, video y QR) que usan todas las presentaciones. Cada integrante abre el control en su celular escaneando el QR; el estado de la sala (diapositiva, resaltado, tema, presencia y mensajes) se sincroniza por Firebase Realtime Database. Un dashboard con login de Google administra equipos, roles y materias.",
        funciones: ["Control remoto por QR desde cualquier celular", "Sincronización en vivo de diapositiva, resaltado, tema y pausa", "Presencia de quién está conectado y mensajes rápidos", "Reparto de secciones por integrante con sus notas", "Dashboard de equipos con roles admin/usuario", "Instalable como app (PWA)", "Modo prueba sin Firebase: se sincroniza entre pestañas"],
        decisiones: ["Separé el motor (core/) de las presentaciones (p/<slug>/): una presentación nueva es solo una carpeta.", "Las reglas de la base de datos validan forma y tamaño de cada dato, y solo la dueña escribe equipos y claves.", "Sin configuración, sync.js usa un modo local para poder probar todo sin internet."],
        aprendizajes: "Pensar en reutilización desde el principio ahorró trabajo en cada exposición. Próximo: editor visual de diapositivas en el dashboard.",
      },
      en: {
        tipo: "Presentations with a remote control",
        resumen: "A web presentation engine you control from your phone, synced in real time, with a dashboard for teams and courses.",
        rol: "My own project: architecture, engine, brand design and presentations.",
        contexto: "At university I present in groups almost every week. Each presentation ended up needing a new repo, hosting and database.",
        problema: "Repeating the setup for every presentation wasted time, and passing slides and turns between several people in class was messy.",
        objetivo: "One project for every presentation: add a folder and get the deck, the remote control and the speaking order ready.",
        solucion: "A shared engine (navigation, big screen, highlighting, theme, pause, video and QR) used by every deck. Each teammate opens the remote on their phone by scanning a QR; the room state (slide, highlight, theme, presence and messages) syncs through Firebase Realtime Database. A dashboard behind Google sign-in manages teams, roles and courses.",
        funciones: ["QR remote control from any phone", "Live sync of slide, highlight, theme and pause", "Presence of who is connected, plus quick messages", "Sections assigned per teammate with their notes", "Team dashboard with admin/user roles", "Installable as an app (PWA)", "Test mode without Firebase: syncs across tabs"],
        decisiones: ["The engine (core/) is separate from the decks (p/<slug>/): a new deck is just a folder.", "Database rules validate the shape and size of every value, and only the owner writes teams and keys.", "Without configuration, sync.js falls back to a local mode so everything can be tested offline."],
        aprendizajes: "Designing for reuse from day one saved work on every presentation. Next: a visual slide editor in the dashboard.",
      },
      pt: {
        tipo: "Apresentações com controle remoto",
        resumen: "Um motor de apresentações web controladas pelo celular, sincronizadas em tempo real, com painel para equipes e matérias.",
        rol: "Projeto próprio: arquitetura, motor, identidade visual e apresentações.",
        contexto: "Na faculdade apresento em grupo quase toda semana. Cada apresentação acabava exigindo um repositório, hospedagem e banco de dados novos.",
        problema: "Repetir a configuração a cada apresentação tomava tempo, e passar slides e turnos entre várias pessoas em aula era confuso.",
        objetivo: "Um só projeto para todas as apresentações: adicionar uma pasta e ter apresentação, controle remoto e divisão de turnos prontos.",
        solucion: "Um motor compartilhado (navegação, tela cheia, destaque, tema, pausa, vídeo e QR) usado por todas as apresentações. Cada integrante abre o controle no celular escaneando o QR; o estado da sala (slide, destaque, tema, presença e mensagens) sincroniza pelo Firebase Realtime Database. Um painel com login do Google administra equipes, papéis e matérias.",
        funciones: ["Controle remoto por QR em qualquer celular", "Sincronização ao vivo de slide, destaque, tema e pausa", "Presença de quem está conectado e mensagens rápidas", "Divisão de seções por integrante com suas notas", "Painel de equipes com papéis admin/usuário", "Instalável como app (PWA)", "Modo de teste sem Firebase: sincroniza entre abas"],
        decisiones: ["Separei o motor (core/) das apresentações (p/<slug>/): uma apresentação nova é só uma pasta.", "As regras do banco validam formato e tamanho de cada dado, e só a dona escreve equipes e chaves.", "Sem configuração, o sync.js usa um modo local para testar tudo sem internet."],
        aprendizajes: "Pensar em reutilização desde o início economizou trabalho em cada apresentação. Próximo: editor visual de slides no painel.",
      },
    },
    flujo: ["Presentación · computador", "Realtime Database · pres/<slug>/salas", "Control remoto · celular (QR)", "Dashboard · equipos y materias"],
    codigo: {
      archivo: "core/sync.js",
      lenguaje: "js",
      texto: `// Con Firebase configurado funciona entre cualquier dispositivo.
// Sin configurar, funciona en "modo prueba": todo se guarda en
// este navegador y se comparte entre pestañas.
export const configurado = !!firebaseConfig.databaseURL
  && !firebaseConfig.databaseURL.includes('PEGA_AQUI');

let _bd = null;
export function bd() {
  return _bd || (_bd = configurado ? bdFirebase() : bdLocal());
}`,
    },
  },

  {
    slug: "emily-pizza",
    nombre: "Emily Pizza",
    destacado: true,
    estado: "vivo",
    anio: "2026",
    categorias: ["web", "cliente"],
    stack: ["HTML", "CSS", "JavaScript", "Firestore", "Firebase Auth", "PWA", "Vercel"],
    vivo: "https://emily-pizza.vercel.app/",
    repo: { url: "https://github.com/alizz3/emily-pizza", publico: true },
    lab: "emily",
    composicion: "telefonos",
    imagenes: [
      { src: "assets/proyectos/emily-2.webp", tipo: "mob", alt: { es: "Menú digital de Emily Pizza en modo claro", en: "Emily Pizza digital menu in light mode", pt: "Cardápio digital da Emily Pizza no modo claro" } },
      { src: "assets/proyectos/emily-3.webp", tipo: "mob", alt: { es: "Menú digital de Emily Pizza en modo oscuro", en: "Emily Pizza digital menu in dark mode", pt: "Cardápio digital da Emily Pizza no modo escuro" } },
      { src: "assets/proyectos/emily-1.webp", tipo: "desk", alt: { es: "Menú digital en computador", en: "Digital menu on desktop", pt: "Cardápio digital no computador" } },
    ],
    t: {
      es: {
        tipo: "Menú digital y pedidos por WhatsApp",
        resumen: "Carta digital para un local de comidas rápidas en Ciudad Bolívar: se arma el pedido y sale listo por WhatsApp.",
        rol: "Diseño, desarrollo, publicación y panel para el local.",
        contexto: "Emily Pizza es un local de comidas rápidas en Candelaria La Nueva, Bogotá, que manejaba su menú enviando fotos por WhatsApp.",
        problema: "Los clientes preguntaban precios y sabores uno por uno, y cuando algo se acababa no había forma de avisar antes del pedido.",
        objetivo: "Una carta que cargue rápido en cualquier celular, deje armar el pedido completo y muestre en vivo lo que está agotado.",
        solucion: "Un sitio estático, sin build, con buscador, pizzas por tamaño y sabores, combos y personalización de ingredientes. El pedido se arma y se envía por WhatsApp con todo el detalle. El local tiene un panel privado para marcar agotados (por producto, categoría o ingrediente) que se reflejan al instante en la carta.",
        funciones: ["Buscador y menú por categorías", "Pizzas por tamaño con hasta dos sabores", "Pedido completo enviado por WhatsApp", "Panel del local para marcar agotados en vivo", "Instalable como app, con modo claro y oscuro", "Política de privacidad (Ley 1581) y términos"],
        decisiones: ["Sin framework ni build: carga en ~0,2 s y se publica tal cual en Vercel.", "Si se borra la configuración de Firebase, la carta sigue funcionando y todo sale disponible.", "Las reglas de Firestore solo dejan escribir el inventario a correos autorizados y verificados, y validan la forma de cada dato."],
        aprendizajes: "En un negocio pequeño lo que más importa es que funcione en un celular de gama baja con datos móviles. Pendiente: activar los pagos con QR cuando el local los entregue.",
      },
      en: {
        tipo: "Digital menu with WhatsApp ordering",
        resumen: "A digital menu for a fast-food spot in Ciudad Bolívar: customers build their order and send it ready via WhatsApp.",
        rol: "Design, development, launch and an admin panel for the owners.",
        contexto: "Emily Pizza is a fast-food spot in Candelaria La Nueva, Bogotá, that used to share its menu by sending photos on WhatsApp.",
        problema: "Customers asked for prices and flavors one at a time, and when something ran out there was no way to warn them before they ordered.",
        objetivo: "A menu that loads fast on any phone, lets people build the full order and shows sold-out items live.",
        solucion: "A static site with no build step: search, pizzas by size and flavor, combos and ingredient customization. The order is assembled and sent via WhatsApp with every detail. The owners have a private panel to mark items sold out (by product, category or ingredient), reflected instantly on the menu.",
        funciones: ["Search and menu by category", "Pizzas by size with up to two flavors", "Full order sent via WhatsApp", "Owner panel to mark sold-out items live", "Installable app with light and dark mode", "Privacy policy (Colombian Law 1581) and terms"],
        decisiones: ["No framework or build: loads in about 0.2 s and deploys as-is on Vercel.", "If the Firebase config is removed, the menu keeps working with everything available.", "Firestore rules only let verified, authorized emails write the inventory, and validate the shape of every value."],
        aprendizajes: "For a small business, what matters most is working on a low-end phone over mobile data. Pending: QR payments once the owners send them.",
      },
      pt: {
        tipo: "Cardápio digital com pedidos pelo WhatsApp",
        resumen: "Cardápio digital para uma lanchonete em Ciudad Bolívar: o cliente monta o pedido e envia pronto pelo WhatsApp.",
        rol: "Design, desenvolvimento, publicação e painel para o local.",
        contexto: "Emily Pizza é uma lanchonete em Candelaria La Nueva, Bogotá, que divulgava o cardápio mandando fotos pelo WhatsApp.",
        problema: "Os clientes perguntavam preços e sabores um por um, e quando algo acabava não havia como avisar antes do pedido.",
        objetivo: "Um cardápio que carregue rápido em qualquer celular, permita montar o pedido completo e mostre ao vivo o que esgotou.",
        solucion: "Um site estático, sem build, com busca, pizzas por tamanho e sabor, combos e personalização de ingredientes. O pedido é montado e enviado pelo WhatsApp com todos os detalhes. O local tem um painel privado para marcar itens esgotados (por produto, categoria ou ingrediente), refletidos na hora no cardápio.",
        funciones: ["Busca e cardápio por categorias", "Pizzas por tamanho com até dois sabores", "Pedido completo enviado pelo WhatsApp", "Painel do local para marcar esgotados ao vivo", "Instalável como app, com modo claro e escuro", "Política de privacidade (Lei 1581) e termos"],
        decisiones: ["Sem framework nem build: carrega em ~0,2 s e é publicado como está na Vercel.", "Se a configuração do Firebase for removida, o cardápio continua funcionando com tudo disponível.", "As regras do Firestore só deixam e-mails autorizados e verificados escrever o estoque, e validam o formato de cada dado."],
        aprendizajes: "Num negócio pequeno o que mais importa é funcionar num celular simples com dados móveis. Pendente: ativar pagamentos por QR quando o local enviar.",
      },
    },
    flujo: ["Carta · sitio estático", "Firestore · inventario (agotados)", "Panel del local · login", "WhatsApp · pedido listo"],
    codigo: {
      archivo: "menu.js",
      lenguaje: "js",
      texto: `// Lo que llega del panel:
// { ing:{clave:"agota"|"sin"}, prod:{id:true}, cat:{id:true}, aviso:"" }
const stockKey = label => { const k = norm(label); return ING_ALIAS[k] || k; };
const ingState = label => STOCK.ing[stockKey(label)] || "";
const pizzaFlavorOut = name =>
  itemStatus(MENU[0].items.find(i => i.name === name)).out;`,
    },
  },

  {
    slug: "cuidapp",
    nombre: "Cuidapp",
    destacado: true,
    estado: "desarrollo",
    anio: "2026",
    categorias: ["web", "prototipo"],
    stack: ["React", "Vite", "Tailwind CSS", "Firebase Auth", "Firestore", "Firebase Storage", "Tesseract.js"],
    vivo: "https://cuidapp-six.vercel.app/",
    repo: { url: "https://github.com/alizz3/cuidapp", publico: false },
    lab: null,
    composicion: "mixta",
    imagenes: [
      { src: "assets/proyectos/cuidapp-2.webp", tipo: "mob", alt: { es: "Lista de medicamentos con horarios en modo demo", en: "Medication list with schedules in demo mode", pt: "Lista de medicamentos com horários no modo demo" } },
      { src: "assets/proyectos/cuidapp-1.webp", tipo: "desk", alt: { es: "Página de presentación de Cuidapp", en: "Cuidapp landing page", pt: "Página de apresentação do Cuidapp" } },
      { src: "assets/proyectos/cuidapp-3.webp", tipo: "mob", alt: { es: "Inicio de la app", en: "App home", pt: "Início do app" } },
    ],
    t: {
      es: {
        tipo: "App de acompañamiento de salud",
        resumen: "Organiza medicamentos, horarios y fórmulas médicas de pacientes crónicos y conecta a su familia. No diagnostica.",
        rol: "Proyecto propio: idea, diseño y desarrollo.",
        contexto: "Nació para ayudar a mi papá a llevar sus medicamentos. Lo pienso también para otros pacientes crónicos y sus cuidadores.",
        problema: "Cajas de medicamentos, horarios y fórmulas en papel hacen fácil olvidar una toma o no saber qué se tomó.",
        objetivo: "Que el paciente y su familia vean en un lugar qué tomar, a qué hora y si ya se tomó.",
        solucion: "Registro con correo o Google y un onboarding de seis pasos. Los medicamentos se agregan a mano o con una foto de la caja: el texto se lee en el navegador con Tesseract.js y se propone como sugerencia editable. Tiene horarios múltiples, botón de \"Ya lo tomé\" con historial, fórmulas médicas en foto o PDF y recordatorios del navegador.",
        funciones: ["Registro e inicio de sesión (correo y Google)", "Onboarding de 6 pasos", "Medicamentos por foto con OCR en el navegador", "Horarios múltiples e historial de tomas", "Fórmulas médicas en foto o PDF", "Recordatorios con notificaciones del navegador", "Modo demo con datos ficticios"],
        decisiones: ["El OCR nunca guarda sin confirmación: muestra lo que leyó como sugerencia editable.", "Las fórmulas con varios medicamentos se guardan como referencia en vez de leerlas automáticamente, porque el resultado no sería confiable.", "Un modo demo con un paciente ficticio para mostrar la app sin exponer datos reales."],
        aprendizajes: "En salud, la confianza importa más que la automatización. Sigue: registro de glucosa y presión con gráficas, citas médicas y modo familia.",
      },
      en: {
        tipo: "Health companion app",
        resumen: "Organizes medications, schedules and prescriptions for chronic patients and connects their family. It does not diagnose.",
        rol: "My own project: idea, design and development.",
        contexto: "It started as a way to help my dad keep track of his medications. I'm also building it for other chronic patients and their caregivers.",
        problema: "Pill boxes, schedules and paper prescriptions make it easy to miss a dose or forget whether it was taken.",
        objetivo: "Let the patient and their family see in one place what to take, when, and whether it was taken.",
        solucion: "Sign-up with email or Google and a six-step onboarding. Medications are added by hand or from a photo of the box: Tesseract.js reads the text in the browser and suggests editable values. It supports multiple schedules, a \"Taken\" button with history, prescriptions as photo or PDF, and browser reminders.",
        funciones: ["Sign-up and sign-in (email and Google)", "Six-step onboarding", "Add medications from a photo with in-browser OCR", "Multiple schedules and dose history", "Prescriptions as photo or PDF", "Reminders with browser notifications", "Demo mode with fictional data"],
        decisiones: ["OCR never saves without confirmation: what it reads is shown as an editable suggestion.", "Prescriptions with several drugs are stored as reference instead of being read automatically, because the result wouldn't be reliable.", "A demo mode with a fictional patient shows the app without exposing real data."],
        aprendizajes: "In health, trust matters more than automation. Next: glucose and blood-pressure logs with charts, appointments and family mode.",
      },
      pt: {
        tipo: "App de acompanhamento de saúde",
        resumen: "Organiza medicamentos, horários e receitas de pacientes crônicos e conecta a família. Não faz diagnóstico.",
        rol: "Projeto próprio: ideia, design e desenvolvimento.",
        contexto: "Nasceu para ajudar meu pai a controlar seus medicamentos. Também penso nele para outros pacientes crônicos e cuidadores.",
        problema: "Caixas de remédio, horários e receitas em papel facilitam esquecer uma dose ou não saber se já foi tomada.",
        objetivo: "Que o paciente e a família vejam num só lugar o que tomar, a que horas e se já tomou.",
        solucion: "Cadastro com e-mail ou Google e um onboarding de seis passos. Os medicamentos são adicionados à mão ou com foto da caixa: o Tesseract.js lê o texto no navegador e sugere valores editáveis. Tem vários horários, botão \"Já tomei\" com histórico, receitas em foto ou PDF e lembretes do navegador.",
        funciones: ["Cadastro e login (e-mail e Google)", "Onboarding de 6 passos", "Medicamentos por foto com OCR no navegador", "Vários horários e histórico de doses", "Receitas em foto ou PDF", "Lembretes com notificações do navegador", "Modo demo com dados fictícios"],
        decisiones: ["O OCR nunca salva sem confirmação: mostra o que leu como sugestão editável.", "Receitas com vários medicamentos ficam como referência em vez de serem lidas automaticamente, porque o resultado não seria confiável.", "Um modo demo com um paciente fictício mostra o app sem expor dados reais."],
        aprendizajes: "Em saúde, a confiança importa mais que a automação. Próximo: registro de glicose e pressão com gráficos, consultas e modo família.",
      },
    },
    flujo: ["App · React + Tailwind", "Tesseract.js · OCR en el navegador", "Firestore · users/{uid}, medicationLogs", "Storage · fotos y fórmulas"],
    codigo: {
      archivo: "src/lib/ocrMedicamentos.js",
      lenguaje: "js",
      texto: `export async function leerTextoDeFoto(archivoImagen, onProgreso) {
  const resultado = await Tesseract.recognize(archivoImagen, "spa", {
    logger: (info) => {
      if (info.status === "recognizing text" && onProgreso) {
        onProgreso(Math.round(info.progress * 100));
      }
    },
  });
  return resultado.data.text.trim();
}`,
    },
  },

  {
    slug: "maletica",
    nombre: "Maletica",
    logo: { claro: "assets/logos/maletica.svg", oscuro: "assets/logos/maletica.svg" },
    destacado: true,
    estado: "vivo",
    anio: "2026",
    categorias: ["web"],
    stack: ["Vue 3", "Vite", "Firebase Auth", "Firestore", "Vercel"],
    vivo: "https://maletica.vercel.app/",
    repo: { url: "https://github.com/alizz3/maletica", publico: true },
    lab: null,
    composicion: "telefonos",
    imagenes: [
      { src: "assets/proyectos/maletica-1.webp", tipo: "mob", alt: { es: "Planeador de outfits por día del viaje", en: "Outfit planner for each day of the trip", pt: "Planejador de looks por dia da viagem" } },
      { src: "assets/proyectos/maletica-2.webp", tipo: "mob", alt: { es: "Lista de viajes", en: "Trip list", pt: "Lista de viagens" } },
      { src: "assets/proyectos/maletica-3.webp", tipo: "desk", alt: { es: "Maletica en computador", en: "Maletica on desktop", pt: "Maletica no computador" } },
    ],
    t: {
      es: {
        tipo: "Planeador de maleta y outfits",
        resumen: "Armario, maleta y outfits conectados para no llevar de más ni dejar nada al volver.",
        rol: "Proyecto propio: diseño y desarrollo.",
        contexto: "Siempre hago listas cuando viajo y terminaba con notas sueltas y cosas de más en la maleta.",
        problema: "Las listas de maleta no se conectan con lo que te vas a poner cada día, y al regresar es fácil dejar algo.",
        objetivo: "Planear qué ponerse cada día y que eso arme la maleta sola, con una revisión al volver.",
        solucion: "Una app en Vue 3: un armario con todo lo que tienes, una maleta que empieza vacía y outfits por día. Si pones una prenda en un día, entra a la maleta. Al regreso, un checklist con todo lo que viajó y una revisión del lugar. Varios viajes, modo claro/oscuro, login con Google y guardado en la nube.",
        funciones: ["Armario de ropa y objetos", "Outfits por día con actividades y notas", "La maleta se llena con lo que planeas ponerte", "Checklist de regreso", "Varios viajes a la vez", "Funciona sin cuenta (guardado en el navegador) o con Google"],
        decisiones: ["Estado reactivo propio (store.js) en lugar de una librería, porque la app es pequeña.", "Sin sesión, todo se guarda en el navegador; con Google se sincroniza en Firestore.", "Política de privacidad, términos, banner de cookies y 404 desde el lanzamiento."],
        aprendizajes: "Hacerla en Vue después de varios proyectos en React me hizo comparar cómo cada uno maneja el estado. Próximo: fotos de las prendas y clima por día.",
      },
      en: {
        tipo: "Packing and outfit planner",
        resumen: "Wardrobe, suitcase and outfits linked together so you don't overpack or leave anything behind.",
        rol: "My own project: design and development.",
        contexto: "I always make lists when I travel and ended up with scattered notes and too much in my suitcase.",
        problema: "Packing lists don't connect with what you'll wear each day, and it's easy to leave something behind on the way back.",
        objetivo: "Plan what to wear each day and let that pack the suitcase, with a check before leaving.",
        solucion: "A Vue 3 app: a wardrobe with everything you own, a suitcase that starts empty and daily outfits. Put an item in a day and it goes into the suitcase. On the way back, a checklist of everything that traveled plus a room check. Multiple trips, light/dark mode, Google sign-in and cloud saving.",
        funciones: ["Wardrobe of clothes and items", "Daily outfits with activities and notes", "The suitcase fills with what you plan to wear", "Return checklist", "Several trips at once", "Works without an account (saved in the browser) or with Google"],
        decisiones: ["A small reactive store (store.js) instead of a library, since the app is small.", "Signed out, everything is saved in the browser; with Google it syncs to Firestore.", "Privacy policy, terms, cookie banner and 404 from launch."],
        aprendizajes: "Building it in Vue after several React projects made me compare how each handles state. Next: item photos and weather per day.",
      },
      pt: {
        tipo: "Planejador de mala e looks",
        resumen: "Guarda-roupa, mala e looks conectados para não levar demais nem esquecer nada na volta.",
        rol: "Projeto próprio: design e desenvolvimento.",
        contexto: "Sempre faço listas quando viajo e acabava com anotações soltas e coisas demais na mala.",
        problema: "As listas de mala não se conectam com o que você vai vestir cada dia, e na volta é fácil esquecer algo.",
        objetivo: "Planejar o que vestir cada dia e deixar que isso monte a mala, com uma revisão na volta.",
        solucion: "Um app em Vue 3: um guarda-roupa com tudo o que você tem, uma mala que começa vazia e looks por dia. Se você coloca uma peça num dia, ela entra na mala. Na volta, um checklist com tudo o que viajou e uma revisão do lugar. Várias viagens, modo claro/escuro, login com Google e salvamento na nuvem.",
        funciones: ["Guarda-roupa de roupas e objetos", "Looks por dia com atividades e notas", "A mala se enche com o que você planeja vestir", "Checklist de volta", "Várias viagens ao mesmo tempo", "Funciona sem conta (salvo no navegador) ou com Google"],
        decisiones: ["Estado reativo próprio (store.js) em vez de uma biblioteca, porque o app é pequeno.", "Sem login, tudo fica no navegador; com Google sincroniza no Firestore.", "Política de privacidade, termos, banner de cookies e 404 desde o lançamento."],
        aprendizajes: "Fazer em Vue depois de vários projetos em React me fez comparar como cada um lida com estado. Próximo: fotos das peças e clima por dia.",
      },
    },
    flujo: ["App · Vue 3", "store.js · estado reactivo", "localStorage · sin cuenta", "Firestore · con Google"],
    codigo: null,
  },


  /* ---------------- Proyectos secundarios ---------------- */
  {
    slug: "odoo-andrec",
    nombre: "Módulos para Odoo 16",
    destacado: false,
    estado: "empresa",
    anio: "2023",
    categorias: ["backend"],
    stack: ["Python", "Odoo 16", "XML", "ORM de Odoo"],
    vivo: null,
    repo: { url: "https://github.com/alizz3/Odoo-Custom-Modules", publico: true },
    lab: null,
    portada: { tipo: "codigo", etiqueta: "models.py" },
    imagenes: [],
    t: {
      es: {
        tipo: "Módulos de ERP",
        resumen: "Módulos a la medida para el ERP Odoo 16 en Andrec Corporation S.A.: reglas de negocio en inventario, solicitudes y facturación.",
        rol: "Desarrollo de módulos como Auxiliar de Desarrollo Digital en Andrec.",
        contexto: "En Andrec el día a día pasaba por Odoo 16 y había procesos que el sistema estándar no controlaba.",
        problema: "Se podían avanzar solicitudes a etapas no permitidas, elegir clientes bloqueados y calcular a mano la fecha límite de pago.",
        objetivo: "Llevar esas reglas al propio ERP para que el sistema las haga cumplir.",
        solucion: "Escribí cuatro módulos en Python sobre el ORM de Odoo: cálculo automático de la fecha límite de pago según el plazo elegido, restricción de etapas en solicitudes de inventario, bloqueo de clientes con mensaje para el usuario y registro del usuario que crea cada movimiento de inventario.",
        funciones: ["Fecha límite de pago calculada (campo computado)", "Restricción de avance entre etapas", "Bloqueo de clientes con aviso", "Usuario responsable en movimientos de inventario"],
        decisiones: ["Usé campos computados y onchange del ORM en lugar de automatizaciones manuales, para que el cálculo sea consistente.", "Las restricciones lanzan UserError con un mensaje claro para quien usa el sistema."],
        aprendizajes: "Trabajar dentro de un ERP enseña a respetar el modelo de datos existente. En el repositorio de la empresa también había módulos de la comunidad OCA, que no son míos.",
      },
      en: {
        tipo: "ERP modules",
        resumen: "Custom modules for the Odoo 16 ERP at Andrec Corporation S.A.: business rules for inventory, requests and invoicing.",
        rol: "Module development as Digital Development Assistant at Andrec.",
        contexto: "At Andrec, daily operations ran through Odoo 16, and some processes weren't enforced by the standard system.",
        problema: "Requests could move to stages they shouldn't, blocked customers could be selected, and payment due dates were calculated by hand.",
        objetivo: "Move those rules into the ERP itself so the system enforces them.",
        solucion: "I wrote four Python modules on Odoo's ORM: automatic payment due date from the selected term, stage restrictions on inventory requests, customer blocking with a message for the user, and recording which user created each inventory movement.",
        funciones: ["Computed payment due date", "Stage-transition restrictions", "Customer blocking with a warning", "Responsible user on inventory movements"],
        decisiones: ["Used ORM computed fields and onchange instead of manual automations, so the calculation stays consistent.", "Restrictions raise a UserError with a clear message for the person using the system."],
        aprendizajes: "Working inside an ERP teaches you to respect the existing data model. The company repository also had OCA community modules, which are not mine.",
      },
      pt: {
        tipo: "Módulos de ERP",
        resumen: "Módulos sob medida para o ERP Odoo 16 na Andrec Corporation S.A.: regras de negócio em estoque, solicitações e faturamento.",
        rol: "Desenvolvimento de módulos como Assistente de Desenvolvimento Digital na Andrec.",
        contexto: "Na Andrec o dia a dia passava pelo Odoo 16 e havia processos que o sistema padrão não controlava.",
        problema: "Solicitações podiam avançar para etapas não permitidas, clientes bloqueados podiam ser escolhidos e a data de vencimento era calculada à mão.",
        objetivo: "Levar essas regras para dentro do ERP para que o sistema as faça cumprir.",
        solucion: "Escrevi quatro módulos em Python sobre o ORM do Odoo: cálculo automático do vencimento conforme o prazo escolhido, restrição de etapas em solicitações de estoque, bloqueio de clientes com aviso ao usuário e registro de quem cria cada movimentação de estoque.",
        funciones: ["Vencimento calculado (campo computado)", "Restrição de avanço entre etapas", "Bloqueio de clientes com aviso", "Usuário responsável nas movimentações de estoque"],
        decisiones: ["Usei campos computados e onchange do ORM em vez de automações manuais, para que o cálculo seja consistente.", "As restrições lançam UserError com uma mensagem clara para quem usa o sistema."],
        aprendizajes: "Trabalhar dentro de um ERP ensina a respeitar o modelo de dados existente. O repositório da empresa também tinha módulos da comunidade OCA, que não são meus.",
      },
    },
    flujo: null,
    codigo: {
      archivo: "selectdays/models/models.py",
      lenguaje: "py",
      texto: `def _compute_fecha_vencimiento(self):
    for solicitud in self:
        if solicitud.dias_pago:
            if solicitud.dias_pago == 'other' and solicitud.otros_dias_pago > 0:
                dias = solicitud.otros_dias_pago
            else:
                dias = int(solicitud.dias_pago) if solicitud.dias_pago.isdigit() else 0
            if solicitud.fecha_facturacion and dias > 0:
                solicitud.Fecha_limite_pago = solicitud.fecha_facturacion + timedelta(days=dias)`,
    },
  },

  {
    slug: "colaxis",
    nombre: "Colaxis",
    logo: { claro: "assets/logos/colaxis.webp", oscuro: "assets/logos/colaxis-blanco.webp" },
    destacado: false,
    estado: "desarrollo",
    anio: "2026",
    categorias: ["web", "cliente"],
    stack: ["HTML", "CSS", "JavaScript", "WordPress (migración)"],
    vivo: null,
    repo: { url: "https://github.com/alizz3/colaxis", publico: false },
    lab: null,
    imagenes: [{ src: "assets/proyectos/colaxis-1.webp", tipo: "desk", alt: { es: "Sitio corporativo de Colaxis", en: "Colaxis corporate website", pt: "Site corporativo da Colaxis" } }],
    t: {
      es: { tipo: "Sitio corporativo", resumen: "Rediseño del sitio de ColaxisPro, distribuidor B2B de desinfección y salas blancas en Colombia y Ecuador. Primer cliente freelance.", rol: "Freelance: propuesta, diseño UX/UI y desarrollo.", funciones: ["Catálogo de productos y ficha de detalle", "Contacto segmentado por país", "Navbar con comportamiento al hacer scroll", "Panel de productos en construcción"], aprendizajes: "Se construye primero en HTML, CSS y JS por componentes para migrarlo después a WordPress." },
      en: { tipo: "Corporate website", resumen: "Redesign of the ColaxisPro site, a B2B disinfection and cleanroom distributor in Colombia and Ecuador. My first freelance client.", rol: "Freelance: proposal, UX/UI design and development.", funciones: ["Product catalog and detail pages", "Contact split by country", "Navbar that adapts on scroll", "Product dashboard in progress"], aprendizajes: "Built first in component-based HTML, CSS and JS, to be migrated to WordPress later." },
      pt: { tipo: "Site corporativo", resumen: "Redesenho do site da ColaxisPro, distribuidora B2B de desinfecção e salas limpas na Colômbia e no Equador. Primeira cliente freelance.", rol: "Freelance: proposta, design UX/UI e desenvolvimento.", funciones: ["Catálogo de produtos e página de detalhe", "Contato segmentado por país", "Navbar que se adapta ao rolar", "Painel de produtos em construção"], aprendizajes: "Construído primeiro em HTML, CSS e JS por componentes para depois migrar ao WordPress." },
    },
  },

  {
    slug: "motocoach",
    nombre: "MotoCoach",
    destacado: false,
    estado: "desarrollo",
    anio: "2026",
    categorias: ["web", "prototipo"],
    stack: ["React", "Vite", "Firebase Auth", "Firestore", "lucide-react"],
    vivo: null,
    repo: { url: "https://github.com/alizz3/motocoach-web", publico: false },
    lab: null,
    imagenes: [{ src: "assets/proyectos/motocoach-1.webp", tipo: "mob", alt: { es: "Pantalla de inicio de sesión de MotoCoach", en: "MotoCoach sign-in screen", pt: "Tela de login do MotoCoach" } }],
    t: {
      es: { tipo: "Coach financiero móvil", resumen: "App de finanzas para repartidores en moto: ingresos y gastos del día, billeteras, deudas, gastos fijos y pagos.", rol: "Proyecto propio: diseño y desarrollo.", funciones: ["Cuenta con @usuario único", "Movimientos por categoría y billetera", "Deudas con vista para compartir", "Gastos fijos y calendario de pagos", "Notificaciones dentro de la app"], aprendizajes: "Pensada para usarse con una mano y en la calle: hojas inferiores (bottom sheets) en vez de páginas." },
      en: { tipo: "Mobile money coach", resumen: "A finance app for motorcycle delivery riders: daily income and expenses, wallets, debts, fixed costs and payments.", rol: "My own project: design and development.", funciones: ["Account with a unique @username", "Transactions by category and wallet", "Debts with a shareable view", "Fixed expenses and a payment calendar", "In-app notifications"], aprendizajes: "Made to be used one-handed on the street: bottom sheets instead of pages." },
      pt: { tipo: "Coach financeiro móvel", resumen: "App de finanças para entregadores de moto: receitas e gastos do dia, carteiras, dívidas, gastos fixos e pagamentos.", rol: "Projeto próprio: design e desenvolvimento.", funciones: ["Conta com @usuário único", "Movimentações por categoria e carteira", "Dívidas com visualização para compartilhar", "Gastos fixos e calendário de pagamentos", "Notificações dentro do app"], aprendizajes: "Pensado para usar com uma mão e na rua: bottom sheets em vez de páginas." },
    },
  },

  {
    slug: "smart-card",
    nombre: "Smart Card",
    destacado: false,
    estado: "empresa",
    anio: "2024",
    categorias: ["web", "prototipo"],
    stack: ["HTML", "CSS", "JavaScript"],
    vivo: null,
    repo: { url: "https://github.com/AndrecDigital/Smart-Card", publico: true },
    lab: null,
    portada: { tipo: "tarjeta" },
    imagenes: [],
    t: {
      es: { tipo: "Tarjetas de presentación digitales", resumen: "Demo de tarjetas de presentación virtuales para el equipo de Andrec: datos de contacto, redes y botón para guardar el contacto.", rol: "Desarrollo de la demo en Andrec.", funciones: ["Tarjeta por persona con cargo y logo", "Botón para descargar el contacto", "Enlaces a redes"], aprendizajes: "Las capturas no se muestran porque incluyen datos de personas reales." },
      en: { tipo: "Digital business cards", resumen: "A demo of virtual business cards for the Andrec team: contact details, social links and a save-contact button.", rol: "Built the demo at Andrec.", funciones: ["One card per person with role and logo", "Download-contact button", "Social links"], aprendizajes: "Screenshots aren't shown because they include real people's details." },
      pt: { tipo: "Cartões de visita digitais", resumen: "Demo de cartões de visita virtuais para a equipe da Andrec: contato, redes e botão para salvar o contato.", rol: "Desenvolvimento da demo na Andrec.", funciones: ["Cartão por pessoa com cargo e logo", "Botão para baixar o contato", "Links para redes"], aprendizajes: "As capturas não aparecem porque incluem dados de pessoas reais." },
    },
  },

  {
    slug: "tearspa",
    nombre: "TearSpa",
    destacado: false,
    estado: "archivo",
    anio: "2023",
    categorias: ["web", "dashboard", "backend"],
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    vivo: null,
    repo: { url: "https://github.com/alizz3/TearSpa", publico: false },
    lab: null,
    portada: { tipo: "codigo", etiqueta: "admin/ventas.php" },
    imagenes: [],
    t: {
      es: { tipo: "Tienda con panel administrativo", resumen: "Sitio de productos para el ojo seco con blog, contacto y un panel para productos, usuarios y ventas.", rol: "Desarrollo completo en PHP y MySQL.", funciones: ["Catálogo y vista de producto", "Login de administración", "CRUD de productos con imágenes", "Usuarios y registro de ventas", "Base de datos MySQL (script incluido)"], aprendizajes: "Uno de mis primeros sistemas con base de datos relacional y sesiones en PHP." },
      en: { tipo: "Store with admin panel", resumen: "A dry-eye products site with blog and contact, plus a panel for products, users and sales.", rol: "Full development in PHP and MySQL.", funciones: ["Catalog and product view", "Admin login", "Product CRUD with images", "Users and sales records", "MySQL database (script included)"], aprendizajes: "One of my first systems with a relational database and PHP sessions." },
      pt: { tipo: "Loja com painel administrativo", resumen: "Site de produtos para olho seco com blog, contato e um painel de produtos, usuários e vendas.", rol: "Desenvolvimento completo em PHP e MySQL.", funciones: ["Catálogo e página de produto", "Login administrativo", "CRUD de produtos com imagens", "Usuários e registro de vendas", "Banco MySQL (script incluído)"], aprendizajes: "Um dos meus primeiros sistemas com banco relacional e sessões em PHP." },
    },
  },

  {
    slug: "lasercenter",
    nombre: "Laser Center",
    destacado: false,
    estado: "archivo",
    anio: "2023",
    categorias: ["dashboard", "backend"],
    stack: ["PHP", "MySQL", "HTML", "CSS"],
    vivo: null,
    repo: { url: "https://github.com/alizz3/LaserCenter", publico: false },
    lab: null,
    portada: { tipo: "codigo", etiqueta: "admin/documents.php" },
    imagenes: [],
    t: {
      es: { tipo: "Portal de documentos", resumen: "Portal para publicar documentos de una empresa en liquidación (actas, informes, estados financieros y proyectos), con panel para subirlos.", rol: "Desarrollo completo en PHP y MySQL.", funciones: ["Secciones por tipo de documento", "Login de administración", "Subir, editar y eliminar documentos", "Gestión de usuarios"], aprendizajes: "Organizar información legal para que cualquier persona encuentre lo que busca." },
      en: { tipo: "Document portal", resumen: "A portal to publish documents for a company in liquidation (minutes, reports, financial statements and projects), with an upload panel.", rol: "Full development in PHP and MySQL.", funciones: ["Sections by document type", "Admin login", "Upload, edit and delete documents", "User management"], aprendizajes: "Organizing legal information so anyone can find what they need." },
      pt: { tipo: "Portal de documentos", resumen: "Portal para publicar documentos de uma empresa em liquidação (atas, relatórios, demonstrações financeiras e projetos), com painel para enviá-los.", rol: "Desenvolvimento completo em PHP e MySQL.", funciones: ["Seções por tipo de documento", "Login administrativo", "Enviar, editar e excluir documentos", "Gestão de usuários"], aprendizajes: "Organizar informação legal para que qualquer pessoa encontre o que procura." },
    },
  },

  {
    slug: "cipa-exe-web",
    nombre: "CIPA .EXE · grupos",
    destacado: false,
    estado: "desarrollo",
    anio: "2026",
    categorias: ["web", "academico"],
    stack: ["React", "Vite", "Firebase Auth", "Firestore", "React Router"],
    vivo: null,
    repo: { url: "https://github.com/alizz3/cipa-exe-web", publico: false },
    lab: null,
    portada: { tipo: "codigo", etiqueta: "GruposTrabajo.jsx" },
    imagenes: [],
    t: {
      es: { tipo: "Gestión de grupos de estudio", resumen: "Web para los grupos de estudio (CIPAS) de la universidad: unirse con código, ver actividades y armar grupos de trabajo.", rol: "Proyecto propio: diseño y desarrollo.", funciones: ["Login y perfil con avatar", "Unirse a una CIPA con código", "Actividades del grupo", "Grupos de trabajo"], aprendizajes: "Los códigos de invitación evitan letras confusas (sin O, 0, I ni 1)." },
      en: { tipo: "Study group manager", resumen: "A web app for university study groups (CIPAS): join with a code, see activities and form work teams.", rol: "My own project: design and development.", funciones: ["Sign-in and profile with avatar", "Join a group with a code", "Group activities", "Work teams"], aprendizajes: "Invite codes skip confusing characters (no O, 0, I or 1)." },
      pt: { tipo: "Gestão de grupos de estudo", resumen: "Web para os grupos de estudo (CIPAS) da faculdade: entrar com código, ver atividades e formar grupos de trabalho.", rol: "Projeto próprio: design e desenvolvimento.", funciones: ["Login e perfil com avatar", "Entrar numa CIPA com código", "Atividades do grupo", "Grupos de trabalho"], aprendizajes: "Os códigos de convite evitam caracteres confusos (sem O, 0, I nem 1)." },
    },
  },

  {
    slug: "monamy",
    nombre: "MONAMY",
    destacado: false,
    estado: "academico",
    anio: "2026",
    categorias: ["academico"],
    stack: ["HTML", "CSS", "JavaScript", "Firebase"],
    vivo: null,
    repo: { url: "https://github.com/alizz3/monamy-expo-t2", publico: false },
    lab: null,
    imagenes: [{ src: "assets/proyectos/monamy-1.webp", tipo: "desk", alt: { es: "Esquema interactivo de MONAMY", en: "MONAMY interactive diagram", pt: "Esquema interativo do MONAMY" } }],
    t: {
      es: { tipo: "Exposición interactiva", resumen: "Primer modelo del sistema MONAMY (apoyo emocional en la web) para Teoría de Sistemas, presentado con control remoto desde el celular. Fue la base de .EXE.", rol: "Trabajo en equipo: hice la presentación interactiva y la sincronización.", funciones: ["Esquema de entradas, procesos y salidas", "Guion con quién expone cada parte", "Control remoto con QR"], aprendizajes: "Lo que funcionó aquí lo convertí en el motor reutilizable de .EXE." },
      en: { tipo: "Interactive presentation", resumen: "First model of the MONAMY system (online emotional support) for Systems Theory, presented with a phone remote. It became the base for .EXE.", rol: "Team project: I built the interactive deck and the sync.", funciones: ["Input, process and output diagram", "Script with who presents each part", "QR remote control"], aprendizajes: "What worked here became the reusable .EXE engine." },
      pt: { tipo: "Apresentação interativa", resumen: "Primeiro modelo do sistema MONAMY (apoio emocional na web) para Teoria de Sistemas, apresentado com controle pelo celular. Foi a base do .EXE.", rol: "Trabalho em equipe: fiz a apresentação interativa e a sincronização.", funciones: ["Esquema de entradas, processos e saídas", "Roteiro com quem apresenta cada parte", "Controle remoto com QR"], aprendizajes: "O que funcionou aqui virou o motor reutilizável do .EXE." },
    },
  },

  {
    slug: "taller-mascota",
    nombre: "Taller: la clase Mascota",
    destacado: false,
    estado: "academico",
    anio: "2026",
    categorias: ["academico"],
    stack: ["HTML", "CSS", "JavaScript", "Java (contenido)"],
    vivo: null,
    repo: { url: "https://github.com/alizz3/taller-mascota-interactivo", publico: false },
    lab: null,
    imagenes: [{ src: "assets/proyectos/mascota-1.webp", tipo: "desk", alt: { es: "Taller interactivo sobre clases y objetos en Java", en: "Interactive workshop on Java classes and objects", pt: "Oficina interativa sobre classes e objetos em Java" } }],
    t: {
      es: { tipo: "Taller interactivo de POO", resumen: "Taller en un solo archivo HTML para que el grupo construya paso a paso la clase Mascota en Java: atributos, constructor y métodos.", rol: "Diseño y desarrollo del taller para la exposición de POO.", funciones: ["Construcción guiada de una clase Java", "Explicación de atributo, objeto y método", "Funciona sin internet"], aprendizajes: "Explicar programación orientada a objetos con algo que todos entienden." },
      en: { tipo: "Interactive OOP workshop", resumen: "A single-file HTML workshop where the class builds a Java Mascota (pet) class step by step: fields, constructor and methods.", rol: "Designed and built the workshop for an OOP presentation.", funciones: ["Guided construction of a Java class", "Field, object and method explained", "Works offline"], aprendizajes: "Teaching object-oriented programming with something everyone understands." },
      pt: { tipo: "Oficina interativa de POO", resumen: "Oficina num único arquivo HTML para a turma construir passo a passo a classe Mascota em Java: atributos, construtor e métodos.", rol: "Design e desenvolvimento da oficina para a apresentação de POO.", funciones: ["Construção guiada de uma classe Java", "Atributo, objeto e método explicados", "Funciona sem internet"], aprendizajes: "Explicar orientação a objetos com algo que todos entendem." },
    },
  },
];

/* ---------- Habilidades: solo lo verificado en los repositorios ---------- */
window.HABILIDADES = [
  { grupo: { es: "Lenguajes", en: "Languages", pt: "Linguagens" }, items: [
    { n: "JavaScript", p: ["el-taller-de-vane", "exe-presentaciones", "emily-pizza", "cuidapp", "maletica", "mumu"] },
    { n: "Python", p: ["odoo-andrec"] },
    { n: "PHP", p: ["tearspa", "lasercenter"] },
    { n: "SQL · MySQL", p: ["tearspa", "lasercenter"] },
    { n: "Java", p: ["taller-mascota"] },
    { n: "HTML y CSS", p: ["emily-pizza", "colaxis", "exe-presentaciones"] },
  ]},
  { grupo: { es: "Frontend", en: "Frontend", pt: "Frontend" }, items: [
    { n: "React", p: ["el-taller-de-vane", "cuidapp", "motocoach", "cipa-exe-web"] },
    { n: "Vue 3", p: ["maletica", "mumu"] },
    { n: "Vite", p: ["el-taller-de-vane", "cuidapp", "maletica", "motocoach", "mumu"] },
    { n: "Tailwind CSS", p: ["cuidapp"] },
    { n: "PWA · Service Worker", p: ["emily-pizza", "exe-presentaciones", "mumu"] },
  ]},
  { grupo: { es: "Backend y datos", en: "Backend and data", pt: "Backend e dados" }, items: [
    { n: "Firebase Auth", p: ["el-taller-de-vane", "cuidapp", "maletica", "emily-pizza", "exe-presentaciones", "mumu"] },
    { n: "Firestore + reglas", p: ["el-taller-de-vane", "emily-pizza", "cuidapp", "maletica", "mumu"] },
    { n: "Google OAuth · Gmail, Calendar, Classroom", p: ["mumu"] },
    { n: "Funciones serverless (Vercel)", p: ["mumu"] },
    { n: "Moodle Web Services", p: ["mumu"] },
    { n: "Realtime Database", p: ["exe-presentaciones"] },
    { n: "Firebase Storage", p: ["el-taller-de-vane", "cuidapp"] },
    { n: "Odoo 16 · ORM", p: ["odoo-andrec"] },
    { n: "OCR · Tesseract.js", p: ["cuidapp"] },
  ]},
  { grupo: { es: "Herramientas", en: "Tools", pt: "Ferramentas" }, items: [
    { n: "Git y GitHub", p: [] },
    { n: "Vercel", p: ["emily-pizza", "maletica", "cuidapp", "exe-presentaciones", "mumu"] },
    { n: "Firebase Hosting", p: ["el-taller-de-vane"] },
    { n: "VS Code", p: [] },
    { n: "Figma", p: [] },
  ]},
  { grupo: { es: "Diseño y producto", en: "Design and product", pt: "Design e produto" }, items: [
    { n: { es: "Identidad de marca", en: "Brand identity", pt: "Identidade visual" }, p: ["el-taller-de-vane", "exe-presentaciones"] },
    { n: { es: "Diseño de interfaces", en: "UI design", pt: "Design de interfaces" }, p: ["el-taller-de-vane", "emily-pizza", "maletica", "mumu"] },
    { n: { es: "Modo claro y oscuro", en: "Light and dark mode", pt: "Modo claro e escuro" }, p: ["maletica", "emily-pizza", "exe-presentaciones", "mumu"] },
    { n: { es: "SEO y accesibilidad", en: "SEO and accessibility", pt: "SEO e acessibilidade" }, p: ["emily-pizza", "mumu"] },
    { n: { es: "Ilustración SVG", en: "SVG illustration", pt: "Ilustração SVG" }, p: ["mumu"] },
  ]},
];

/* ---------- Trayectoria ----------
   periodo: POR COMPLETAR donde está en null (ej. "2023 – 2024").
*/
window.TRAYECTORIA = [
  { tipo: "trabajo", lugar: "Freelance", periodo: { es: "2025 – actualidad", en: "2025 – present", pt: "2025 – atual" },
    cargo: { es: "Desarrolladora web", en: "Web developer", pt: "Desenvolvedora web" },
    texto: { es: "Sitios y aplicaciones para negocios: ColaxisPro (Colombia y Ecuador) y Emily Pizza (Bogotá).", en: "Websites and apps for businesses: ColaxisPro (Colombia and Ecuador) and Emily Pizza (Bogotá).", pt: "Sites e aplicativos para negócios: ColaxisPro (Colômbia e Equador) e Emily Pizza (Bogotá)." } },
  { tipo: "trabajo", lugar: "Andrec Corporation S.A.", periodo: { es: "oct. 2023 – dic. 2025", en: "Oct 2023 – Dec 2025", pt: "out. 2023 – dez. 2025" },
    cargo: { es: "Auxiliar de Desarrollo Digital", en: "Digital Development Assistant", pt: "Assistente de Desenvolvimento Digital" },
    texto: { es: "Desarrollo web, módulos para el ERP Odoo 16, diseño gráfico y soporte a usuarios.", en: "Web development, Odoo 16 ERP modules, graphic design and user support.", pt: "Desenvolvimento web, módulos para o ERP Odoo 16, design gráfico e suporte a usuários." } },
  { tipo: "trabajo", lugar: "Andrec Corporation S.A.", periodo: { es: "abr. 2023 – oct. 2023", en: "Apr 2023 – Oct 2023", pt: "abr. 2023 – out. 2023" },
    cargo: { es: "Aprendiz de Desarrollo y Análisis de Software", en: "Software Development Apprentice", pt: "Aprendiz de Desenvolvimento de Software" },
    texto: { es: "Prácticas: desarrollo y análisis de software con Odoo 16 y desarrollo web.", en: "Apprenticeship: software development and analysis with Odoo 16 and web development.", pt: "Estágio: desenvolvimento e análise de software com Odoo 16 e desenvolvimento web." } },
  { tipo: "estudio", lugar: "Universidad del Tolima · IDEAD", periodo: { es: "feb. 2026 – en curso", en: "Feb 2026 – present", pt: "fev. 2026 – atual" },
    cargo: { es: "Ingeniería de Sistemas", en: "Systems Engineering (B.Eng.)", pt: "Engenharia de Sistemas" },
    texto: { es: "Modalidad a distancia.", en: "Distance program.", pt: "Modalidade a distância." } },
  { tipo: "estudio", lugar: "SENA", periodo: { es: "jul. 2022 – nov. 2023", en: "Jul 2022 – Nov 2023", pt: "jul. 2022 – nov. 2023" },
    cargo: { es: "Técnico en Programación de Software", en: "Software Programming Technician", pt: "Técnico em Programação de Software" },
    texto: { es: "Titulada. Programación, desarrollo web y React; las prácticas fueron en Andrec.", en: "Completed with certificate. Programming, web development and React; the apprenticeship was at Andrec.", pt: "Concluído com certificado. Programação, desenvolvimento web e React; o estágio foi na Andrec." } },
  { tipo: "estudio", lugar: "Kuepa EduTech", periodo: { es: "ene. 2022 – ago. 2022", en: "Jan 2022 – Aug 2022", pt: "jan. 2022 – ago. 2022" },
    cargo: { es: "Bootcamp intensivo de desarrollo web", en: "Intensive web development bootcamp", pt: "Bootcamp intensivo de desenvolvimento web" },
    texto: { es: "Seis meses de desarrollo web y React. Mi primer acercamiento a la programación.", en: "Six months of web development and React. My first step into programming.", pt: "Seis meses de desenvolvimento web e React. Meu primeiro contato com a programação." } },
];
