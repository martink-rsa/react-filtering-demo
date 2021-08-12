import { useMemo, useCallback } from 'react';
import { useLocation, navigate } from '@reach/router';
// import qs from 'qs';
import qs from 'query-string';

const useQueryParams = () => {
  const location = useLocation();

  const params = useMemo(() => qs.parse(location.search), [location.search]);
  const setParams = useCallback(
    (_newParams) => {
      console.debug('_newParams:', _newParams);
      const newParams = {
        ...params,
        ..._newParams,
      };

      console.debug('newParams:', newParams);

      const search = qs.stringify(newParams);

      console.debug('search:', search);

      if (search !== location.search) {
        // navigate(location.pathname + search);
        navigate('?' + search);
      }
    },
    [location, params],
  );

  return [params, setParams];
};

export default useQueryParams;
