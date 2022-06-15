import ResponsiveHeader from './header';
import ResponsiveFooter from './footer';
import { AppShell, createStyles } from '@mantine/core';
import { useGlobalStyles } from '../utils/styles';

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
  },
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    { link: '/', label: 'Strona Główna' },
    { link: '/creator', label: 'Kreator' },
    { link: '/inspirations', label: 'Inspiracje' },
  ];
  const { classes: globalClasses, cx: globalCx } = useGlobalStyles();
  const { classes, cx } = useStyles();
  return (
    <AppShell
      padding={0}
      header={<ResponsiveHeader links={links} />}
      footer={<ResponsiveFooter links={links} />}
      className={`${classes.main} ${globalClasses.themeTransition}`}
    >
      {children}
    </AppShell>
  );
}
