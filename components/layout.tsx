import ResponsiveHeader from './header';
import ResponsiveFooter from './footer';
import { AppShell } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    { link: '/#creator', label: 'Kreator' },
    { link: '/inspirations', label: 'Inspiracje' },
  ];
  return (
    <AppShell
      padding={0}
      header={<ResponsiveHeader links={links} />}
      footer={<ResponsiveFooter links={links} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  );
}
