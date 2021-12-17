import useSWR from 'swr';
import { User } from '../../../types';
import { fetcher } from '../utils/fetcher';

const resourceUrl = 'users/';

export const useSelfUsers = () => {
  const { data, error, mutate: mutateUser } = useSWR(
    `${resourceUrl}self`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const user: User = data?.data;
  return { user, error, mutateUser }
}