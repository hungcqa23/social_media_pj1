import { isUndefined, omitBy } from 'lodash';
import { useQueryString } from './useQueryString';

export default function useQueryConfig() {
  const queryParams = useQueryString();

  const queryConfig = omitBy({}, isUndefined);
  return queryConfig;
}
