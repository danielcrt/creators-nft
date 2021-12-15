import api from '../api';
import resolve, { Response } from '../utils/resolve';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

const resourceUrl = 'users/';

export const useSelfUsers = () => {

  const { data: user, error } = useSWR(
    `${resourceUrl}self`,
    fetcher
  )

  return { user, error, }
}