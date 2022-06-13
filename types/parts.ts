export interface PartItem {
  brand: string;
  model: string;
  price: [string, string];
}

export interface CPUItem extends PartItem {
  cores: number;
  base_clock: { cycles: number };
  tdp: number;
  integrated_graphics: string;
  multithreading: boolean;
}

export interface MotherboardItem extends PartItem {
  socket: string;
  form_factor: string;
  ram_slots: number;
  max_ram: { total: number };
  color: string;
}

export type PartsCookie = {
  motherboard: MotherboardItem | null;
  cpu: CPUItem | null;
  'video-card': null;
  memory: null;
  'power-supply': null;
  'internal-hard-drive': null;
  case: null;
};
