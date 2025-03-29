// src/types/command.ts
export interface Command {
  id: string;
  command: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: string;
}
