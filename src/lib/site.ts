import type { Metadata } from "next";
import wpContent from "@/data/wp-content.json";

export const site = {
  name: "titulotransporte.com",
  url: "https://titulotransporte.com",
  phone: "632 18 28 10",
  whatsapp: "34632182810",
  email: "info@titulotransporte.com",
};

export type RouteRecord = {
  path: string;
  title: string;
  description: string;
  h1: string;
  type: "page" | "post" | "product" | "legal" | "account";
  lastModified?: string;
  noindex?: boolean;
};

export const migratedRoutes: RouteRecord[] = [
  {
    path: "/",
    title: "Alquilar título de transporte | Empieza a operar antes",
    description:
      "Asesoramiento para alquilar, ceder o conseguir tu título de transporte. Habla con un especialista y elige la vía adecuada para tu empresa.",
    h1: "Alquila o consigue tu título de transporte con una ruta clara",
    type: "page",
    lastModified: "2025-09-26",
  },
  {
    path: "/test-competencia-profesional-mercancias/",
    title: "Test competencia profesional mercancías | Titulotransporte",
    description:
      "Practica test de competencia profesional de mercancías por módulos, con corrección inmediata y banco completo de preguntas para preparar el examen.",
    h1: "Test de competencia profesional de mercancías",
    type: "page",
    lastModified: "2025-12-05",
  },
  {
    path: "/producto/curso-titulo-profesional-transporte/",
    title: "Curso título transporte 2026 | Titulotransporte",
    description:
      "Curso online para preparar el título de competencia profesional del transporte 2026. Temario práctico, normativa España y UE, test y acceso desde cualquier dispositivo.",
    h1: "Curso para Título de Competencia Profesional del Transporte 2026",
    type: "product",
    lastModified: "2026-06-28",
  },
  {
    path: "/profesor-ia/",
    title: "Profesor IA para título de transporte | Ayuda de estudio",
    description:
      "Resuelve dudas sobre el temario del título de transporte con un profesor IA pensado para estudiar competencia profesional de mercancías.",
    h1: "Profesor IA para estudiar el título de transporte",
    type: "page",
    lastModified: "2025-09-18",
  },
  {
    path: "/titulos/",
    title: "Alquilar título de transporte | Titulotransporte",
    description:
      "Alquila un título de transporte para empezar a operar con acompañamiento experto. Opciones disponibles desde 420 € al mes según plazas y condiciones.",
    h1: "Alquila alguno de nuestros títulos",
    type: "page",
    lastModified: "2026-07-01",
  },
  {
    path: "/cede-tu-titulo-de-transporte/",
    title: "Cede tu título de transporte | Titulotransporte",
    description:
      "Cede tu título de transporte con asesoramiento experto. Revisa opciones para liberar recursos, ganar rentabilidad y mantener un proceso claro.",
    h1: "Cede tu título de transporte",
    type: "page",
    lastModified: "2026-07-01",
  },
  {
    path: "/servicios-asesoria-legal-para-transporte/",
    title: "Asesoría legal para transporte | Titulotransporte",
    description:
      "Asesoría legal especializada para empresas de transporte y autónomos: contratos, cumplimiento normativo, protección legal y acompañamiento.",
    h1: "Asesoría legal para transporte",
    type: "page",
    lastModified: "2026-07-01",
  },
  {
    path: "/sobre-nosotros/",
    title: "Sobre nosotros | titulotransporte.com",
    description:
      "Conoce el equipo de titulotransporte.com y cómo ayudamos a empresas y profesionales del transporte.",
    h1: "Especialistas en título de transporte",
    type: "page",
    lastModified: "2025-09-15",
  },
  {
    path: "/contacto/",
    title: "Contacto | titulotransporte.com",
    description:
      "Contacta con titulotransporte.com por teléfono, WhatsApp o formulario para resolver dudas sobre título de transporte.",
    h1: "Hablemos de tu caso",
    type: "page",
    lastModified: "2025-09-15",
  },
  {
    path: "/blog/",
    title: "Blog sobre transporte y competencia profesional",
    description:
      "Guías sobre competencia profesional, gestor de transporte, LOTT, ROTT, tacógrafo, fiscalidad y gestión de empresas de transporte.",
    h1: "Blog de competencia profesional y transporte",
    type: "page",
    lastModified: "2026-01-17",
  },
  {
    path: "/category/examen-competencia-profesional-mercancias/",
    title: "Examen competencia profesional mercancías | Guías y tests",
    description:
      "Archivo de guías para preparar el examen de competencia profesional de mercancías: tests oficiales, supuestos prácticos, plan de estudio y normativa.",
    h1: "Examen competencia profesional mercancías",
    type: "page",
    lastModified: "2026-07-02",
  },
  {
    path: "/carrito/",
    title: "Carrito | titulotransporte.com",
    description: "Revisa los productos añadidos antes de finalizar la compra.",
    h1: "Carrito",
    type: "account",
    lastModified: "2025-08-26",
    noindex: true,
  },
  {
    path: "/finalizar-compra/",
    title: "Finalizar compra | titulotransporte.com",
    description: "Completa el pago de tu curso o suscripción.",
    h1: "Finalizar compra",
    type: "account",
    lastModified: "2025-09-14",
    noindex: true,
  },
  {
    path: "/mi-cuenta/",
    title: "Mi cuenta | titulotransporte.com",
    description: "Accede a tu cuenta de cliente o alumno.",
    h1: "Mi cuenta",
    type: "account",
    lastModified: "2025-09-19",
    noindex: true,
  },
  {
    path: "/login/",
    title: "Login | titulotransporte.com",
    description: "Inicia sesión en titulotransporte.com.",
    h1: "Iniciar sesión",
    type: "account",
    lastModified: "2025-08-25",
    noindex: true,
  },
  {
    path: "/register/",
    title: "Registro | titulotransporte.com",
    description: "Crea tu cuenta en titulotransporte.com.",
    h1: "Registro",
    type: "account",
    lastModified: "2025-08-25",
    noindex: true,
  },
  {
    path: "/politica-de-cookies-ue/",
    title: "Política de cookies | titulotransporte.com",
    description: "Consulta la política de cookies de titulotransporte.com.",
    h1: "Política de cookies",
    type: "legal",
    lastModified: "2025-08-28",
  },
  {
    path: "/politica-de-privacidad/",
    title: "Política de privacidad | titulotransporte.com",
    description: "Consulta cómo tratamos los datos personales en titulotransporte.com.",
    h1: "Política de privacidad",
    type: "legal",
    lastModified: "2025-08-28",
  },
  {
    path: "/politica-de-devoluciones/",
    title: "Política de devoluciones | titulotransporte.com",
    description: "Consulta las condiciones de devolución de titulotransporte.com.",
    h1: "Política de devoluciones",
    type: "legal",
    lastModified: "2025-08-28",
  },
  {
    path: "/terminos-y-condiciones-de-compra/",
    title: "Términos y condiciones de compra | titulotransporte.com",
    description: "Consulta los términos y condiciones de compra de titulotransporte.com.",
    h1: "Términos y condiciones de compra",
    type: "legal",
    lastModified: "2025-08-28",
  },
];

export const blogPosts: RouteRecord[] = wpContent.posts.map((post) => ({
  path: post.path,
  title: post.hasRankTitle ? post.seoTitle : post.title,
  description: post.seoDescription || post.excerpt,
  h1: post.title,
  type: "post",
  lastModified: post.modified || post.date || "2026-02-23",
}));

export const allRoutes = [...migratedRoutes, ...blogPosts];

export function routeByPath(path: string) {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return allRoutes.find((route) => route.path === normalized);
}

export function metadataFor(route: RouteRecord): Metadata {
  const canonical = new URL(route.path, site.url).toString();

  return {
    title: route.title,
    description: route.description,
    alternates: { canonical },
    robots: route.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: route.type === "post" ? "article" : "website",
      locale: "es_ES",
      siteName: site.name,
      title: route.title,
      description: route.description,
      url: canonical,
    },
  };
}
