import React from 'react';
import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 120,
    backgroundColor: theme.colors[theme.primaryColor][6],
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][3],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}));

export default function ServerError() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title order={2} className={classes.title}>
          Coś poszło nie tak...
        </Title>
        <Text size="lg" align="center" className={classes.description}>
          Nasze serwery nie mogły obsłużyć Twojego żądania. Spróbuj odświeżyć stronę.
        </Text>
        <Group position="center">
          <Button variant="white" size="md">
            Odśwież stronę
          </Button>
        </Group>
      </Container>
    </div>
  );
}
