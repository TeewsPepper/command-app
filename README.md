# 💻 Comandos Rápidos - Terminal Retro

Terminal interactiva con estilo arcade para acceder rápidamente a comandos de desarrollo esenciales.

## 🌐 Demo en Producción

[![Netlify Status](https://api.netlify.com/api/v1/badges/c95d3cb4-9e16-41dc-9043-364fd775448f/deploy-status)](https://command-app.netlify.app)

🔗 **Acceso directo**: [command-app.netlify.app](https://command-app.netlify.app)

## ✨ Características Principales

- 🔍 **Búsqueda inteligente**: Filtra por comando, descripción, tags o categoría
- 🏷️ **Etiquetado avanzado**: Clasificación por dificultad (Fácil | Medio | Difícil)
- 📱 **Responsive**: Diseño optimizado para móviles y desktop
- 🎮 **Estilo retro**: Efectos visuales CRT (scanlines, flicker, glow)
- 📋 **Copia rápida**: Integración con portapapeles + feedback visual
- 🔊 **Efectos de sonido**: Opcionales (activables en código)

## 🛠️ Tecnologías

[![Tech Stack](https://skillicons.dev/icons?i=react,ts,vite,css,github,vercel&theme=dark)](https://skillicons.dev)

- **React 18** - Componentes funcionales con Hooks
- **TypeScript** - Tipado estático
- **Vite** - Bundler ultrarrápido
- **CSS Modules** - Estilos encapsulados
- **Framer Motion** - Animaciones

## 🚀 Instalación Rápida


# 1. Clonar repositorio
```bash
git clone https://github.com/tuusuario/command-app.git
cd command-app

# 2. Instalar dependencias
npm install
# o
yarn

# 3. Iniciar servidor de desarrollo
npm run dev
# o
yarn dev
4. Abre en tu navegador.

http://localhost:<puerto>


🎛️ Estructura del proyecto

src/
├── components/
│ ├── CommandCard.tsx # Tarjeta individual de comando
│ └── CommandGrid.tsx # Sistema de búsqueda principal
├── context/
│ └── CopyContext.tsx # Gestión de estado global (copiado)
├── data/
│ └── commands.json # Base de datos de comandos
├── styles/
│ ├── CommandCard.module.css # Estilos de tarjetas
│ └── CommandGrid.module.css # Estilos de la cuadrícula
└── types/
└── commands.ts # Tipos TypeScript compartidos



🔧 Cómo añadir nuevos comandos

Edita el archivo src/data/commands.json:

{
  "id": "nombre-unico",
  "command": "comando-ejemplo --flag",
  "description": "Descripción detallada",
  "category": "general",
  "tags": ["tag1", "tag2"],
  "difficulty": "easy" // Opciones: easy, medium, hard
}