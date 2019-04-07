import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '../../../application/styled-components';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Word } from '../entities/Word';
import { Picker } from './Picker';

const Layout = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColorBg};
  margin-bottom: ${({ theme }) => theme.space};
  padding-bottom: ${({ theme }) => theme.space};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.space};
  border: none;
  outline: none;
  flex-grow: 1;

  &:focus {
    border-color: ${({ theme }) => theme.borderActiveColorBg};
  }
`;

interface Props {
  word: Word;
  onChangeContent: (word: Word, content: string) => void;
  onChangeDate: (word: Word, date: number) => void;
  onRemove: (word: Word) => void;
}

export const WordListItem: React.FunctionComponent<Props> = ({
  word,
  onChangeContent,
  onChangeDate,
  onRemove,
}) => {
  const [content, setContent] = useState(word.content);

  useEffect(() => {
    setContent(word.content);
  }, [word.content]);

  const handleChangeContent = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
    onRemove(word);
  }, [word]);

  return (
    <Layout>
      <Input value={content} onChange={handleChangeContent} onBlur={handleBlurContent} />
      <Picker value={word.createdAt} onChange={handleChangeDate} />
      <Button onClick={onClickButton}>
        <Icon icon="trash" />
      </Button>
    </Layout>
  );
};
