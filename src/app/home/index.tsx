import React, { useEffect, useState } from 'react';
import { DataProfile } from '@foundation/utils/data-access';
import { ProductItem } from './product-item';
import { Box, Text } from '@chakra-ui/react';

export function Home() {
    const [productList, setProductList] = useState<any[]>([]);

    async function getData() {
        try {
            const response = await DataProfile.Get('cars');
            setProductList(Array.isArray(response.data?.cars) ? response.data?.cars : []);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box p="5">
            <Text fontSize="4xl">
                HOME PAGE
            </Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                {productList.map(productItem => <ProductItem key={productItem?.id} productData={productItem} />)}
            </div>
        </Box>
    );
};
