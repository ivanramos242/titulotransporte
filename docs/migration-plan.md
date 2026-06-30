# Migración de titulotransporte.com

Fecha de auditoría inicial: 2026-06-30.

## Objetivo

Migrar la web actual de WordPress/Divi a Next.js manteniendo tráfico orgánico, slugs, intención de búsqueda y funciones comerciales clave.

## Intención principal

La home actual trabaja la intención comercial `alquilar título de transporte`. Las intenciones secundarias son:

- ceder título de transporte;
- preparar el título de competencia profesional;
- practicar test de competencia profesional de mercancías;
- comprar el curso online;
- acceder al profesor IA y al área de usuario.

## Inventario detectado

- WordPress `php8.3-apache`.
- MySQL 9.
- Tema activo: Divi 4.27.7.
- 21 páginas publicadas.
- 30 posts publicados.
- 1 producto WooCommerce publicado.
- 4.484 preguntas publicadas en `pregunta`.
- 1.468 resultados de test.
- 40 sesiones de autotest.
- 1 producto virtual/descargable: `/producto/curso-titulo-profesional-transporte/`.
- Precio actual del producto: 99 EUR. Precio regular: 200 EUR.
- ARMember con planes gratuitos y un plan "Nuevo Profesor IA" de 35,99.
- Plugins activos relevantes: Rank Math, WooCommerce, Stripe, ARMember, Complianz, Google Tag Manager, Easy WP SMTP, Code Snippets, plugins custom de popup/test.

## Rutas críticas preservadas

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
- páginas legales
- 30 posts del blog

## Redirecciones existentes

- `/test-online/` -> `/test-competencia-profesional-mercancias/` con 301.

## Arquitectura propuesta

- Next.js App Router.
- Rutas públicas SSG/SSR con HTML indexable.
- Datos editoriales versionados durante la migración.
- Motor de tests propio basado en las preguntas exportadas.
- Stripe Checkout y webhooks para curso/suscripciones.
- Autenticación propia o Auth.js.
- Área privada para curso, profesor IA, historial y resultados.
- Sitemap, robots, canonicals y JSON-LD generados desde código.

## Fases

1. Congelar export de WordPress: contenido, metadatos SEO, medios, productos, usuarios, pedidos, preguntas y resultados.
2. Crear mapa URL -> intención -> metadata -> contenido -> schema.
3. Migrar páginas públicas principales.
4. Migrar blog y archivo editorial.
5. Migrar ecommerce y pagos.
6. Migrar cuenta, membresías y profesor IA.
7. Migrar tests y resultados.
8. Optimizar imágenes y Core Web Vitals.
9. Validar contra WordPress: status, canonicals, títulos, descripciones, H1, enlaces, schema y contenidos.
10. Preparar despliegue en EasyPanel con estrategia de corte y rollback.

## Criterio SEO

No se publicará una ruta indexable si falta:

- title específico;
- meta description natural;
- canonical absoluto;
- un único H1;
- contenido principal visible en HTML;
- alt text útil en imágenes informativas;
- schema alineado con contenido visible cuando aplique;
- estado sitemap/robots coherente.
