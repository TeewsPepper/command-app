import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import rawCommands from '../data/commands.json';
import CommandCard from '../components/CommandCard';
import { Command } from '../types/commands'; // Solo importamos Command
import styles from '../styles/CommandGrid.module.css';

const commands: Command[] = rawCommands.map(cmd => ({
  ...cmd,
  difficulty: cmd.difficulty as 'easy' | 'medium' | 'hard'
}));

export default function CommandGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [copiedCommandId, setCopiedCommandId] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState('');

  // Efecto para manejar responsive y cambios de accesibilidad
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    
    const handleSystemPreferenceChange = () => {
      setLiveMessage('Preferencias del sistema actualizadas');
      setTimeout(() => setLiveMessage(''), 2000);
    };
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', handleSystemPreferenceChange);
    
    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      motionMedia.removeEventListener('change', handleSystemPreferenceChange);
    };
  }, []);

  // Filtrado optimizado con memorización
  const filteredCommands = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    const filtered = commands.filter(cmd => {
      const matchesSearch = 
        cmd.command.toLowerCase().includes(searchLower) ||
        cmd.description.toLowerCase().includes(searchLower) ||
        cmd.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        cmd.category.toLowerCase().includes(searchLower);
      const matchesCategory = activeCategory === 'all' || cmd.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    // Feedback para screen readers
    if (filtered.length === 0 && (searchTerm || activeCategory !== 'all')) {
      setLiveMessage(`No se encontraron comandos${searchTerm ? ` para "${searchTerm}"` : ''}${activeCategory !== 'all' ? ` en ${activeCategory}` : ''}`);
    } else if (searchTerm || activeCategory !== 'all') {
      setLiveMessage(`Mostrando ${filtered.length} comandos${activeCategory !== 'all' ? ` en ${activeCategory}` : ''}`);
    }

    return filtered;
  }, [searchTerm, activeCategory]);

  const categories = useMemo(() => 
    ['all', ...new Set(commands.map(cmd => cmd.category))],
    []
  );

  // Manejo de copiado accesible
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setLiveMessage(`Comando copiado: ${text}`);
        setTimeout(() => setLiveMessage(''), 1500);
      })
      .catch(() => {
        setLiveMessage('Error al copiar el comando');
      });
  }, []);

  // Manejo accesible de categorías
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setLiveMessage(`Categoría seleccionada: ${category === 'all' ? 'Todas' : category}`);
  }, []);

  // Manejo de teclado para pestañas
  const handleTabKeyDown = useCallback((e: React.KeyboardEvent, category: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCategoryChange(category);
    } else if (e.key === 'ArrowRight') {
      const nextIndex = (categories.indexOf(category) + 1) % categories.length;
      handleCategoryChange(categories[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (categories.indexOf(category) - 1 + categories.length) % categories.length;
      handleCategoryChange(categories[prevIndex]);
    }
  }, [categories, handleCategoryChange]);

  return (
    <div 
      className={`${styles.container} ${isMobile ? styles.mobile : ''}`}
      role="main"
    >
      {/* Región ARIA para anuncios dinámicos */}
      <div 
        aria-live="polite"
        aria-atomic="true"
        className={styles.screenReaderAnnouncement}
      >
        {liveMessage && <span role="status">{liveMessage}</span>}
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>80s Dev Commands</h1>
        
        <div className={styles.searchContainer}>
          <label htmlFor="searchInput" className={styles['sr-only']}>
            Buscar comandos
          </label>
          <input
            id="searchInput"
            type="text"
            placeholder="Buscar comandos..."
            className={styles.searchInput}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            aria-describedby="searchHelp"
          />
          <span id="searchHelp" className={styles.screenReaderHint}>
            Busca por comando, descripción, categoría o etiqueta
          </span>
        </div>

        {/* Navegación por pestañas accesible */}
        <nav aria-label="Filtrar comandos por categoría">
          <div 
            className={styles.tabsContainer}
            role="tablist"
          >
            <div className={styles.tabsScroll}>
              {categories.map((category) => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={activeCategory === category}
                  aria-controls="commandsGrid"
                  id={`tab-${category}`}
                  onClick={() => handleCategoryChange(category)}
                  onKeyDown={(e) => handleTabKeyDown(e, category)}
                  className={`${styles.tabButton} ${
                    activeCategory === category ? styles.activeTab : ''
                  }`}
                  tabIndex={activeCategory === category ? 0 : -1}
                >
                  {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <section 
        id="commandsGrid"
        aria-labelledby="commandsHeading"
        tabIndex={-1}
      >
        <h2 id="commandsHeading" className={styles['sr-only']}>
          {activeCategory === 'all' 
            ? 'Todos los comandos disponibles' 
            : `Comandos de la categoría ${activeCategory}`}
        </h2>

        {filteredCommands.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={styles.commandsGrid}
            role="list"
            aria-label={`Lista de ${filteredCommands.length} comandos`}
          >
            {filteredCommands.map(cmd => (
              <CommandCard 
                key={cmd.id}
                command={cmd}
                onCopy={handleCopy}
                copiedCommandId={copiedCommandId}
                setCopiedCommandId={setCopiedCommandId}
                role="listitem"
              />
            ))}
          </motion.div>
        ) : (
          <div 
            className={styles.noResults}
            role="status"
          >
            No se encontraron resultados para "{searchTerm}"
            {activeCategory !== 'all' && ` en ${activeCategory}`}
          </div>
        )}
      </section>
    </div>
  );
}