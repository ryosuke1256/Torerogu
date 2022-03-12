import { useCallback } from 'react';
import { simpleButton, toggleColorButton } from './style';

export const useGetTheme = (theme: string) => {
  const themeStyle = useCallback(() => {
    if (theme === 'simple') {
      return simpleButton();
    } else if (theme === 'toggle') {
      return toggleColorButton();
    } else {
      return;
    }
  }, [theme]);
  return [themeStyle];
};
