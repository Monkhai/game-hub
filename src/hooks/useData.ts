import { AxiosRequestConfig, CanceledError } from 'axios';
import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

interface FetchResponse<T> {
  count: number;
  results: T[];
}
//<T> is a type placeholder for an interface.
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  //when <T> is passed here, it will allow to create a state with an array of the interface object
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      //controller used to signal and abort requests that have been called for by components if they are unmounted
      const controller = new AbortController();
      setLoading(true);
      apiClient
        //in get, we specify a FetchResponse type that itself can take the placeholder type. See the interface above.
        //the second object we pass has the signal from the controller so we can abort if needed
        //it also spreads the requestConfig object which allows to pass params to look by genre
        .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
        .then((res) => {
          setLoading(false);
          setData(res.data.results);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setLoading(false);
          setError(err.message);
        });
      //this cleanup function will be called when the using component is unmounted
      return () => controller.abort();
    },
    //the dependencies here will cause a reactivation of this effect if there is a deps passed and it changes.
    //otherwise the empty array will ensure a singal call for the effect.
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
