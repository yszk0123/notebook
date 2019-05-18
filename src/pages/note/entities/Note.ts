export type NoteID = string;

export interface Note {
  content: string;
  createdAt: number;
  id: NoteID;
}

export interface NoteLoadCursor {
  createdAt: number;
  id: NoteID;
}

interface NoteInput {
  content?: string;
  createdAt?: number;
  id: NoteID;
}

export function createNote({ id, createdAt = Date.now(), content = '' }: NoteInput): Note {
  return {
    content,
    createdAt,
    id,
  };
}
