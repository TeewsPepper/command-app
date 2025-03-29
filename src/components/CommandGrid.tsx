// src/components/CommandGrid.tsx
/* import { useState } from 'react';
import { motion } from 'framer-motion';
import rawCommands from '../data/commands.json';
import CommandCard from '../components/CommandCard';
import styles from '../styles/CommandGrid.module.css'; // <-- Nuevo archivo CSS Module

interface Command {
  id: string;
  command: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: string;
}

const commands: Command[] = rawCommands.map(cmd => ({
  ...cmd,
  difficulty: cmd.difficulty as 'easy' | 'medium' | 'hard'
}));

export default function CommandGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCommands = commands.filter(cmd => {
    const matchesSearch = cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || cmd.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(commands.map(cmd => cmd.category))];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Comandos Rápidos
        </h1>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Buscar comandos..."
            className={styles.searchInput}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabsScroll}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
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

      <main className={styles.mainContent}>
        {filteredCommands.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.commandsGrid}
          >
            {filteredCommands.map(cmd => (
              <CommandCard 
                key={cmd.id}
                command={cmd}
                onCopy={handleCopy}
              />
            ))}
          </motion.div>
        ) : (
          <div className={styles.noResults}>
            No se encontraron resultados
          </div>
        )}
      </main>
    </div>
  );
} */
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
    difficulty: string;
  }
  
  const commands: Command[] = rawCommands.map(cmd => ({
    ...cmd,
    difficulty: cmd.difficulty as 'easy' | 'medium' | 'hard'
  }));
  
  export default function CommandGrid() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [isMobile, setIsMobile] = useState(false);
  
    // Detectar si es móvil al cargar y al cambiar tamaño
    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      // Verificar al montar
      checkIfMobile();
  
      // Escuchar cambios de tamaño
      window.addEventListener('resize', checkIfMobile);
  
      // Limpiar listener al desmontar
      return () => window.removeEventListener('resize', checkIfMobile);
    }, []);
  
    const filteredCommands = useMemo(() => {
      const searchLower = searchTerm.toLowerCase();
      
      return commands.filter(cmd => {
        const matchesSearch = 
          cmd.command.toLowerCase().includes(searchLower) ||
          cmd.description.toLowerCase().includes(searchLower) ||
          cmd.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          cmd.category.toLowerCase().includes(searchLower);
        
        const matchesCategory = activeCategory === 'all' || cmd.category === activeCategory;
        
        return matchesSearch && matchesCategory;
      });
    }, [searchTerm, activeCategory]);
  
    const categories = useMemo(() => 
      ['all', ...new Set(commands.map(cmd => cmd.category))],
      []
    );
  
    const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
    };
  
    return (
      <div className={`${styles.container} ${isMobile ? styles.mobile : ''}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Comandos Rápidos</h1>
          
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="🔍 Buscar comandos..."
              className={styles.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
  
          <div className={styles.tabsContainer}>
            <div className={styles.tabsScroll}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
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
  
        <main className={styles.mainContent}>
          {filteredCommands.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.commandsGrid}
            >
              {filteredCommands.map(cmd => (
                <CommandCard 
                  key={cmd.id}
                  command={cmd}
                  onCopy={handleCopy}
                />
              ))}
            </motion.div>
          ) : (
            <div className={styles.noResults}>
              No se encontraron resultados para "{searchTerm}"
              {activeCategory !== 'all' && ` en ${activeCategory}`}
            </div>
          )}
        </main>
      </div>
    );
  }