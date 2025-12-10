
import {
  Home,
  Bus,
  Trash2,
  BatteryCharging,
  Leaf,
  User,
} from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Início' },
  { href: '/dashboard/buses', icon: Bus, label: 'Autocarros' },
  { href: '/dashboard/waste-bins', icon: Trash2, label: 'Contentores Orgânicos' },
  { href: '/dashboard/chargers', icon: BatteryCharging, label: 'Carregadores' },
  { href: '/dashboard/composting', icon: Leaf, label: 'Compostagem' },
  { href: '/dashboard/profile', icon: User, label: 'Perfil' },
];

