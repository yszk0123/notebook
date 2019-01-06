import { Nullable } from 'option-t/lib/Nullable';
import { EditorContent } from '../../modules/editor';

interface SaveInput {
  userId: Nullable<string>;
  noteId: string;
  content: Nullable<EditorContent>;
}
export type Save = (_: SaveInput) => void;

interface LoadInput {
  userId: Nullable<string>;
  noteId: string;
}
export type Load = (_: LoadInput) => void;

interface CopyTextInput {
  text: string;
}
export type CopyText = (_: CopyTextInput) => void;
