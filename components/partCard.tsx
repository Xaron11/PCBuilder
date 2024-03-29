import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CurrencyDollar } from 'tabler-icons-react';
import { createStyles, Text, Button, Group, useMantineTheme, Divider, Stack, Card, Badge, Center } from '@mantine/core';
import { PartItem, CPUItem, MotherboardItem } from '../types/parts';
import { CPUProperties, MotherboardProperties } from './partProperties';
import { useMediaQuery } from '@mantine/hooks';
import { useGlobalStyles } from '../utils/styles';
import { usePartsContext, PartsContextType } from './partsContext';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  partTitle: {
    fontSize: 20,
    [`@media (max-width: 550px)`]: {
      fontSize: 16,
    },
  },
}));

export function PartInformation(props: { item: PartItem; type: string }) {
  const xsBreakpoint = useMediaQuery(`(max-width: 550px)`);
  const price = props.item['price'][1];

  return (
    <>
      {props.type === 'cpu' && <CPUProperties item={props.item as CPUItem} />}
      {props.type === 'motherboard' && <MotherboardProperties item={props.item as MotherboardItem} />}
      <Divider />
      <Group position="apart">
        <Text size={xsBreakpoint ? 'md' : 'lg'} weight={700}>
          Cena
        </Text>
        <Badge
          sx={{ paddingLeft: 10 }}
          size={xsBreakpoint ? 'lg' : 'xl'}
          color="teal"
          leftSection={
            <Center>
              <CurrencyDollar size={20} strokeWidth={3} />
            </Center>
          }
        >
          {price === '0.00' ? '-' : price}
        </Badge>
      </Group>
    </>
  );
}

export default function PartCard(props: { item: PartItem; type: string }) {
  const { classes, cx } = useStyles();
  const { classes: globalClasses, cx: globalCx } = useGlobalStyles();
  const router = useRouter();
  const { parts, setParts } = usePartsContext() as PartsContextType;

  function handlePartAdd(e: React.MouseEvent) {
    e.preventDefault();
    setParts({ ...parts, [props.type]: props.item });
    router.push('/creator');
  }

  return (
    <Card className={`${classes.card} ${globalClasses.themeTransition}`} shadow="sm" p="lg" radius="md">
      <Stack
        spacing="xs"
        justify="space-between"
        sx={(theme) => ({
          height: '100%',
        })}
      >
        <Text className={classes.partTitle} weight={500}>
          {props.item.brand}{' '}
          <Text className={classes.partTitle} weight={700} component="span">
            {props.item.model.replace(/[\u002d\u2010]/g, '\u2011')}
          </Text>
        </Text>
        <Image
          src={`https://via.placeholder.com/600x400.jpeg?text=${props.type}`}
          width={600}
          height={400}
          alt="Zdjęcie poglądowe"
        />

        <PartInformation item={props.item} type={props.type} />

        <Button variant="outline" color="blue" fullWidth onClick={handlePartAdd}>
          <Text>Dodaj</Text>
        </Button>
      </Stack>
    </Card>
  );
}
