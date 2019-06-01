import { Nullable } from 'option-t/lib/Nullable';
import { ProfileScreenQuery, useProfileScreenQuery } from '../../../GraphQLType';

interface Props {
  loading: boolean;
  profile: Nullable<Profile>;
}

// FIXME: Remove (#54)
type Profile = NonNullable<ProfileScreenQuery['profile']>[0];
const loadingProfiles: Profile[] = [];

export function useProfileScreen(): Props {
  const { data, loading } = useProfileScreenQuery();
  const profiles = (data && data.profile) || loadingProfiles;
  const profile = profiles.length ? profiles[0] : null;

  return {
    loading,
    profile,
  };
}
