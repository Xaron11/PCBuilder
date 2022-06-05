import Link from 'next/link';
import { createStyles, Anchor, Group, ActionIcon } from '@mantine/core';
import { BrandTwitter, BrandYoutube, BrandInstagram } from 'tabler-icons-react';
import Image from 'next/image';

const useStyles = createStyles((theme) => ({
  footer: {
    // marginTop: 120,
    marginTop: 1,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterProps {
  links: { link: string; label: string }[];
}

export default function Footer({ links }: FooterProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <Anchor<'a'> color="dimmed" sx={{ lineHeight: 1 }} size="sm">
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Link href="/">
          <a>
            <Image src="/logo.png" alt="logo" width="65" height="50" />
          </a>
        </Link>
        <Group className={classes.links}>{items}</Group>

        <Group spacing={0} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
