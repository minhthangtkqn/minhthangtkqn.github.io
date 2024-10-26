import React from 'react';

type Props = {
    primarySlot?: React.ReactNode;
    secondarySlot?: React.ReactNode;
    extensionSlot?: React.ReactNode;
};
export const BaseLayout: React.FC<Props> = ({ primarySlot, secondarySlot, extensionSlot }) => {
    return (
        <div className="layout-base app-body">
            {extensionSlot ? <div className="extension">{extensionSlot}</div> : null}
            {primarySlot ? <div className="primary">{primarySlot}</div> : null}
            {secondarySlot ? <div className="secondary">{secondarySlot}</div> : null}
        </div>
    );
};
