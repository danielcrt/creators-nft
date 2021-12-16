import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

const resourceUrl = 'users/';

export const useSelfUsers = () => {
  const { data: user, error, mutate: mutateUser } = useSWR(
    `${resourceUrl}self`,
    fetcher,
    { shouldRetryOnError: false }
  )

  return { user, error, mutateUser }
}