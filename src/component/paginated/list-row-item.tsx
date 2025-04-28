export type PaginatedListRowItem<Data extends Record<string, unknown>> = {
    data: Data;
    activeId?: string;
    onActive?: (id: string) => void;
    keyExtractor: (data: Data) => string;
};

export const DefaultPaginatedListRowItem = <Data extends Record<string, unknown>>(props: PaginatedListRowItem<Data>) => {
    const {
        data,
        keyExtractor,
    } = props;

    return keyExtractor(data);
};