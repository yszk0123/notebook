import gql from 'graphql-tag';
import * as ReactApolloHooks from 'react-apollo-hooks';
import * as ReactApollo from 'react-apollo';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
};

export enum ConflictAction {
  IGNORE = 'ignore',
  UPDATE = 'update',
}

export type Counter = {
  __typename?: 'counter';
  count: Scalars['Int'];
  id: Scalars['Int'];
  userId: Scalars['String'];
};

export type CounterAggregate = {
  __typename?: 'counter_aggregate';
  aggregate?: Maybe<CounterAggregateFields>;
  nodes: Array<Counter>;
};

export type CounterAggregateFields = {
  __typename?: 'counter_aggregate_fields';
  avg?: Maybe<CounterAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<CounterMaxFields>;
  min?: Maybe<CounterMinFields>;
  stddev?: Maybe<CounterStddevFields>;
  stddev_pop?: Maybe<CounterStddevPopFields>;
  stddev_samp?: Maybe<CounterStddevSampFields>;
  sum?: Maybe<CounterSumFields>;
  var_pop?: Maybe<CounterVarPopFields>;
  var_samp?: Maybe<CounterVarSampFields>;
  variance?: Maybe<CounterVarianceFields>;
};

export type CounterAggregateFieldsCountArgs = {
  columns?: Maybe<Array<CounterSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type CounterAggregateOrderBy = {
  avg?: Maybe<CounterAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<CounterMaxOrderBy>;
  min?: Maybe<CounterMinOrderBy>;
  stddev?: Maybe<CounterStddevOrderBy>;
  stddev_pop?: Maybe<CounterStddevPopOrderBy>;
  stddev_samp?: Maybe<CounterStddevSampOrderBy>;
  sum?: Maybe<CounterSumOrderBy>;
  var_pop?: Maybe<CounterVarPopOrderBy>;
  var_samp?: Maybe<CounterVarSampOrderBy>;
  variance?: Maybe<CounterVarianceOrderBy>;
};

export type CounterArrRelInsertInput = {
  data: Array<CounterInsertInput>;
  on_conflict?: Maybe<CounterOnConflict>;
};

export type CounterAvgFields = {
  __typename?: 'counter_avg_fields';
  count?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type CounterAvgOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export type CounterBoolExp = {
  _and?: Maybe<Array<Maybe<CounterBoolExp>>>;
  _not?: Maybe<CounterBoolExp>;
  _or?: Maybe<Array<Maybe<CounterBoolExp>>>;
  count?: Maybe<IntegerComparisonExp>;
  id?: Maybe<IntegerComparisonExp>;
  userId?: Maybe<TextComparisonExp>;
};

export enum CounterConstraint {
  COUNTER_PKEY = 'counter_pkey',
}

export type CounterIncInput = {
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type CounterInsertInput = {
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export type CounterMaxFields = {
  __typename?: 'counter_max_fields';
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export type CounterMaxOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export type CounterMinFields = {
  __typename?: 'counter_min_fields';
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export type CounterMinOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export type CounterMutationResponse = {
  __typename?: 'counter_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Counter>;
};

export type CounterObjRelInsertInput = {
  data: CounterInsertInput;
  on_conflict?: Maybe<CounterOnConflict>;
};

export type CounterOnConflict = {
  constraint: CounterConstraint;
  update_columns: Array<CounterUpdateColumn>;
};

export type CounterOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export enum CounterSelectColumn {
  COUNT = 'count',
  ID = 'id',
  USERID = 'userId',
}

export type CounterSetInput = {
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export type CounterStddevFields = {
  __typename?: 'counter_stddev_fields';
  count?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type CounterStddevOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export type CounterStddevPopFields = {
  __typename?: 'counter_stddev_pop_fields';
  count?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type CounterStddevPopOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export type CounterStddevSampFields = {
  __typename?: 'counter_stddev_samp_fields';
  count?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type CounterStddevSampOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export type CounterSumFields = {
  __typename?: 'counter_sum_fields';
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type CounterSumOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export enum CounterUpdateColumn {
  COUNT = 'count',
  ID = 'id',
  USERID = 'userId',
}

export type CounterVarPopFields = {
  __typename?: 'counter_var_pop_fields';
  count?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type CounterVarPopOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export type CounterVarSampFields = {
  __typename?: 'counter_var_samp_fields';
  count?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type CounterVarSampOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export type CounterVarianceFields = {
  __typename?: 'counter_variance_fields';
  count?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type CounterVarianceOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export type IntegerComparisonExp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type MutationRoot = {
  __typename?: 'mutation_root';
  delete_counter?: Maybe<CounterMutationResponse>;
  delete_notes?: Maybe<NotesMutationResponse>;
  delete_profile?: Maybe<ProfileMutationResponse>;
  insert_counter?: Maybe<CounterMutationResponse>;
  insert_notes?: Maybe<NotesMutationResponse>;
  insert_profile?: Maybe<ProfileMutationResponse>;
  update_counter?: Maybe<CounterMutationResponse>;
  update_notes?: Maybe<NotesMutationResponse>;
  update_profile?: Maybe<ProfileMutationResponse>;
};

export type MutationRootDeleteCounterArgs = {
  where: CounterBoolExp;
};

export type MutationRootDeleteNotesArgs = {
  where: NotesBoolExp;
};

export type MutationRootDeleteProfileArgs = {
  where: ProfileBoolExp;
};

export type MutationRootInsertCounterArgs = {
  objects: Array<CounterInsertInput>;
  on_conflict?: Maybe<CounterOnConflict>;
};

export type MutationRootInsertNotesArgs = {
  objects: Array<NotesInsertInput>;
  on_conflict?: Maybe<NotesOnConflict>;
};

export type MutationRootInsertProfileArgs = {
  objects: Array<ProfileInsertInput>;
  on_conflict?: Maybe<ProfileOnConflict>;
};

export type MutationRootUpdateCounterArgs = {
  _inc?: Maybe<CounterIncInput>;
  _set?: Maybe<CounterSetInput>;
  where: CounterBoolExp;
};

export type MutationRootUpdateNotesArgs = {
  _inc?: Maybe<NotesIncInput>;
  _set?: Maybe<NotesSetInput>;
  where: NotesBoolExp;
};

export type MutationRootUpdateProfileArgs = {
  _inc?: Maybe<ProfileIncInput>;
  _set?: Maybe<ProfileSetInput>;
  where: ProfileBoolExp;
};

export type Notes = {
  __typename?: 'notes';
  createdAt: Scalars['timestamptz'];
  id: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  userId: Scalars['String'];
};

export type NotesAggregate = {
  __typename?: 'notes_aggregate';
  aggregate?: Maybe<NotesAggregateFields>;
  nodes: Array<Notes>;
};

export type NotesAggregateFields = {
  __typename?: 'notes_aggregate_fields';
  avg?: Maybe<NotesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<NotesMaxFields>;
  min?: Maybe<NotesMinFields>;
  stddev?: Maybe<NotesStddevFields>;
  stddev_pop?: Maybe<NotesStddevPopFields>;
  stddev_samp?: Maybe<NotesStddevSampFields>;
  sum?: Maybe<NotesSumFields>;
  var_pop?: Maybe<NotesVarPopFields>;
  var_samp?: Maybe<NotesVarSampFields>;
  variance?: Maybe<NotesVarianceFields>;
};

export type NotesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<NotesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type NotesAggregateOrderBy = {
  avg?: Maybe<NotesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<NotesMaxOrderBy>;
  min?: Maybe<NotesMinOrderBy>;
  stddev?: Maybe<NotesStddevOrderBy>;
  stddev_pop?: Maybe<NotesStddevPopOrderBy>;
  stddev_samp?: Maybe<NotesStddevSampOrderBy>;
  sum?: Maybe<NotesSumOrderBy>;
  var_pop?: Maybe<NotesVarPopOrderBy>;
  var_samp?: Maybe<NotesVarSampOrderBy>;
  variance?: Maybe<NotesVarianceOrderBy>;
};

export type NotesArrRelInsertInput = {
  data: Array<NotesInsertInput>;
  on_conflict?: Maybe<NotesOnConflict>;
};

export type NotesAvgFields = {
  __typename?: 'notes_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

export type NotesAvgOrderBy = {
  id?: Maybe<OrderBy>;
};

export type NotesBoolExp = {
  _and?: Maybe<Array<Maybe<NotesBoolExp>>>;
  _not?: Maybe<NotesBoolExp>;
  _or?: Maybe<Array<Maybe<NotesBoolExp>>>;
  createdAt?: Maybe<TimestamptzComparisonExp>;
  id?: Maybe<IntegerComparisonExp>;
  text?: Maybe<TextComparisonExp>;
  updatedAt?: Maybe<TimestamptzComparisonExp>;
  userId?: Maybe<TextComparisonExp>;
};

export enum NotesConstraint {
  NOTE_PKEY1 = 'note_pkey1',
}

export type NotesIncInput = {
  id?: Maybe<Scalars['Int']>;
};

export type NotesInsertInput = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

export type NotesMaxFields = {
  __typename?: 'notes_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

export type NotesMaxOrderBy = {
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  text?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export type NotesMinFields = {
  __typename?: 'notes_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

export type NotesMinOrderBy = {
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  text?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export type NotesMutationResponse = {
  __typename?: 'notes_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Notes>;
};

export type NotesObjRelInsertInput = {
  data: NotesInsertInput;
  on_conflict?: Maybe<NotesOnConflict>;
};

export type NotesOnConflict = {
  constraint: NotesConstraint;
  update_columns: Array<NotesUpdateColumn>;
};

export type NotesOrderBy = {
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  text?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export enum NotesSelectColumn {
  CREATEDAT = 'createdAt',
  ID = 'id',
  TEXT = 'text',
  UPDATEDAT = 'updatedAt',
  USERID = 'userId',
}

export type NotesSetInput = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

export type NotesStddevFields = {
  __typename?: 'notes_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

export type NotesStddevOrderBy = {
  id?: Maybe<OrderBy>;
};

export type NotesStddevPopFields = {
  __typename?: 'notes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

export type NotesStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
};

export type NotesStddevSampFields = {
  __typename?: 'notes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

export type NotesStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
};

export type NotesSumFields = {
  __typename?: 'notes_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

export type NotesSumOrderBy = {
  id?: Maybe<OrderBy>;
};

export enum NotesUpdateColumn {
  CREATEDAT = 'createdAt',
  ID = 'id',
  TEXT = 'text',
  UPDATEDAT = 'updatedAt',
  USERID = 'userId',
}

export type NotesVarPopFields = {
  __typename?: 'notes_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

export type NotesVarPopOrderBy = {
  id?: Maybe<OrderBy>;
};

export type NotesVarSampFields = {
  __typename?: 'notes_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

export type NotesVarSampOrderBy = {
  id?: Maybe<OrderBy>;
};

export type NotesVarianceFields = {
  __typename?: 'notes_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type NotesVarianceOrderBy = {
  id?: Maybe<OrderBy>;
};

export enum OrderBy {
  ASC = 'asc',
  ASC_NULLS_FIRST = 'asc_nulls_first',
  ASC_NULLS_LAST = 'asc_nulls_last',
  DESC = 'desc',
  DESC_NULLS_FIRST = 'desc_nulls_first',
  DESC_NULLS_LAST = 'desc_nulls_last',
}

export type Profile = {
  __typename?: 'profile';
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type ProfileAggregate = {
  __typename?: 'profile_aggregate';
  aggregate?: Maybe<ProfileAggregateFields>;
  nodes: Array<Profile>;
};

export type ProfileAggregateFields = {
  __typename?: 'profile_aggregate_fields';
  avg?: Maybe<ProfileAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ProfileMaxFields>;
  min?: Maybe<ProfileMinFields>;
  stddev?: Maybe<ProfileStddevFields>;
  stddev_pop?: Maybe<ProfileStddevPopFields>;
  stddev_samp?: Maybe<ProfileStddevSampFields>;
  sum?: Maybe<ProfileSumFields>;
  var_pop?: Maybe<ProfileVarPopFields>;
  var_samp?: Maybe<ProfileVarSampFields>;
  variance?: Maybe<ProfileVarianceFields>;
};

export type ProfileAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ProfileSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type ProfileAggregateOrderBy = {
  avg?: Maybe<ProfileAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ProfileMaxOrderBy>;
  min?: Maybe<ProfileMinOrderBy>;
  stddev?: Maybe<ProfileStddevOrderBy>;
  stddev_pop?: Maybe<ProfileStddevPopOrderBy>;
  stddev_samp?: Maybe<ProfileStddevSampOrderBy>;
  sum?: Maybe<ProfileSumOrderBy>;
  var_pop?: Maybe<ProfileVarPopOrderBy>;
  var_samp?: Maybe<ProfileVarSampOrderBy>;
  variance?: Maybe<ProfileVarianceOrderBy>;
};

export type ProfileArrRelInsertInput = {
  data: Array<ProfileInsertInput>;
  on_conflict?: Maybe<ProfileOnConflict>;
};

export type ProfileAvgFields = {
  __typename?: 'profile_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

export type ProfileAvgOrderBy = {
  id?: Maybe<OrderBy>;
};

export type ProfileBoolExp = {
  _and?: Maybe<Array<Maybe<ProfileBoolExp>>>;
  _not?: Maybe<ProfileBoolExp>;
  _or?: Maybe<Array<Maybe<ProfileBoolExp>>>;
  description?: Maybe<TextComparisonExp>;
  id?: Maybe<IntegerComparisonExp>;
  name?: Maybe<TextComparisonExp>;
  userId?: Maybe<TextComparisonExp>;
};

export enum ProfileConstraint {
  PROFILE_PKEY = 'profile_pkey',
  PROFILE_USER_ID_KEY = 'profile_user_id_key',
}

export type ProfileIncInput = {
  id?: Maybe<Scalars['Int']>;
};

export type ProfileInsertInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ProfileMaxFields = {
  __typename?: 'profile_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ProfileMaxOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export type ProfileMinFields = {
  __typename?: 'profile_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ProfileMinOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export type ProfileMutationResponse = {
  __typename?: 'profile_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Profile>;
};

export type ProfileObjRelInsertInput = {
  data: ProfileInsertInput;
  on_conflict?: Maybe<ProfileOnConflict>;
};

export type ProfileOnConflict = {
  constraint: ProfileConstraint;
  update_columns: Array<ProfileUpdateColumn>;
};

export type ProfileOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

export enum ProfileSelectColumn {
  DESCRIPTION = 'description',
  ID = 'id',
  NAME = 'name',
  USERID = 'userId',
}

export type ProfileSetInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ProfileStddevFields = {
  __typename?: 'profile_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

export type ProfileStddevOrderBy = {
  id?: Maybe<OrderBy>;
};

export type ProfileStddevPopFields = {
  __typename?: 'profile_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

export type ProfileStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
};

export type ProfileStddevSampFields = {
  __typename?: 'profile_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

export type ProfileStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
};

export type ProfileSumFields = {
  __typename?: 'profile_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

export type ProfileSumOrderBy = {
  id?: Maybe<OrderBy>;
};

export enum ProfileUpdateColumn {
  DESCRIPTION = 'description',
  ID = 'id',
  NAME = 'name',
  USERID = 'userId',
}

export type ProfileVarPopFields = {
  __typename?: 'profile_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

export type ProfileVarPopOrderBy = {
  id?: Maybe<OrderBy>;
};

export type ProfileVarSampFields = {
  __typename?: 'profile_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

export type ProfileVarSampOrderBy = {
  id?: Maybe<OrderBy>;
};

export type ProfileVarianceFields = {
  __typename?: 'profile_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type ProfileVarianceOrderBy = {
  id?: Maybe<OrderBy>;
};

export type QueryRoot = {
  __typename?: 'query_root';
  counter: Array<Counter>;
  counter_aggregate: CounterAggregate;
  counter_by_pk?: Maybe<Counter>;
  notes: Array<Notes>;
  notes_aggregate: NotesAggregate;
  notes_by_pk?: Maybe<Notes>;
  profile: Array<Profile>;
  profile_aggregate: ProfileAggregate;
  profile_by_pk?: Maybe<Profile>;
};

export type QueryRootCounterArgs = {
  distinct_on?: Maybe<Array<CounterSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CounterOrderBy>>;
  where?: Maybe<CounterBoolExp>;
};

export type QueryRootCounterAggregateArgs = {
  distinct_on?: Maybe<Array<CounterSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CounterOrderBy>>;
  where?: Maybe<CounterBoolExp>;
};

export type QueryRootCounterByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootNotesArgs = {
  distinct_on?: Maybe<Array<NotesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NotesOrderBy>>;
  where?: Maybe<NotesBoolExp>;
};

export type QueryRootNotesAggregateArgs = {
  distinct_on?: Maybe<Array<NotesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NotesOrderBy>>;
  where?: Maybe<NotesBoolExp>;
};

export type QueryRootNotesByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootProfileArgs = {
  distinct_on?: Maybe<Array<ProfileSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProfileOrderBy>>;
  where?: Maybe<ProfileBoolExp>;
};

export type QueryRootProfileAggregateArgs = {
  distinct_on?: Maybe<Array<ProfileSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProfileOrderBy>>;
  where?: Maybe<ProfileBoolExp>;
};

export type QueryRootProfileByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  counter: Array<Counter>;
  counter_aggregate: CounterAggregate;
  counter_by_pk?: Maybe<Counter>;
  notes: Array<Notes>;
  notes_aggregate: NotesAggregate;
  notes_by_pk?: Maybe<Notes>;
  profile: Array<Profile>;
  profile_aggregate: ProfileAggregate;
  profile_by_pk?: Maybe<Profile>;
};

export type SubscriptionRootCounterArgs = {
  distinct_on?: Maybe<Array<CounterSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CounterOrderBy>>;
  where?: Maybe<CounterBoolExp>;
};

export type SubscriptionRootCounterAggregateArgs = {
  distinct_on?: Maybe<Array<CounterSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CounterOrderBy>>;
  where?: Maybe<CounterBoolExp>;
};

export type SubscriptionRootCounterByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootNotesArgs = {
  distinct_on?: Maybe<Array<NotesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NotesOrderBy>>;
  where?: Maybe<NotesBoolExp>;
};

export type SubscriptionRootNotesAggregateArgs = {
  distinct_on?: Maybe<Array<NotesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NotesOrderBy>>;
  where?: Maybe<NotesBoolExp>;
};

export type SubscriptionRootNotesByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootProfileArgs = {
  distinct_on?: Maybe<Array<ProfileSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProfileOrderBy>>;
  where?: Maybe<ProfileBoolExp>;
};

export type SubscriptionRootProfileAggregateArgs = {
  distinct_on?: Maybe<Array<ProfileSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProfileOrderBy>>;
  where?: Maybe<ProfileBoolExp>;
};

export type SubscriptionRootProfileByPkArgs = {
  id: Scalars['Int'];
};

export type TextComparisonExp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

export type TimestamptzComparisonExp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Maybe<Scalars['timestamptz']>>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Maybe<Scalars['timestamptz']>>>;
};
export type HomeScreenQueryVariables = {};

export type HomeScreenQuery = { __typename?: 'query_root' } & {
  counter: Array<{ __typename?: 'counter' } & Pick<Counter, 'id' | 'count'>>;
  notes: Array<{ __typename?: 'notes' } & Pick<Notes, 'id' | 'text'>>;
};

export type UpdateCounterMutationVariables = {
  input?: Maybe<CounterSetInput>;
};

export type UpdateCounterMutation = { __typename?: 'mutation_root' } & {
  update_counter: Maybe<
    { __typename?: 'counter_mutation_response' } & {
      returning: Array<{ __typename?: 'counter' } & Pick<Counter, 'id' | 'count'>>;
    }
  >;
};

export type NoteScreenQueryVariables = {};

export type NoteScreenQuery = { __typename?: 'query_root' } & {
  notes: Array<{ __typename?: 'notes' } & Pick<Notes, 'id' | 'text'>>;
};

export type UpdateNoteMutationVariables = {
  input?: Maybe<NotesSetInput>;
};

export type UpdateNoteMutation = { __typename?: 'mutation_root' } & {
  update_notes: Maybe<
    { __typename?: 'notes_mutation_response' } & {
      returning: Array<{ __typename?: 'notes' } & Pick<Notes, 'id' | 'text'>>;
    }
  >;
};

export type ProfileScreenQueryVariables = {};

export type ProfileScreenQuery = { __typename?: 'query_root' } & {
  profile: Array<{ __typename?: 'profile' } & Pick<Profile, 'id' | 'name' | 'description'>>;
};

export type UpdateProfileMutationVariables = {
  input?: Maybe<ProfileSetInput>;
};

export type UpdateProfileMutation = { __typename?: 'mutation_root' } & {
  update_profile: Maybe<
    { __typename?: 'profile_mutation_response' } & {
      returning: Array<{ __typename?: 'profile' } & Pick<Profile, 'id' | 'name' | 'description'>>;
    }
  >;
};

export const HomeScreenDocument = gql`
  query HomeScreen {
    counter {
      id
      count
    }
    notes {
      id
      text
    }
  }
`;

export function useHomeScreenQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<HomeScreenQueryVariables>,
) {
  return ReactApolloHooks.useQuery<HomeScreenQuery, HomeScreenQueryVariables>(
    HomeScreenDocument,
    baseOptions,
  );
}
export const UpdateCounterDocument = gql`
  mutation UpdateCounter($input: counter_set_input) {
    update_counter(where: {}, _set: $input) {
      returning {
        id
        count
      }
    }
  }
`;
export type UpdateCounterMutationFn = ReactApollo.MutationFn<
  UpdateCounterMutation,
  UpdateCounterMutationVariables
>;

export function useUpdateCounterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateCounterMutation,
    UpdateCounterMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<UpdateCounterMutation, UpdateCounterMutationVariables>(
    UpdateCounterDocument,
    baseOptions,
  );
}
export const NoteScreenDocument = gql`
  query NoteScreen {
    notes {
      id
      text
    }
  }
`;

export function useNoteScreenQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<NoteScreenQueryVariables>,
) {
  return ReactApolloHooks.useQuery<NoteScreenQuery, NoteScreenQueryVariables>(
    NoteScreenDocument,
    baseOptions,
  );
}
export const UpdateNoteDocument = gql`
  mutation UpdateNote($input: notes_set_input) {
    update_notes(where: {}, _set: $input) {
      returning {
        id
        text
      }
    }
  }
`;
export type UpdateNoteMutationFn = ReactApollo.MutationFn<
  UpdateNoteMutation,
  UpdateNoteMutationVariables
>;

export function useUpdateNoteMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateNoteMutation,
    UpdateNoteMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(
    UpdateNoteDocument,
    baseOptions,
  );
}
export const ProfileScreenDocument = gql`
  query ProfileScreen {
    profile {
      id
      name
      description
    }
  }
`;

export function useProfileScreenQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ProfileScreenQueryVariables>,
) {
  return ReactApolloHooks.useQuery<ProfileScreenQuery, ProfileScreenQueryVariables>(
    ProfileScreenDocument,
    baseOptions,
  );
}
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($input: profile_set_input) {
    update_profile(where: {}, _set: $input) {
      returning {
        id
        name
        description
      }
    }
  }
`;
export type UpdateProfileMutationFn = ReactApollo.MutationFn<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

export function useUpdateProfileMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(
    UpdateProfileDocument,
    baseOptions,
  );
}
