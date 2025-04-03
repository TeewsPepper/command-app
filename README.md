# 💻 Retro Command Console

Terminal interactiva con estilo arcade para acceder rápidamente a comandos de desarrollo esenciales.

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Open Source](https://badgen.net/badge/Open%20Source/%E2%9C%94/blue)

## 🌐 Demo en Producción

[![Netlify Status](https://api.netlify.com/api/v1/badges/c95d3cb4-9e16-41dc-9043-364fd775448f/deploy-status)](https://command-app.netlify.app)

🔗 **Acceso directo**: [command-app.netlify.app](https://command-app.netlify.app)

## ✨ Features

- 🔍 **Búsqueda inteligente**: Filtra por comando, descripción, tags o categoría
- 🏷️ **Etiquetado avanzado**: Clasificación por dificultad (Fácil | Medio | Difícil)
- 📱 **Responsive**: Diseño optimizado para móviles y desktop
- 🎮 **Estilo retro**: Efectos visuales CRT (scanlines, flicker, glow)
- 📋 **Copia rápida**: Integración con portapapeles + feedback visual
- 🔊 **Efectos de sonido**: Opcionales (activables en código)

## 🛠️ Tech

[![Tech Stack](https://skillicons.dev/icons?i=react,ts,vite,css,vercel&theme=dark)](https://skillicons.dev)

- **React 18** - Componentes funcionales con Hooks
- **TypeScript** - Tipado estático
- **Vite** - Bundler ultrarrápido
- **CSS Modules** - Estilos encapsulados
- **Framer Motion** - Animaciones

## 🚀 Instalación Rápida


# 1. Clone repository
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

http://localhost:5173  # ← Puerto específico de Vite


🎛️ Estructura del proyecto

src/
├── components/
│ ├── CommandCard.tsx # Individual command component
│ └── CommandGrid.tsx # Search & display system
├── data/
│ └── commands.json # Command database (JSON)
├── styles/
│ ├── CommandCard.module.css # Card styles
│ └── CommandGrid.module.css # Main grid styles
└── types/
└── commands.ts # Shared TypeScript types



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

🤝 Contribuciones Bienvenidas

¡Este proyecto es open source y cualquier mejora es bienvenida! 🎉

Si quieres colaborar con nuevos comandos y funcionalidades, mejorar la UI o corregir errores:

  1. Haz un fork del repositorio.

  2. Crea una rama para tu mejora:
      git checkout -b feature/nueva-mejora



  3. Realiza tus cambios y haz un commit:
      git commit -m "Agregado nuevo comando de Git" 



  4. Haz un push a tu rama y abre un Pull Request:
      git push origin feature/nueva-mejora

  Si encuentras un bug o tienes ideas, ¡abre un issue! 🚀

