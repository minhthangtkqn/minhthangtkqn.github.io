import { Empty } from "antd";
import React from 'react';

export const TomEmpty = ({ ...rest }: React.ComponentProps<typeof Empty>) => {
    return <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        {...rest}
    />;
};
