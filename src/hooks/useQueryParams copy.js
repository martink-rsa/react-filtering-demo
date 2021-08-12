import { useMemo, useCallback } from 'react';
import { useLocation, navigate } from '@reach/router';
import qs from 'qs';

const obj = {
  parent: [true],
};

console.log(qs.stringify(obj));

const useQueryParams = () => {
  const location = useLocation();

  const params = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search],
  );

  const setParams = useCallback(
    (_newParams) => {
      console.debug('_newParams:', _newParams);
      const newParams = {
        ...params,
        ..._newParams,
      };

      console.debug('newParams:', newParams);

      const search = qs.stringify(newParams, {
        encode: false,
        addQueryPrefix: true,
        strictNullHandling: true,
      });

      console.debug('search:', search);

      if (search !== location.search) {
        navigate(location.pathname + search);
      }
    },
    [location, params],
  );

  return [params, setParams];
};

export default useQueryParams;
