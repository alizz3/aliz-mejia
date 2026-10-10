# Portafolio · Aliz Mejía

Sitio estático (HTML, CSS y JavaScript, sin build) en español, inglés y portugués, con modo claro y oscuro.

## Qué tiene

- **Inicio compacto** (pensado para poco scroll): hero, proyectos destacados en tarjetas (carrusel en celular), tecnologías, Lab, sobre mí, experiencia en línea horizontal y contacto.
- **Proyectos destacados**: los que tengan `destacado: true` en `js/datos.js`, con capturas reales.
- **Todos los proyectos** en `#/proyectos`, con filtros por categoría y buscador. **Tecnologías** completas en `#/habilidades`.
- **Casos de estudio** en `#/proyecto/<slug>`: contexto, problema, solución, arquitectura, decisiones, código y aprendizajes.
- **Interactive Lab** con tres demos de nivel 2 (frontend con datos ficticios):
  - Dashboard de El Taller de Vane: login simulado, resumen con gráfica, pedidos con búsqueda, filtros, orden y edición, productos con alta y visibilidad.
  - .EXE: pantalla y control remoto sincronizados en la misma página.
  - Emily Pizza: panel de agotados y la carta del cliente con pedido de prueba.
- **Habilidades** enlazadas a los proyectos donde aparecen, **Sobre mí**, **Trayectoria** y **Contacto**.

## Probarlo en tu computador

Abre la carpeta en VS Code y usa la extensión **Live Server**, o en la terminal:

```bash
npx serve .
```

## Publicarlo en Vercel

1. Sube la carpeta a un repositorio nuevo con tu extensión de Git (por ejemplo `portafolio`).
2. En Vercel: **Add New → Project**, importa el repo, **Framework Preset: Other**, sin comando de build, **Deploy**.
3. En **Settings → Domains** elige el nombre. Si no es `aliz-mejia.vercel.app`, cámbialo en `index.html` (canonical, hreflang y og:image), `robots.txt` y `sitemap.xml`.

`vercel.json` ya trae URLs limpias, cabeceras de seguridad (HSTS, CSP, nosniff, frame-ancestors) y caché de una semana para `assets/`.

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Proyectos, habilidades y trayectoria | `js/datos.js` |
| Textos de la interfaz (es, en, pt) | `js/i18n.js` |
| Demos del Lab | `js/lab.js` y `css/lab.css` |
| Íconos de tecnologías (Simple Icons) | `js/iconos.js` |
| Diseño general | `css/estilos.css` |
| Tu marca (logos sin fondo) | `assets/marca/` |
| Capturas de proyectos | `assets/proyectos/` |

### Agregar un proyecto

1. Toma capturas: escritorio 1440 × 900 y celular 390 × 844, en WebP.
2. Ponlas en `assets/proyectos/<nombre>-1.webp`, `-2.webp`…
3. Copia un objeto de `PROYECTOS` en `js/datos.js` y cambia sus datos. Con `destacado: true` aparece arriba.

### Tus fotos

| Foto | Archivo | Tamaño |
|---|---|---|
| Sobre mí | `assets/foto/aliz-sobre-mi.webp` | cuadrada, mínimo 1200 × 1200 px (se muestra en círculo) |

Después pon `fotoSobreMi: true` en `PERFIL` (inicio de `js/datos.js`). Mientras tanto se muestra tu sello.

## Por completar

- [ ] Enlace en vivo de .EXE (`vivo` en `js/datos.js`).
- [x] Fechas en Andrec Corporation (tomadas de LinkedIn).
- [ ] Decidir qué repositorios hacer públicos. Los privados se muestran como "Código privado" y no enlazan.
- [ ] Confirmar para quién fueron TearSpa y Laser Center (2023).
- [ ] Tu foto para Sobre mí.

## Checklist de lanzamiento

| Punto | Estado |
|---|---|
| Sin secretos en el frontend | ✅ No hay claves; el sitio no usa Firebase |
| Autenticación y reglas | ✅ No aplica: no guarda datos de nadie |
| Validación de formularios | ✅ Nombre, correo y mensaje validados; el envío abre el correo del visitante |
| Rate limiting | ✅ No aplica: no hay servidor ni APIs de pago |
| HTTPS | ✅ Vercel + HSTS |
| Privacidad y términos | ⚠️ No guarda datos ni usa cookies; si activas analítica, agrega una política |
| Cookies | ✅ Sin cookies; solo `localStorage` para tema e idioma |
| Accesibilidad | ✅ Encabezados semánticos, foco visible, textos alternativos, movimiento reducido, contraste en ambos temas |
| SEO | ✅ Título, descripción, canonical, hreflang, JSON-LD, sitemap y robots |
| Favicon, Open Graph, 404 | ✅ |
| Rendimiento | ✅ Sin frameworks, imágenes WebP con carga diferida. Revisar con PageSpeed al publicar |
| Enlaces rotos | ✅ Revisados en local; revisar de nuevo con el dominio final |
| Spam en formularios | ✅ Campo trampa (honeypot); no hay servidor que reciba envíos |
| Analítica | ⚠️ Opcional: Vercel → proyecto → Analytics → Enable |
