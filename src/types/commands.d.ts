export interface Command {
  id: string;
  command: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard'; // Más específico que string
}

export interface CommandCardProps {
  command: Command;
  onCopy: (text: string) => void;
  copiedCommandId: string | null;
  setCopiedCommandId: (id: string | null) => void;
  className?: string;
  role?: string;
  'aria-labelledby'?: string;
}
