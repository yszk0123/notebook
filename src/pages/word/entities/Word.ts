export type WordID = string;

export interface Word {
  content: string;
  createdAt: number;
  id: WordID;
}

export interface WordLoadCursor {
  createdAt: number;
  id: WordID;
}

interface WordInput {
  content?: string;
  createdAt?: number;
  id: WordID;
}

export function createWord({ id, createdAt = Date.now(), content = '' }: WordInput): Word {
  return {
    content,
    createdAt,
    id,
  };
}
