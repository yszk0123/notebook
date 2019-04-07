import { isNotNull, isNull, Nullable } from 'option-t/lib/Nullable';
import React, { useCallback, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CenterLayout } from '../../../application/components/layouts/CenterLayout';
import { RoutingGlobalState } from '../../../application/routing';
import { styled } from '../../../application/styled-components';
import { useDebouncedEffect } from '../../../application/utils/useDebouncedEffect';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Text } from '../../../components/Text';
import { Word } from '../entities/Word';
import { addThunk } from '../thunks/addThunk';
import { loadAllThunk } from '../thunks/loadAllThunk';
import { removeThunk } from '../thunks/removeThunk';
import { saveAllThunk } from '../thunks/saveAllThunk';
import { saveThunk } from '../thunks/saveThunk';
import { wordActions } from '../WordActions';
import { outdatedWordsSelector, wordsSelector } from '../WordSelectors';
import { WordGlobalState } from '../WordState';
import { Control, ControlItem } from './Control';
import { List, ListItem } from './List';
import { WordListItem } from './WordListItem';

const CHANGE_DELAY = 1500;

const WordPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.default};
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space};
  -webkit-overflow-scrolling: touch;
`;

const LoadMore = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space};
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const LoadingLayout = styled(CenterLayout)`
  font-size: 96px;
  color: ${({ theme }) => theme.loadingColorFg};
`;

interface Props {
  outdatedWords: Word[];
  saving: boolean;
  userId: string;
  words: Word[];
  dispatch: Dispatch<any>;
}

const WordPageInner: React.FunctionComponent<Props> = ({
  userId,
  saving,
  words,
  outdatedWords,
  dispatch,
}) => {
  // FIXME: Move logic into WordSideEffects
  useDebouncedEffect(
    () => {
      if (outdatedWords.length !== 0) {
        dispatch(saveAllThunk({ userId, words: outdatedWords }));
      }
    },
    CHANGE_DELAY,
    [dispatch, userId, outdatedWords],
  );

  const onReload = useCallback(() => {
    dispatch(loadAllThunk({ userId }));
  }, [userId]);

  const onSave = useCallback(
    (word: Word) => {
      if (isNotNull(word)) {
        dispatch(saveThunk({ userId, word }));
      }
    },
    [userId, dispatch],
  );

  const onChangeContent = useCallback(
    (word: Word, content: string) => {
      dispatch(wordActions.updateContent({ content, userId, word }));
    },
    [dispatch, userId],
  );

  const onChangeDate = useCallback(
    (word: Word, createdAt: number) => {
      dispatch(wordActions.updateCreatedAt({ createdAt, userId, word }));
    },
    [dispatch, userId],
  );

  const onAddWord = useCallback(() => {
    dispatch(addThunk({ userId, content: '' }));
  }, [dispatch, userId]);

  const onRemoveWord = useCallback(
    (word: Word) => {
      if (confirm('This action can not be undone')) {
        dispatch(removeThunk({ userId, word }));
      }
    },
    [dispatch, userId],
  );

  const onLoadMore = useCallback(() => {
    if (words.length) {
      const lastWord = words[words.length - 1];
      const after = { createdAt: lastWord.createdAt, id: lastWord.id };
      dispatch(loadAllThunk({ userId, after }));
    }
  }, [dispatch, userId, words]);

  return (
    <WordPageWrapper>
      <List>
        {words.map(word => {
          return (
            <WordListItem
              key={word.id}
              word={word}
              onChangeContent={onChangeContent}
              onChangeDate={onChangeDate}
              onClickRemove={onRemoveWord}
            />
          );
        })}
        <ListItem onClick={onLoadMore}>
          <LoadMore>Load More</LoadMore>
        </ListItem>
        <ListItem>
          <Control>
            <ControlItem>
              <Button onClick={onAddWord}>Add</Button>
            </ControlItem>
            <ControlItem>
              <Button onClick={onReload}>Reload</Button>
            </ControlItem>
            <ControlItem>
              <Text>{saving ? 'saving' : 'saved'}</Text>
            </ControlItem>
          </Control>
        </ListItem>
      </List>
    </WordPageWrapper>
  );
};

interface PropsOuter {
  loading: boolean;
  outdatedWords: Word[];
  saving: boolean;
  userId: Nullable<string>;
  words: Word[];
  dispatch: Dispatch<any>;
}
const WordPageOuter: React.FunctionComponent<PropsOuter> = ({
  loading,
  userId,
  dispatch,
  ...props
}) => {
  useEffect(() => {
    if (isNotNull(userId)) {
      dispatch(loadAllThunk({ userId }));
    }
  }, [dispatch, userId]);

  if (loading || isNull(userId)) {
    return (
      <LoadingLayout>
        <Icon icon="spinner" spin={true} pulse={true} />
      </LoadingLayout>
    );
  }

  return <WordPageInner {...props} userId={userId} dispatch={dispatch} />;
};

interface State extends WordGlobalState, RoutingGlobalState {}

function mapState(state: State) {
  const words = wordsSelector(state);
  const outdatedWords = outdatedWordsSelector(state);
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

export const WordPage = connect(mapState)(WordPageOuter);
