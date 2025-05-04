import './detailed-layout.scss';
import React from 'react';
import { mergeClass } from "@/util";
import { BaseLayout } from "../base-layout";

type DetailedLayoutProps = React.ComponentProps<typeof BaseLayout>;
export class DetailedLayout extends BaseLayout {
    constructor(props: DetailedLayoutProps) {
        super(props);
    }

    render() {
        const {
            PrimaryComponent,
            SecondaryComponent,
            ExtensionComponent,
            className,
        } = this.props;

        return <div className={mergeClass('layout-detailed', className)}>
            {ExtensionComponent ? <div className="extension"><ExtensionComponent /></div> : null}
            {PrimaryComponent ? <div className="primary"><PrimaryComponent /></div> : null}
            {SecondaryComponent ? <div className="secondary"><SecondaryComponent /></div> : null}
        </div>;
    }
}
