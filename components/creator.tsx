import React from 'react';
import Link from 'next/link';
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  useMantineTheme,
  Divider,
  Paper,
  Stack,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Plus } from 'tabler-icons-react';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
    borderRadius: theme.radius.md,
  },

  inner: {
    paddingTop: 100,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontSize: 75,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 900,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 60,
    },
  },
}));

function CreatorPart(props: { title: string; partId: string; buttonWidth: number }) {
  return (
    <Paper radius="md">
      <Group
        p="sm"
        styles={(theme) => ({
          root: {
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
              justifyContent: 'center',
            },
          },
        })}
      >
        <Button
          leftIcon={<Plus />}
          radius="md"
          styles={(theme) => ({
            root: {
              width: `${props.buttonWidth}%`,
              [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                height: 45,
              },
            },
            inner: {
              justifyContent: 'flex-start',
              [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                justifyContent: 'center',
              },
            },
          })}
        >
          <Text size="lg">{props.title}</Text>
        </Button>
      </Group>
    </Paper>
  );
}

export default function Creator() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const parts = [
    { title: 'Płyta główna', partId: 'motherboard' },
    { title: 'Procesor (CPU)', partId: 'cpu' },
    { title: 'Karta graficzna (GPU)', partId: 'video-card' },
    { title: 'Pamięć RAM', partId: 'memory' },
    { title: 'Zasilacz', partId: 'power-supply' },
    { title: 'Dysk wewnętrzny', partId: 'internal-hard-drive' },
    { title: 'Obudowa', partId: 'case' },
  ];
  const smallBreakpoint = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`, false);

  return (
    <div id="creator" className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <Title className={classes.title}>Kreator</Title>
        <Divider size="lg" />

        <Stack mt="xl" spacing={theme.spacing.lg}>
          {parts.map((part) => (
            <CreatorPart
              key={part.partId}
              title={part.title}
              partId={part.partId}
              buttonWidth={smallBreakpoint ? 60 : 40}
            />
          ))}
        </Stack>
      </Container>
    </div>
  );
}
