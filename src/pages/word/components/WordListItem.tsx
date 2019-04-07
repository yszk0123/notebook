import { isNull, Nullable } from 'option-t/lib/Nullable';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '../../../application/styled-components';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Word } from '../entities/Word';
import { ListItem } from './List';
import { Picker } from './Picker';

const DEFAULT_TEXTAREA_HEIGHT = 24;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.space};
  border: none;
  outline: none;
  flex-grow: 1;
  resize: none;
  overflow-y: auto;
  min-height: 1em;

  &:focus {
    border-color: ${({ theme }) => theme.borderActiveColorBg};
  }
`;

interface Props {
  word: Word;
  onChangeContent: (word: Word, content: string) => void;
  onChangeDate: (word: Word, date: number) => void;
  onClickRemove: (word: Word) => void;
}

export const WordListItem: React.FunctionComponent<Props> = ({
  word,
  onChangeContent,
  onChangeDate,
  onClickRemove,
}) => {
  const [content, setContent] = useState(word.content);
  const [height, setHeight] = useState(DEFAULT_TEXTAREA_HEIGHT);
  const textareaRef = useRef<Nullable<HTMLTextAreaElement>>(null);

  useEffect(() => {
    setContent(word.content);
  }, [word.content]);

  useEffect(() => {
    if (isNull(textareaRef.current)) {
      return;
    }

    textareaRef.current.style.height = `${DEFAULT_TEXTAREA_HEIGHT}px`;
    const newHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = `${newHeight}px`;

    setHeight(newHeight);
  }, [content, textareaRef]);

  const handleChangeContent = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.currentTarget.value;
    setContent(newContent);
  }, []);

  const handleChangeDate = useCallback(
    (date: number) => {
      onChangeDate(word, date);
    },
    [onChangeDate, word],
  );

  const handleBlurContent = useCallback(() => {
    if (word.content !== content) {
      onChangeContent(word, content);
    }
  }, [onChangeContent, word, content]);

  const onClickButton = useCallback(() => {
    onClickRemove(word);
  }, [onClickRemove, word]);

  return (
    <ListItem>
      <TextArea
        ref={textareaRef}
        style={{ height }}
        value={content}
        onChange={handleChangeContent}
        onBlur={handleBlurContent}
      />
      <Picker value={word.createdAt} onChange={handleChangeDate} />
      <Button onClick={onClickButton}>
        <Icon icon="trash" />
      </Button>
    </ListItem>
  );
};
