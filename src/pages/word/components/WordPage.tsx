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
import { getOutdatedWords, getWords } from '../WordSelectors';
import { WordGlobalState } from '../WordState';
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
  useEffect(() => {
    dispatch(loadAllThunk({ userId }));
  }, [userId]);

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
      dispatch(removeThunk({ userId, word }));
    },
    [dispatch, userId],
  );

  return (
    <WordPageWrapper>
      <ListLayout>
        {words.map(word => {
          const handleChangeContent = (content: string) => {
            return onChangeContent(word, content);
          };
          const handleChangeDate = (date: number) => {
            return onChangeDate(word, date);
          };

          return (
            <ListItemLayout key={word.id}>
              <WordListItem
                word={word}
                onChangeContent={handleChangeContent}
                onChangeDate={handleChangeDate}
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

interface PropsOuter {
  loading: boolean;
  outdatedWords: Word[];
  saving: boolean;
  userId: Nullable<string>;
  words: Word[];
  dispatch: Dispatch<any>;
}
const WordPageOuter: React.FunctionComponent<PropsOuter> = ({ loading, userId, ...props }) => {
  if (loading || isNull(userId)) {
    return (
      <LoadingLayout>
        <Icon icon="spinner" spin={true} pulse={true} />
      </LoadingLayout>
    );
  }

  return <WordPageInner {...props} userId={userId} />;
};

interface State extends WordGlobalState, RoutingGlobalState {}

function mapState(state: State) {
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

export const WordPage = connect(mapState)(WordPageOuter);
