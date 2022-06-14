import { useState } from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  createStyles,
  Container,
  Title,
  Text,
  useMantineTheme,
  Divider,
  SimpleGrid,
  Pagination,
  Center,
  Group,
  Button,
} from '@mantine/core';
import { useGlobalStyles } from '../../utils/styles';
import { useMediaQuery } from '@mantine/hooks';
import partNames from '../../utils/parts';
import PartCard from '../../components/partCard';
import { PartItem } from '../../types/parts';
import { ArrowLeft } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
    borderRadius: theme.radius.md,
  },

  inner: {
    paddingTop: 100,
    paddingBottom: 120,
  },

  title: {
    fontSize: 40,
    fontWeight: 700,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: 10,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 30,
    },
  },
}));

type PartsProps = {
  part: string;
  items: PartItem[];
};

export default function Parts(props: PartsProps) {
  const { classes, cx } = useStyles();
  const { classes: globalClasses, cx: globalCx } = useGlobalStyles();
  const theme = useMantineTheme();
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 24;
  const totalPages = Math.floor(props.items.length / itemsPerPage);
  const xsBreakpoint = useMediaQuery(`(max-width: 500px)`);
  const partName = partNames[props.part];
  if (typeof partName === 'undefined') {
    //
  }
  return (
    <div className={`${classes.wrapper} ${globalClasses.themeTransition}`}>
      <Container size={900} className={classes.inner}>
        <Group position="center">
          <Title order={2} className={classes.title}>
            Wybierz:{' '}
            <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
              {partName}
            </Text>
          </Title>
          <Link href="/#creator" scroll={false}>
            <Button component="a" size="sm" radius="xl" variant="filled" color="gray" leftIcon={<ArrowLeft />}>
              <Text size="lg">Powrót</Text>
            </Button>
          </Link>
        </Group>
        <Divider size="lg" mb={30} />
        <Center mb="xl">
          <Pagination size={xsBreakpoint ? 'md' : 'lg'} page={activePage} onChange={setPage} total={totalPages} />
        </Center>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: theme.breakpoints.md, cols: 2 },
            //{ maxWidth: 550, cols: 1 },
          ]}
        >
          {props.items.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item, index) => (
            <PartCard key={(activePage - 1) * itemsPerPage + index} type={props.part} item={item} />
          ))}
        </SimpleGrid>
        <Center mt="xl">
          <Pagination size={xsBreakpoint ? 'md' : 'lg'} page={activePage} onChange={setPage} total={totalPages} />
        </Center>
      </Container>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { part: 'motherboard' } },
      { params: { part: 'cpu' } },
      { params: { part: 'video-card' } },
      { params: { part: 'memory' } },
      { params: { part: 'power-supply' } },
      { params: { part: 'internal-hard-drive' } },
      { params: { part: 'case' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticProps & { params: { part: string } }): Promise<{
  props: PartsProps;
}> {
  const { part } = context['params'];
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
  const res = await fetch(apiUrl + `/parts/${part}`);
  console.log(res.text());
  let data;
  try {
    data = await res.json();
  } catch (error) {
    throw new Error(`${error}\n${res.status}\n${res.text()}`);
  }
  console.log(data);
  const items: PartItem[] = data;
  return {
    props: { part: part, items: items },
  };
}
