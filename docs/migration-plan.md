# Migracion de titulotransporte.com

Fecha de auditoria inicial: 2026-06-30.
Ultima actualizacion: 2026-06-30.

## Objetivo

Migrar la web actual de WordPress/Divi a Next.js manteniendo trafico organico, slugs, intencion de busqueda y funciones comerciales clave.

## Intencion principal

La home actual trabaja la intencion comercial `alquilar titulo de transporte`. Las intenciones secundarias son:

- ceder titulo de transporte;
- preparar el titulo de competencia profesional;
- practicar test de competencia profesional de mercancias;
- comprar el curso online;
- acceder al profesor IA y al area de usuario.

## Estado actual del nuevo proyecto

- Stack creado: Next.js App Router con TypeScript.
- Repositorio GitHub: `https://github.com/ivanramos242/titulotransporte`.
- App EasyPanel visible: proyecto `webs`, app `titulotransporte-next`.
- URL temporal: `https://webs-titulotransporte-next.ddhpvl.easypanel.host/`.
- Fuente de despliegue configurada en EasyPanel: GitHub `ivanramos242/titulotransporte`, rama `main`.
- Servicio Docker activo: `webs_titulotransporte-next`.
- Produccion WordPress original intacta: `webs_titulotransporte` y `webs_titulotransporte-db`.

## Inventario detectado

- WordPress `php8.3-apache`.
- MySQL 9.
- Tema activo: Divi 4.27.7.
- 21 paginas publicadas.
- 30 posts publicados.
- 1 producto WooCommerce publicado.
- 4.484 preguntas publicadas en `pregunta`.
- 1.468 resultados de test.
- 40 sesiones de autotest.
- 1 producto virtual/descargable: `/producto/curso-titulo-profesional-transporte/`.
- Precio actual del producto: 99 EUR. Precio regular: 200 EUR.
- ARMember con planes gratuitos y un plan "Nuevo Profesor IA" de 35,99 EUR.
- Plugins activos relevantes: Rank Math, WooCommerce, Stripe, ARMember, Complianz, Google Tag Manager, Easy WP SMTP, Code Snippets.
- Plugins custom revisados: `id-popup-online-wp`, `id-popup-online-wp-final`, `ingles-divertido-popup-online`. Parecen popups reutilizados de otro proyecto, no nucleo de titulotransporte.com.

## Migrado ya

- Rutas publicas principales y 30 posts preservados en Next.
- Sitemap, robots, canonical y metadata desde codigo.
- Metadata Rank Math importada como fuente preferente para rutas migradas.
- HTML renderizado de WordPress disponible en las rutas heredadas mientras se convierten a componentes nativos.
- Dataset completo de 4.484 preguntas versionado en `src/data/questions-full.json`.
- Endpoint interno `/api/questions` para consultar preguntas por modulo, limite y offset.
- Test online inicial usando el banco real por modulo, con comprobacion inmediata.
- Schema JSON-LD inicial: `BreadcrumbList`, `Product` y `BlogPosting` segun ruta.
- Redireccion heredada `/test-online/` y `/test-online` hacia `/test-competencia-profesional-mercancias/`.

## Rutas criticas preservadas

- `/`
- `/blog/`
- `/test-competencia-profesional-mercancias/`
- `/profesor-ia/`
- `/titulos/`
- `/sobre-nosotros/`
- `/contacto/`
- `/cede-tu-titulo-de-transporte/`
- `/servicios-asesoria-legal-para-transporte/`
- `/producto/curso-titulo-profesional-transporte/`
- `/carrito/`
- `/finalizar-compra/`
- `/mi-cuenta/`
- `/login/`
- `/register/`
- paginas legales
- 30 posts del blog

## Redirecciones existentes

- `/test-online/` -> `/test-competencia-profesional-mercancias/`.

## Backlog funcional obligatorio

1. Convertir paginas publicas prioritarias desde HTML Divi a componentes Next limpios: home, test, producto, titulos, ceder titulo, contacto, blog.
2. Sustituir WooCommerce por flujo propio de checkout con Stripe, producto digital, webhooks y acceso tras pago.
3. Sustituir ARMember por autenticacion, planes, permisos y area privada.
4. Migrar profesor IA: revisar snippets/tablas/endpoints originales y replicar la experiencia en Next.
5. Completar motor de test: simulacros, puntuacion, guardado de sesiones, historial, errores y resultados.
6. Importar resultados y sesiones existentes si hay usuarios que deban conservar historico.
7. Migrar formularios/contacto/email transaccional.
8. Optimizar imagenes y reemplazar assets WordPress externos por assets propios cuando proceda.
9. Ejecutar comparativa SEO contra WordPress: status, canonicals, titles, descriptions, H1, enlaces internos, schema y contenido visible.
10. Preparar corte de dominio con rollback claro: WordPress intacto hasta validar la nueva app.

## Criterio SEO

No se publicara una ruta indexable si falta:

- title especifico;
- meta description natural;
- canonical absoluto;
- un unico H1;
- contenido principal visible en HTML;
- alt text util en imagenes informativas;
- schema alineado con contenido visible cuando aplique;
- estado sitemap/robots coherente.
