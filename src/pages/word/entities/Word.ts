export type WordId = string;

export interface Word {
  content: string;
  createdAt: number;
  id: WordId;
}

interface WordInput {
  content?: string;
  createdAt?: number;
  id: WordId;
}

export function createWord({ id, createdAt = Date.now(), content = '' }: WordInput): Word {
  return {
    content,
    createdAt,
    id,
  };
}
