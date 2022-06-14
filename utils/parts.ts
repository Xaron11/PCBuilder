import { PartsCookie } from '../types/parts';

const partNames: {
  [key: string]: string;
} = {
  motherboard: 'Płyta główna',
  cpu: 'Procesor (CPU)',
  'video-card': 'Karta graficzna (GPU)',
  memory: 'Pamięć RAM',
  'power-supply': 'Zasilacz',
  'internal-hard-drive': 'Dysk wewnętrzny',
  case: 'Obudowa',
};

const defaultParts: PartsCookie = {
  motherboard: null,
  cpu: null,
  'video-card': null,
  memory: null,
  'power-supply': null,
  'internal-hard-drive': null,
  case: null,
};

export default partNames;
export { defaultParts };
