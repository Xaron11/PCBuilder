import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Text, Button, Group, Paper, Stack, useMantineTheme, Center, ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PartsContextType, usePartsContext } from './partsContext';
import { PartItem } from '../types/parts';
import { Trash, Plus } from 'tabler-icons-react';
import { PartInformation } from './partCard';

export default function PartSlot(props: { partName: string; partId: string; partItem: PartItem | null }) {
  const theme = useMantineTheme();
  const xsBreakpoint = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { parts, setParts } = usePartsContext() as PartsContextType;

  function handleRemovePart(e: React.MouseEvent) {
    e.preventDefault();
    setParts({ ...parts, [props.partId]: null });
  }

  return (
    <Paper radius="md">
      {props.partItem === null ? (
        <Group p="sm" position={xsBreakpoint ? 'center' : 'left'}>
          <Link href={`/parts/${encodeURIComponent(props.partId)}`}>
            <Button
              leftIcon={<Plus />}
              radius="md"
              styles={(theme) => ({
                root: {
                  minWidth: 250,
                  width: `40%`,
                },
                inner: {
                  justifyContent: 'flex-start',
                },
              })}
            >
              <Text size="lg">{props.partName}</Text>
            </Button>
          </Link>
        </Group>
      ) : xsBreakpoint ? (
        <Stack p="sm" style={{ position: 'relative' }}>
          <Center>
            <Image
              src={`https://via.placeholder.com/300x200.jpeg?text=${props.partId}`}
              alt="Zdjęcie poglądowe"
              width={300}
              height={200}
            />
          </Center>
          <ActionIcon
            style={{ position: 'absolute', right: 10 }}
            size="lg"
            variant="filled"
            color="red"
            onClick={handleRemovePart}
          >
            <Trash />
          </ActionIcon>
          <Stack style={{ flex: 1 }}>
            <Group position="apart" noWrap align="flex-start">
              <Text style={{ fontSize: 24 }} weight={500}>
                {props.partItem.brand}{' '}
                <Text style={{ fontSize: 24 }} weight={700} component="span">
                  {props.partItem.model.replace(/[\u002d\u2010]/g, '\u2011')}
                </Text>
              </Text>
            </Group>

            <PartInformation item={props.partItem} type={props.partId} />
          </Stack>
        </Stack>
      ) : (
        <Group p="sm" align="flex-start">
          <Stack justify="center">
            <Button
              leftIcon={<Trash />}
              radius="md"
              color="red"
              styles={(theme) => ({
                root: {
                  minWidth: 250,
                  width: `40%`,
                },
                inner: {
                  justifyContent: 'flex-start',
                },
              })}
              onClick={handleRemovePart}
            >
              <Text size="lg">{props.partName}</Text>
            </Button>
            <Center>
              <Image
                src={`https://via.placeholder.com/250x150.jpeg?text=${props.partId}`}
                width={250}
                height={150}
                alt="Zdjęcie poglądowe"
              />
            </Center>
          </Stack>
          <Stack style={{ flex: 1 }}>
            <Text align="center" style={{ fontSize: 24 }} weight={500}>
              {props.partItem.brand}{' '}
              <Text style={{ fontSize: 24 }} weight={700} component="span">
                {props.partItem.model.replace(/[\u002d\u2010]/g, '\u2011')}
              </Text>
            </Text>

            <PartInformation item={props.partItem} type={props.partId} />
          </Stack>
        </Group>
      )}
    </Paper>
  );
}
