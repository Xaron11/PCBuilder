import React from 'react';
import Link from 'next/link';
import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function NotFound() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title order={2} className={classes.title}>
        Tutaj niczego nie ma
      </Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Strona, którą próbujesz otworzyć, nie istnieje. Możliwe, że błędnie wpisałeś adres lub strona została
        przeniesiona pod inny adres URL. Jeśli uważasz, że jest to błąd, skontaktuj się z działem pomocy technicznej.
      </Text>
      <Group position="center">
        <Link href="/">
          <Button variant="subtle" size="md">
            Przejdź do strony głównej
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
