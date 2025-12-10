
import {
  Home,
  Bus,
  Trash2,
  BatteryCharging,
  Leaf,
  Trees,
  Route,
  User,
  Settings,
  Tv,
} from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Início' },
  { href: '/dashboard/buses', icon: Bus, label: 'Autocarros' },
  { href: '/dashboard/waste-bins', icon: Trash2, label: 'Contentores Orgânicos' },
  { href: '/dashboard/chargers', icon: BatteryCharging, label: 'Carregadores' },
  { href: '/dashboard/composting', icon: Leaf, label: 'Compostagem' },
  { href: '/dashboard/ecopark', icon: Trees, label: 'Ecoparques' },
  {
    href: '/dashboard/sustainable-routing',
    icon: Route,
    label: 'Rotas',
  },
  { href: '/dashboard/bus-stop-display', icon: Tv, label: 'Ecrã TV Paragem'},
  { href: '/dashboard/profile', icon: User, label: 'Perfil' },
  { href: '/dashboard/settings', icon: Settings, label: 'Definições'},
];
