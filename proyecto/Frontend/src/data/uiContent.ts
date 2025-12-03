// src/data/uiContent.ts
import { HomePageContent, FooterContent, NosotrosContent } from '../types/UiContent'; // Asegúrate que UiContent.ts exista

export const homePageContent: HomePageContent = {
  pageTitle: 'Level-Up Gamer - Inicio',
  heroTitle: 'Bienvenido a Level-Up Gamer',
  heroSubtitle: 'Tu tienda online gamer en Chile 🚀 Consolas, PCs, accesorios y más.',
  heroButton: 'Explora Productos',
  categoriesTitle: 'Categorías',
  featuredTitle: '🔥 Productos Destacados',
};

export const footerContent: FooterContent = {
  copyright: `© ${new Date().getFullYear()} Level-Up Gamer - Todos los derechos reservados`,
};


export const nosotrosContent: NosotrosContent = {
  pageTitle: 'Level-Up Gamer - Nosotros',
  title: 'Nuestra Misión',
  paragraph1: 'En Level-Up Gamer, somos más que una tienda; somos una comunidad apasionada. Nacimos con el objetivo de traer los mejores productos y accesorios gamer a todo Chile, asegurando calidad, precio justo y un servicio al cliente que entiende tus necesidades.',
  paragraph2: 'Creemos en el poder de los videojuegos para conectar personas. Por eso, no solo vendemos hardware, sino que también apoyamos a la comunidad con eventos, torneos y contenido, ayudando a cada jugador a "subir de nivel" su experiencia.'
};