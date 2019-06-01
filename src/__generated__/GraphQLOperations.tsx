import gql from 'graphql-tag';
import * as ReactApolloHooks from 'react-apollo-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum ConflictAction {
  IGNORE = 'ignore',
  UPDATE = 'update',
}

export type Counter = {
  __typename?: 'counter';
  count: Scalars['Int'];
  id: Scalars['Int'];
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
};

export type CounterMaxFields = {
  __typename?: 'counter_max_fields';
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type CounterMaxOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

export type CounterMinFields = {
  __typename?: 'counter_min_fields';
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type CounterMinOrderBy = {
  count?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
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
};

export enum CounterSelectColumn {
  COUNT = 'count',
  ID = 'id',
}

export type CounterSetInput = {
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
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
  delete_profile?: Maybe<ProfileMutationResponse>;
  insert_counter?: Maybe<CounterMutationResponse>;
  insert_profile?: Maybe<ProfileMutationResponse>;
  update_counter?: Maybe<CounterMutationResponse>;
  update_profile?: Maybe<ProfileMutationResponse>;
};

export type MutationRootDeleteCounterArgs = {
  where: CounterBoolExp;
};

export type MutationRootDeleteProfileArgs = {
  where: ProfileBoolExp;
};

export type MutationRootInsertCounterArgs = {
  objects: Array<CounterInsertInput>;
  on_conflict?: Maybe<CounterOnConflict>;
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

export type MutationRootUpdateProfileArgs = {
  _inc?: Maybe<ProfileIncInput>;
  _set?: Maybe<ProfileSetInput>;
  where: ProfileBoolExp;
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
  id: Scalars['Int'];
  name: Scalars['String'];
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
  id?: Maybe<IntegerComparisonExp>;
  name?: Maybe<TextComparisonExp>;
};

export enum ProfileConstraint {
  PROFILE_PKEY = 'profile_pkey',
}

export type ProfileIncInput = {
  id?: Maybe<Scalars['Int']>;
};

export type ProfileInsertInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type ProfileMaxFields = {
  __typename?: 'profile_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type ProfileMaxOrderBy = {
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
};

export type ProfileMinFields = {
  __typename?: 'profile_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type ProfileMinOrderBy = {
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
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
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
};

export enum ProfileSelectColumn {
  ID = 'id',
  NAME = 'name',
}

export type ProfileSetInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
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
  ID = 'id',
  NAME = 'name',
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
export type CounterScreenQueryVariables = {};

export type CounterScreenQuery = { __typename?: 'query_root' } & {
  counter: Array<{ __typename?: 'counter' } & Pick<Counter, 'id' | 'count'>>;
};

export const CounterScreenDocument = gql`
  query CounterScreen {
    counter {
      id
      count
    }
  }
`;

export function useCounterScreenQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CounterScreenQueryVariables>,
) {
  return ReactApolloHooks.useQuery<CounterScreenQuery, CounterScreenQueryVariables>(
    CounterScreenDocument,
    baseOptions,
  );
}
