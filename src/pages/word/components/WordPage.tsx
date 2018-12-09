import { format } from 'date-fns';
import { isNull } from 'option-t/lib/Nullable';
import React, { useCallback, useEffect, useState } from 'react';
import { AppState } from '../../../app/app-type';
import { CenterLayout } from '../../../app/components/layouts/CenterLayout';
import useRedux from '../../../app/useRedux';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Text } from '../../../components/Text';
import { Word } from '../../../models/Word';
import { styled } from '../../../styled-components';
import { useDebouncedCallback } from '../../../utils/useDebouncedCallback';
import { wordActions } from '../word-type';
import { wordEffects } from '../WordEffect';
import { selectWords as getWords } from '../WordSelectors';

const CHANGE_DELAY = 4000;

const WordPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.default};
  height: 100%;
  width: 100%;
  margin: ${({ theme }) => theme.space};
`;

const ListLayout = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItemLayout = styled.li`
  display: flex;
  width: 100%;

  & + & {
    margin-top: ${({ theme }) => theme.space};
  }
`;

const LoadingLayout = styled(CenterLayout)`
  font-size: 96px;
  color: ${({ theme }) => theme.loadingColorFg};
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

interface Props {}

export const WordPage: React.FunctionComponent<Props> = () => {
  const [{ userId, saving, loading, words }, dispatch] = useRedux(mapState);
  const [isVirtualKeyboardVisible, setFocused] = useState(false);

  useEffect(
    () => {
      if (isNull(userId)) {
        return;
      }

      dispatch(wordEffects.load({ userId }));
    },
    [userId],
  );

  const save = (word: Word) => {
    if (isNull(userId) || isNull(word)) {
      return;
    }

    const input = {
      userId,
      word,
    };
    dispatch(wordEffects.save(input));
  };

  const onBlur = useDebouncedCallback(
    (word: Word) => {
      save(word);
    },
    CHANGE_DELAY,
    [dispatch, userId, words],
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, word: Word) => {
      if (isNull(userId)) return;

      const content = event.currentTarget.value;

      const input = {
        content,
        userId,
        word,
      };
      dispatch(wordActions.updateContent(input));
    },
    [dispatch, userId, words],
  );

  const onAddWord = useCallback(
    () => {
      if (isNull(userId)) return;

      dispatch(wordEffects.add({ userId, content: '' }));
    },
    [dispatch, userId],
  );

  if (loading) {
    return (
      <LoadingLayout>
        <Icon icon="spinner" spin={true} pulse={true} />
      </LoadingLayout>
    );
  }

  return (
    <WordPageWrapper>
      <ListLayout>
        {words.map(word => {
          return (
            <ListItemLayout key={word.id}>
              <Input
                value={word.content}
                onChange={event => onChange(event, word)}
                onBlur={() => onBlur(word)}
              />
              <DateText>{format(word.createdAt, 'YYYY/MM/DD HH:mm')}</DateText>
            </ListItemLayout>
          );
        })}
        <ListItemLayout>
          <Button onClick={onAddWord}>Add</Button>
        </ListItemLayout>
      </ListLayout>
    </WordPageWrapper>
  );
};

function mapState(state: AppState) {
  const words = getWords(state);
  const { saving } = state.word;
  const { loading, user } = state.routing;

  return {
    loading,
    saving,
    userId: user ? user.uid : null,
    words,
  };
}
