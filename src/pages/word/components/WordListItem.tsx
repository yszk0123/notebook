import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { Text } from '../../../components/Text';
import { Word } from '../../../models/Word';
import { styled } from '../../../styled-components';

const Layout = styled.div`
  display: flex;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.space};
  border: 2px solid ${({ theme }) => theme.borderColorBg};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.borderActiveColorBg};
  }
`;

const DateText = styled(Text)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space};
`;

interface Props {
  word: Word;
  onChange: (content: string) => void;
}

export const WordListItem: React.FunctionComponent<Props> = ({
  word,
  onChange,
}) => {
  const [content, setContent] = useState(word.content);

  useEffect(
    () => {
      setContent(word.content);
    },
    [word.content],
  );

  const onChangeContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newContent = event.currentTarget.value;
      setContent(newContent);
    },
    [],
  );

  return (
    <Layout>
      <Input
        value={content}
        onChange={onChangeContent}
        onBlur={() => onChange(content)}
      />
      <DateText>{format(word.createdAt, 'YYYY/MM/DD HH:mm')}</DateText>
    </Layout>
  );
};
