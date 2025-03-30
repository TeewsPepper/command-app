/* import { motion } from "framer-motion";
import { Command } from "../types/commands";
import styles from "../styles/CommandCard.module.css";
import { useState, useEffect } from "react";

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
  const [supportsVibration, setSupportsVibration] = useState(false);

  useEffect(() => {
    setSupportsVibration("vibrate" in navigator);
  }, []);

  const handleCopy = (text: string) => {
    setCopiedCommandId(command.id);
    onCopy(text);
    setAnnounceCopy(true);
 */
    // Feedback háptico
   /*  if (supportsVibration) {
      navigator.vibrate(isCopied ? [50, 30, 50] : 50);
    }

    // Feedback auditivo
    if (typeof window !== "undefined") {
      const prefersReducedAudio = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!prefersReducedAudio) {
        const audio = new Audio("/sounds/arcade.mp3");
        audio.volume = 0.3;
        audio.play().catch((e) => console.debug("Audio no reproducido:", e));
      }
    }
 */
    // Reset después de 1.5 segundos
   /*  const timer = setTimeout(() => {
      setAnnounceCopy(false);
      if (isCopied) setCopiedCommandId(null);
    }, 1500);

    return () => clearTimeout(timer);
  };

  const difficultyClass = styles[command.difficulty];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={styles.card}
      role="article"
      aria-labelledby={`command-${command.id}`}
      initial={false}  */// Evita animaciones iniciales no deseadas
   /*  >
      <div className={styles.commandContainer}>
        <div
          id={`command-${command.id}`}
          className={styles.commandText}
          tabIndex={0}
          aria-label={`Comando: ${command.command}. Descripción: ${command.description}`}
          data-testid="command-text"
        >
          {command.command}
        </div>
        <button
          onClick={() => handleCopy(command.command)}
          onKeyDown={(e) => e.key === "Enter" && handleCopy(command.command)}
          aria-label={`Copiar comando: ${command.command}`}
          aria-describedby={`tooltip-${command.id}`}
          className={`${styles.copyButton} ${isCopied ? styles.copied : ""}`}
          aria-pressed={isCopied}
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          {isCopied && (
            <span
              id={`tooltip-${command.id}`}
              className={styles.copyTooltip}
              role="status"
              aria-hidden={!isCopied}
            >
              ¡Copied!
            </span>
          )}
        </button>
      </div>

      <p className={styles.description}>{command.description}</p>

      <div className={styles.tagsContainer} aria-label="Etiquetas del comando">
        <span
          className={`${styles.tag} ${difficultyClass}`}
          aria-label={`Dificultad: ${command.difficulty}`}
          data-difficulty={command.difficulty}
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
      </div> */

      {/* Mensaje accesible para screen readers */}
     /*  <div
        aria-live="polite"
        aria-atomic="true"
        className={styles['sr-only']}
      >
        {announceCopy && `Comando "${command.command}" copiado al portapapeles`}
      </div>
    </motion.div>
  );
}
 */
import { motion } from "framer-motion";
import { Command } from "../types/commands";
import styles from "../styles/CommandCard.module.css";
import { useState, useEffect } from "react";

interface CommandCardProps {
  command: Command;
  onCopy: (text: string) => void;
  copiedCommandId: string | null;
  setCopiedCommandId: (id: string | null) => void;
  className?: string;
  role?: string;
  'aria-labelledby'?: string;
}

export default function CommandCard({
  command,
  onCopy,
  copiedCommandId,
  setCopiedCommandId,
  className = '',
  role = 'article',
  'aria-labelledby': ariaLabelledby,
  ...props
}: CommandCardProps) {
  const isCopied = copiedCommandId === command.id;
  const [announceCopy, setAnnounceCopy] = useState(false);
  const [supportsVibration, setSupportsVibration] = useState(false);

  useEffect(() => {
    setSupportsVibration("vibrate" in navigator);
  }, []);

  const handleCopy = (text: string) => {
    setCopiedCommandId(command.id);
    onCopy(text);
    setAnnounceCopy(true);

    if (supportsVibration) {
      navigator.vibrate(isCopied ? [50, 30, 50] : 50);
    }

    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!prefersReducedMotion) {
        const audio = new Audio("/sounds/arcade.mp3");
        audio.volume = 0.3;
        audio.play().catch((e) => console.debug("Audio no reproducido:", e));
      }
    }

    const timer = setTimeout(() => {
      setAnnounceCopy(false);
      if (isCopied) setCopiedCommandId(null);
    }, 1500);

    return () => clearTimeout(timer);
  };

  const difficultyClass = styles[command.difficulty];
  const labelledById = ariaLabelledby || `command-title-${command.id} command-desc-${command.id}`;

  return (
    <motion.div
      {...props}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`${styles.card} ${className}`}
      role={role}
      aria-labelledby={labelledById}
      initial={false}
    >
      {/* Heading solo para screen readers */}
      <span id={`command-title-${command.id}`} className={styles['sr-only']}>
        Comando: {command.command}
      </span>

      <div className={styles.commandContainer}>
        <div 
          className={styles.commandText}
          data-testid="command-text"
          aria-hidden="true"
        >
          {command.command}
        </div>
        <button
          onClick={() => handleCopy(command.command)}
          onKeyDown={(e) => e.key === "Enter" && handleCopy(command.command)}
          aria-label={`Copiar comando ${command.command}`}
          className={`${styles.copyButton} ${isCopied ? styles.copied : ""}`}
          aria-pressed={isCopied}
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          {isCopied && (
            <span className={styles.copyTooltip} aria-hidden="true">
              ¡Copiado!
            </span>
          )}
        </button>
      </div>

      <p 
        id={`command-desc-${command.id}`}
        className={styles.description}
      >
        {command.description}
      </p>

      <div 
        className={styles.tagsContainer}
        aria-label="Características del comando"
      >
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

      {announceCopy && (
        <div
          aria-live="assertive"
          aria-atomic="true"
          className={styles['sr-only']}
        >
          Comando "{command.command}" copiado al portapapeles
        </div>
      )}
    </motion.div>
  );
}