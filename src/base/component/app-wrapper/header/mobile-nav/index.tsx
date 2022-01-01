import React from 'react';
import { Stack, useColorModeValue } from '@chakra-ui/react';
import { NAV_ITEMS } from '../constant';
import { MobileNavItem } from './mobile-sub-nav';

export const MobileNav: React.FC = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};