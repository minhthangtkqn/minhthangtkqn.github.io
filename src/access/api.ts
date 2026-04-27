const apiUrl = 'http://127.0.0.1:5000';

export const QueryApi = {
    People: {
        item: (name: string) => {
            return `${apiUrl}/name/${name}`;
        },
        list: () => {
            return `${apiUrl}/name/`;
        },
    },
    Flashcard: {
        item: (id: string) => {
            return `${apiUrl}/card/${id}`;
        },
        list: () => {
            return `${apiUrl}/card/`;
        },
    },
    FlashcardCollection: {
        item: (id: string) => {
            return `${apiUrl}/card-collection/${id}`;
        },
        list: () => {
            return `${apiUrl}/card-collection/`;
        },
        flashCard: {
            item: (collectionId: string, id: string) => {
                return `${apiUrl}/card-collection/${collectionId}/card/${id}`;
            },
            list: (collectionId: string) => {
                return `${apiUrl}/card-collection/${collectionId}/card`;
            },
        },
    },
    GoldPrice: {
        current: () => {
            return `${apiUrl}/gold-price/`;
        },
        list: () => {
            return `${apiUrl}/gold-price-list/`;
        },
    },
    PreciousMetal: {
        getCurrentPrice: () => {
            return `${apiUrl}/precious-metal-price/`;
        },
        getHistoryPriceList: () => {
            return `${apiUrl}/precious-metal-price-list/`;
        },
        getTypeList: () => {
            return `${apiUrl}/precious-metal-type/`;
        },
    },
};

export const CommandApi = {
    Flashcard: {
        addItem: () => {
            return `${apiUrl}/card:add-card/`;
        },
        updateItem: (id: string) => {
            return `${apiUrl}/card/${id}`;
        },
        removeItem: (id: string) => {
            return `${apiUrl}/card/${id}`;
        },
    },
    FlashcardCollection: {
        addItem: () => {
            return `${apiUrl}/card-collection:add-collection/`;
        },
        updateItem: (id: string) => {
            return `${apiUrl}/card-collection/${id}`;
        },
        removeItem: (id: string) => {
            return `${apiUrl}/card-collection/${id}`;
        },
    },
};
