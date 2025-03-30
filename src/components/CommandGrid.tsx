import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import rawCommands from '../data/commands.json';
import CommandCard from '../components/CommandCard';
import styles from '../styles/CommandGrid.module.css';

interface Command {
  id: string;
  command: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

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

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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

    if (filtered.length === 0 && searchTerm) {
      setLiveMessage(`No se encontraron resultados para "${searchTerm}"${activeCategory !== 'all' ? ` en ${activeCategory}` : ''}`);
    } else if (searchTerm || activeCategory !== 'all') {
      setLiveMessage(`Mostrando ${filtered.length} resultados`);
    }

    return filtered;
  }, [searchTerm, activeCategory]);

  const categories = useMemo(() => 
    ['all', ...new Set(commands.map(cmd => cmd.category))],
    []
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setLiveMessage(`Filtrado por categoría: ${category === 'all' ? 'todas' : category}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setLiveMessage('Comando copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar:', err);
      setLiveMessage('Error al copiar el comando');
    });
  };

  return (
    <div 
      className={`${styles.container} ${isMobile ? styles.mobile : ''}`}
      role="main"
      aria-label="Listado de comandos de desarrollo"
    >
      <div 
        aria-live="polite"
        aria-atomic="true"
        className={styles.screenReaderOnly}
      >
        {liveMessage}
      </div>

      <header className={styles.header}>
        <h1 className={styles.title} tabIndex={0}>80s Dev Commands</h1>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Buscar comandos..."
            className={styles.searchInput}
            onChange={handleSearchChange}
            value={searchTerm}
            aria-label="Buscar comandos"
          />
        </div>

        <div 
          className={styles.tabsContainer}
          role="tablist"
          aria-label="Filtrar por categoría"
        >
          <div className={styles.tabsScroll}>
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                aria-controls="commandsGrid"
                onClick={() => handleCategoryChange(category)}
                className={`${styles.tabButton} ${
                  activeCategory === category ? styles.activeTab : ''
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id="commandsGrid">
        {filteredCommands.length > 0 ? (
          <motion.div 
            initial={false} 
            className={styles.commandsGrid}
          >
            {filteredCommands.map(cmd => (
              <CommandCard 
                key={cmd.id}
                command={cmd}
                onCopy={handleCopy}
                copiedCommandId={copiedCommandId}
                setCopiedCommandId={setCopiedCommandId}
              />
            ))}
          </motion.div>
        ) : (
          <div 
            className={styles.noResults}
            role="alert"
          >
            No se encontraron resultados para "{searchTerm}"
            {activeCategory !== 'all' && ` en ${activeCategory}`}
          </div>
        )}
      </section>
    </div>
  );
}