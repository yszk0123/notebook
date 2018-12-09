export type WordId = string;

export interface Word {
  content: string;
  createdAt: number;
  id: WordId;
  dirty: boolean;
}

interface WordInput {
  content?: string;
  createdAt?: number;
  dirty?: boolean;
  id: WordId;
}

export function createWord({
  id,
  createdAt = Date.now(),
  content = '',
  dirty = false,
}: WordInput): Word {
  return {
    content,
    createdAt,
    dirty,
    id,
  };
}
