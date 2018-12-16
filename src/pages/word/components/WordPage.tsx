import { isNull } from 'option-t/lib/Nullable';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { AppState } from '../../../app/app-type';
import { CenterLayout } from '../../../app/components/layouts/CenterLayout';
import useRedux from '../../../app/useRedux';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Text } from '../../../components/Text';
import { Word } from '../../../models/Word';
import { styled } from '../../../styled-components';
import { useDebouncedEffect } from '../../../utils/useDebouncedEffect';
import { wordActions } from '../word-type';
import { wordEffects } from '../WordEffect';
import { getOutdatedWords, getWords } from '../WordSelectors';
import { WordListItem } from './WordListItem';

const CHANGE_DELAY = 1500;

const WordPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.default};
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.space};
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
  align-items: center;

  & + & {
    margin-top: ${({ theme }) => theme.space};
  }
`;

const LoadingLayout = styled(CenterLayout)`
  font-size: 96px;
  color: ${({ theme }) => theme.loadingColorFg};
`;

const ControlLayout = styled.div`
  display: flex;
  align-items: center;
`;

const ControlItemLayout = styled.div`
  & + & {
    margin-left: ${({ theme }) => theme.space};
  }
`;

interface Props {}

export const WordPage: React.FunctionComponent<Props> = () => {
  const [
    { userId, saving, loading, words, outdatedWords },
    dispatch,
  ] = useRedux(mapState);
  const [isVirtualKeyboardVisible, setFocused] = useState(false);

  useEffect(
    () => {
      if (isNull(userId)) return;

      dispatch(wordEffects.load({ userId }));
    },
    [userId],
  );

  const onReload = useCallback(
    () => {
      if (isNull(userId)) return;

      dispatch(wordEffects.load({ userId }));
    },
    [userId],
  );

  const onSave = useCallback(
    (word: Word) => {
      if (isNull(userId) || isNull(word)) {
        return;
      }

      const input = {
        userId,
        word,
      };
      dispatch(wordEffects.save(input));
    },
    [userId, dispatch],
  );

  // FIXME: Move logic into WordEffects
  useDebouncedEffect(
    () => {
      if (isNull(userId) || outdatedWords.length === 0) return;

      const input = {
        userId,
        words: outdatedWords,
      };
      dispatch(wordEffects.saveAll(input));
    },
    CHANGE_DELAY,
    [dispatch, userId, outdatedWords],
  );

  const onChangeContent = useCallback(
    (word: Word, content: string) => {
      if (isNull(userId)) return;

      const input = {
        content,
        userId,
        word,
      };
      dispatch(wordActions.updateContent(input));
    },
    [dispatch, userId],
  );

  const onChangeDate = useCallback(
    (word: Word, createdAt: number) => {
      if (isNull(userId)) return;

      const input = {
        createdAt,
        userId,
        word,
      };
      dispatch(wordActions.updateCreatedAt(input));
    },
    [dispatch, userId],
  );

  const onAddWord = useCallback(
    () => {
      if (isNull(userId)) return;

      dispatch(wordEffects.add({ userId, content: '' }));
    },
    [dispatch, userId],
  );

  const onRemoveWord = useCallback(
    (word: Word) => {
      if (isNull(userId)) return;

      const input = {
        userId,
        word,
      };
      dispatch(wordEffects.remove(input));
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
              <WordListItem
                word={word}
                onChangeContent={content => onChangeContent(word, content)}
                onChangeDate={date => onChangeDate(word, date)}
                onRemove={onRemoveWord}
              />
            </ListItemLayout>
          );
        })}
        <ListItemLayout>
          <ControlLayout>
            <ControlItemLayout>
              <Button onClick={onAddWord}>Add</Button>
            </ControlItemLayout>
            <ControlItemLayout>
              <Button onClick={onReload}>Reload</Button>
            </ControlItemLayout>
            <ControlItemLayout>
              <Text>{saving ? 'saving' : 'saved'}</Text>
            </ControlItemLayout>
          </ControlLayout>
        </ListItemLayout>
      </ListLayout>
    </WordPageWrapper>
  );
};

function mapState(state: AppState) {
  const words = getWords(state);
  const outdatedWords = getOutdatedWords(state);
  const { saving } = state.word;
  const { loading, user } = state.routing;

  return {
    loading,
    outdatedWords,
    saving,
    userId: user ? user.uid : null,
    words,
  };
}