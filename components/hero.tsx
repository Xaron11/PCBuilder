import React from 'react';
import Link from 'next/link';
import { createStyles, Container, Text, Title, Button, Group, useMantineTheme } from '@mantine/core';
import { useGlobalStyles } from '../utils/styles';
const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    paddingTop: 200,
    paddingBottom: 180,

    [BREAKPOINT]: {
      paddingTop: 180,
      paddingBottom: 180,
    },
  },

  title: {
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,
    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },

  inspirationalControl: {
    borderWidth: 2,
    borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.dark[9],
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'transparent',

    '&:hover': {
      backgroundColor: `${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]} !important`,
    },
  },
}));

export default function Hero() {
  const { classes, cx } = useStyles();
  const { classes: globalClasses, cx: globalCx } = useGlobalStyles();
  const theme = useMantineTheme();

  return (
    <div className={`${classes.wrapper} ${globalClasses.themeTransition}`}>
      <Container size={700} className={classes.inner}>
        <Title order={2} className={classes.title}>
          Zbuduj{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            własny
          </Text>{' '}
          PC
        </Title>

        <Text className={classes.description} color="dimmed">
          Nasz kreator umożliwia ci łatwy wybór komponentów do twojego nowego komputera.
        </Text>

        <Group className={classes.controls}>
          <Link href="/creator" passHref>
            <Button
              component="a"
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              Start
            </Button>
          </Link>
          <Link href="/inspirations">
            <Button
              component="a"
              size="xl"
              className={cx(classes.control, classes.inspirationalControl)}
              variant="outline"
              color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
            >
              Inspiracje
            </Button>
          </Link>
        </Group>
      </Container>
    </div>
  );
}
