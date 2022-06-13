import { createStyles } from '@mantine/core';

const useGlobalStyles = createStyles((theme) => ({
  themeTransition: {
    transition: 'background-color 100ms ease, color 100ms linear',
  },
}));

export { useGlobalStyles };
