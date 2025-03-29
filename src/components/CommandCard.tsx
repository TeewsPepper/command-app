
    import { motion } from "framer-motion";
    import { Command } from "../types/commands";
    import styles from "../styles/CommandCard.module.css";
    
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
    
      const handleCopy = (text: string) => {
        setCopiedCommandId(command.id);
        onCopy(text);
        setCopiedCommandId(command.id);
        
        // Efecto de sonido opcional
        if (typeof window !== "undefined") {
          new Audio("/sounds/arcade.mp3").play().catch(() => {});
        }
      };
    
      const difficultyClass = styles[command.difficulty];
    
      return (
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={styles.card}
        >
          <div className={styles.commandContainer}>
            <div className={styles.commandText}>{command.command}</div>
            <button
              onClick={() => handleCopy(command.command)}
              aria-label={`Copiar ${command.command}`}
              className={`${styles.copyButton} ${isCopied ? styles.copied : ""}`}
            >
              <svg
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
              {isCopied && <span className={styles.copyTooltip}>¡Copied!</span>}
            </button>
          </div>
    
          <p className={styles.description}>{command.description}</p>
    
          <div className={styles.tagsContainer}>
            <span className={`${styles.tag} ${difficultyClass}`}>
              {command.difficulty}
            </span>
            {command.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      );
    }