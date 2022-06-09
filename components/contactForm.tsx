import { createStyles, Text, Title, SimpleGrid, TextInput, Textarea, Button, Group, ActionIcon } from '@mantine/core';
import { BrandTwitter, BrandYoutube, BrandInstagram } from 'tabler-icons-react';
import { ContactIconsList } from './contactIcons';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.white,
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.white,
  },
}));

const social = [BrandTwitter, BrandYoutube, BrandInstagram];

export default function ContactForm() {
  const { classes } = useStyles();

  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size={22} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <div>
          <Title className={classes.title}>Kontakt</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Wyślij wiadomość, aby się z nami skontaktować!
          </Text>

          <ContactIconsList variant="white" />

          <Group mt="xl">{icons}</Group>
        </div>
        <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
          <TextInput
            label="E-mail"
            placeholder="twój-email@poczta.pl"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Imię i nazwisko"
            placeholder="Jan Kowalski"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label="Twoja wiadomość"
            placeholder="..."
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <Group position="right" mt="md">
            <Button type="submit" className={classes.control}>
              Wyślij wiadomość
            </Button>
          </Group>
        </form>
      </SimpleGrid>
    </div>
  );
}
