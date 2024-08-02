import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FoodBankIcon from '@mui/icons-material/FoodBank';

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  link: string;
}

export const SidebarData: SidebarItem[] = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Recipe',
    icon: <MenuBookIcon />,
    link: '/recipe',
  },
  {
    title: 'Add a recipe',
    icon: <FoodBankIcon />,
    link: '/add',
  },
];

export default SidebarData;

