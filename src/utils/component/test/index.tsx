import React, { useState } from 'react';
import style from './index.module.scss';

export const TestComp: React.FC = () => {
    const [isError, setError] = useState<boolean>(false);

    if (isError) {
        throw new Error('I crashed!');
    }

    return (
        <div
            className={style['red']}
            onClick={() => {
                setError(true);
            }}
        >Hey</div>
    )
}
