import './base-layout.scss';
import React from 'react';
import { mergeClass } from "@/util";

type BaseLayoutProps = {
    PrimaryComponent?: React.ComponentType;
    SecondaryComponent?: React.ComponentType;
    ExtensionComponent?: React.ComponentType;
    className?: string;
};
export class BaseLayout extends React.Component<BaseLayoutProps> {
    constructor(props: BaseLayoutProps) {
        super(props);
    }

    render() {
        const {
            PrimaryComponent,
            SecondaryComponent,
            ExtensionComponent,
            className,
        } = this.props;

        return <div className={mergeClass('layout-base', className)}>
            {ExtensionComponent ? <div className="extension"><ExtensionComponent /></div> : null}
            {PrimaryComponent ? <div className="primary"><PrimaryComponent /></div> : null}
            {SecondaryComponent ? <div className="secondary"><SecondaryComponent /></div> : null}
        </div>;
    }
}
