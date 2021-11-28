import React, { useState } from 'react';

export const TestComp: React.FC = () => {
    const [isError, setError] = useState<boolean>(false);

    if (isError) {
        throw new Error('I crashed!');
    }

    return (
        <div
            onClick={() => {
                setError(true);
            }}
        >Hey</div>
    )
}
