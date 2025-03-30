import { motion } from "framer-motion";
import { Command } from "../types/commands";
import styles from "../styles/CommandCard.module.css";
import { useState } from "react";

export default function CommandCard({
  command,
  onCopy,
  copiedCommandId,
  setCopiedCommandId,
}: {
  command: Command;
  onCopy: (text: string) => void;
  copiedCommandId: string | null;
  setCopiedCommandId: (id: string | null) => void;
}) {
  const isCopied = copiedCommandId === command.id;
  const [announceCopy, setAnnounceCopy] = useState(false);

  const handleCopy = (text: string) => {
    setCopiedCommandId(command.id);
    onCopy(text);
    setAnnounceCopy(true);
    setTimeout(() => setAnnounceCopy(false), 100);
    
    if (typeof window !== "undefined") {
      const audio = new Audio("/sounds/arcade.mp3");
      audio.ariaLabel = "Sonido de confirmación de copiado";
      audio.play().catch(() => {});
    }
  };

  const difficultyClass = styles[command.difficulty];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={styles.card}
      role="article"
      aria-labelledby={`command-${command.id}`}
    >
      <div className={styles.commandContainer}>
        <div 
          id={`command-${command.id}`}
          className={styles.commandText}
          tabIndex={0}
          aria-label={`Comando: ${command.command}. Descripción: ${command.description}`}
        >
          {command.command}
        </div>
        <button
          onClick={() => handleCopy(command.command)}
          aria-label={`Copiar comando: ${command.command}`}
          aria-describedby={`tooltip-${command.id}`}
          className={`${styles.copyButton} ${isCopied ? styles.copied : ""}`}
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          {isCopied && (
            <span 
              id={`tooltip-${command.id}`}
              className={styles.copyTooltip}
              role="status"
            >
              ¡Copied!
            </span>
          )}
        </button>
      </div>

      <p className={styles.description}>
        {command.description}
      </p>

      <div className={styles.tagsContainer} aria-label="Etiquetas del comando">
        <span 
          className={`${styles.tag} ${difficultyClass}`}
          aria-label={`Dificultad: ${command.difficulty}`}
        >
          {command.difficulty}
        </span>
        {command.tags.map((tag) => (
          <span 
            key={tag} 
            className={styles.tag}
            aria-label={`Etiqueta: ${tag}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Mensaje solo para screen readers */}
      {announceCopy && (
        <div 
          className="sr-only" 
          aria-live="polite"
        >
          Comando copiado al portapapeles
        </div>
      )}
    </motion.div>
  );
}