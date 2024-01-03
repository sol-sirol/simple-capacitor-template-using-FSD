import { ChangeEvent, useCallback, useState } from "react";

export const useInput = (initValue: string) => {
  const [value, setValue] = useState<string>(initValue);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return { value, onChange };
};
