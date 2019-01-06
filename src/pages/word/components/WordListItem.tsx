import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '../../../app/styled-components';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Word } from '../../../models/Word';
import { Picker } from './Picker';

const Layout = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.space};
  border: 2px solid ${({ theme }) => theme.borderColorBg};
  outline: none;
  flex-grow: 1;

  &:focus {
    border-color: ${({ theme }) => theme.borderActiveColorBg};
  }
`;

interface Props {
  word: Word;
  onChangeContent: (content: string) => void;
  onChangeDate: (date: number) => void;
  onRemove: (word: Word) => void;
}

export const WordListItem: React.FunctionComponent<Props> = ({
  word,
  onChangeContent,
  onChangeDate,
  onRemove,
}) => {
  const [content, setContent] = useState(word.content);

  useEffect(
    () => {
      setContent(word.content);
    },
    [word.content],
  );

  const handleChangeContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newContent = event.currentTarget.value;
      setContent(newContent);
    },
    [],
  );

  const onBlurContent = useCallback(
    () => {
      if (word.content !== content) {
        onChangeContent(content);
      }
    },
    [onChangeContent, word, content],
  );

  const onClickButton = useCallback(
    () => {
      onRemove(word);
    },
    [word],
  );

  return (
    <Layout>
      <Input
        value={content}
        onChange={handleChangeContent}
        onBlur={onBlurContent}
      />
      <Picker value={word.createdAt} onChange={onChangeDate} />
      <Button onClick={onClickButton}>
        <Icon icon="trash" />
      </Button>
    </Layout>
  );
};
