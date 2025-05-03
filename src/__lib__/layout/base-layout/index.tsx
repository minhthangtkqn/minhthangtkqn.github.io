import './base-layout.scss';
import React from 'react';
import { mergeClass } from "@/util";

type Props = {
    primarySlot?: React.ReactNode;
    secondarySlot?: React.ReactNode;
    extensionSlot?: React.ReactNode;
    className?: string;
};
export const BaseLayout: React.FC<Props> = ({
    primarySlot,
    secondarySlot,
    extensionSlot,
    className,
}) => {
    return (
        <div className={mergeClass('layout-base', className)}>
            {extensionSlot ? <div className="extension">{extensionSlot}</div> : null}
            {primarySlot ? <div className="primary">{primarySlot}</div> : null}
            {secondarySlot ? <div className="secondary">{secondarySlot}</div> : null}
        </div>
    );
};
