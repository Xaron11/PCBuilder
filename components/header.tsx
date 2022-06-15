import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Title } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import ThemeToggle from './themeToggle';
import { useGlobalStyles } from '../utils/styles';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

interface ResponsiveHeaderProps {
  links: { link: string; label: string }[];
}

export default function ResponsiveHeader({ links }: ResponsiveHeaderProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes, cx } = useStyles();
  const { classes: globalClasses, cx: globalCx } = useGlobalStyles();
  const router = useRouter();
  const route = router.route;
  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <a
        className={cx(classes.link, { [classes.linkActive]: route === link.link })}
        onClick={(event) => {
          event.preventDefault();
          toggleOpened(false);
          router.push(link.link);
        }}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={`${classes.root} ${globalClasses.themeTransition}`}>
      <Container className={`${classes.header} ${globalClasses.themeTransition}`}>
        <Link href="/">
          <a>
            <Image src="/logo.png" alt="logo" width="65" height="50" />
          </a>
        </Link>
        <Title order={1}>PC Builder</Title>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <ThemeToggle />
        <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
