import React from 'react';
import { createStyles, Container, Title, Divider, Stack, useMantineTheme } from '@mantine/core';
import partNames from '../utils/parts';
import { PartsContextType, usePartsContext } from '../components/partsContext';
import PartSlot from '../components/partSlot';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
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

export default function Creator() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const { parts, setParts } = usePartsContext() as PartsContextType;

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <Title order={2} className={classes.title}>
          Kreator
        </Title>
        <Divider size="lg" />

        <Stack mt="xl" spacing={theme.spacing.lg}>
          {Object.entries(partNames).map((p) => (
            <PartSlot key={p[0]} partId={p[0]} partName={p[1]} partItem={parts[p[0]]} />
          ))}
        </Stack>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
