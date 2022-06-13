import { Text, Group, Badge, DefaultMantineColor, BadgeVariant, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CPUItem, MotherboardItem } from '../types/parts';

type PartPropertyProps = {
  value: string | number | boolean | string[];
} & (
  | { type: 'text'; title: string; vertical?: boolean }
  | { type: 'badge'; color: DefaultMantineColor; variant: BadgeVariant }
);

function PartProperty(props: PartPropertyProps) {
  const xsBreakpoint = useMediaQuery(`(max-width: 550px)`);

  return props.type === 'badge' ? (
    <Badge
      size={xsBreakpoint ? 'sm' : 'md'}
      color={props.color}
      variant={props.variant}
      sx={(theme) => ({
        textTransform: 'none',
      })}
    >
      {props.value}
    </Badge>
  ) : props.vertical ? (
    <>
      <Text weight={800}>{props.title}</Text>
      <Text weight={500}>{props.value}</Text>
    </>
  ) : (
    <Group position="apart">
      <Text size={xsBreakpoint ? 'sm' : 'md'} weight={700}>
        {props.title}
      </Text>
      <Text size={xsBreakpoint ? 'sm' : 'md'} weight={500}>
        {props.value}
      </Text>
    </Group>
  );
}

export function CPUProperties(props: { item: CPUItem }) {
  return (
    <>
      <Box>
        <Group spacing="xs" mb={5} position="center">
          <PartProperty type="badge" value={`${props.item.cores} RDZENIE`} variant="filled" color="blue" />
          <PartProperty
            type="badge"
            value={`${(props.item.base_clock.cycles / 1000000000).toFixed(2)} GHz`}
            variant="filled"
            color="orange"
          />
          {props.item.multithreading && (
            <PartProperty type="badge" value="Wielowątkowość" color="grape" variant="filled" />
          )}
        </Group>
        <PartProperty
          type="text"
          title="Zintegrowana karta graficzna"
          value={props.item.integrated_graphics ? props.item.integrated_graphics : 'Brak'}
          vertical
        />
      </Box>
    </>
  );
}

export function MotherboardProperties(props: { item: MotherboardItem }) {
  return (
    <>
      <Box>
        <Group spacing="xs" mb={5} position="center">
          <PartProperty type="badge" value={`${props.item.form_factor}`} variant="filled" color="blue" />
          <PartProperty type="badge" value={`${props.item.socket}`} variant="filled" color="lime" />
          <PartProperty
            type="badge"
            value={`${(props.item.max_ram.total / 1000000000).toFixed(0)}GB RAM`}
            variant="filled"
            color="orange"
          />
        </Group>
        <PartProperty type="text" title="Kolor" value={props.item.color} />
        <PartProperty type="text" title="Gniazda RAM" value={props.item.ram_slots} />
      </Box>
    </>
  );
}
