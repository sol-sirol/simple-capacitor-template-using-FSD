import { useCallback, useEffect, useState } from "react";

export const useRequest = <T>(
  request: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const requestMemoized = useCallback(() => {
    setLoading(true);

    request()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dependencies]);

  useEffect(() => {
    requestMemoized();
  }, [requestMemoized]);

  return [data, loading, error];
};
