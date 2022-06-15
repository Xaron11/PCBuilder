import React from 'react';
import Image from 'next/image';
import {
  createStyles,
  Container,
  Title,
  Divider,
  Stack,
  useMantineTheme,
  Paper,
  Group,
  SimpleGrid,
  Box,
  Center,
} from '@mantine/core';
import partNames from '../utils/parts';
import { PartItem, MotherboardItem, CPUItem } from '../types/parts';
import PartSlot from '../components/partSlot';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundImage:
      theme.colorScheme === 'dark'
        ? theme.fn.linearGradient(180, theme.colors.dark[5], theme.colors.blue[9], theme.colors.dark[5])
        : theme.colors.gray[3],
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

  paper: {
    borderRadius: theme.radius.lg,
  },
}));

export default function Creator() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const buildParts: Array<Array<PartItem | MotherboardItem | CPUItem>> = [
    [
      {
        brand: 'AMD',
        model: 'i5',
        price: ['USD', '0.00'],
        socket: 'A',
        form_factor: 'A',
        ram_slots: 2,
        max_ram: { total: 8000000000 },
        color: 'Black',
      },
      {
        brand: 'AMD',
        model: 'i5',
        price: ['USD', '0.00'],
        cores: 2,
        base_clock: { cycles: 2000000000 },
        tdp: 0,
        integrated_graphics: null,
        multithreading: false,
      },
      { brand: 'AMD', model: 'i5', price: ['USD', '0.00'] },
      { brand: 'AMD', model: 'i5', price: ['USD', '0.00'] },
      { brand: 'AMD', model: 'i5', price: ['USD', '0.00'] },
      { brand: 'AMD', model: 'i5', price: ['USD', '0.00'] },
      { brand: 'AMD', model: 'i5', price: ['USD', '0.00'] },
    ],
  ];

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <Title order={2} className={classes.title}>
          Inspiracje
        </Title>
        <Divider size="lg" />

        <Stack mt="xl" spacing={theme.spacing.lg}>
          <Paper className={classes.paper}>
            <Stack>
              <Center>
                <Box sx={(theme) => ({ borderRadius: '25%' })}>
                  <Image src="/builds/build1.png" alt="Zdjęcie poglądowe" width="300" height="230"></Image>
                </Box>
              </Center>
              <SimpleGrid mt="xl" spacing={theme.spacing.lg} cols={2}>
                {Object.entries(partNames).map((p, i) => (
                  <PartSlot key={p[0]} static partId={p[0]} partName={p[1]} partItem={buildParts[0][i]} />
                ))}
              </SimpleGrid>
            </Stack>
          </Paper>
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
