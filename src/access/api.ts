const apiUrl = 'https://focus-app-api.onrender.com';

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
    GoldPrice: {
        current: () => {
            return `${apiUrl}/gold-price/`;
        },
        list: () => {
            return `${apiUrl}/gold-price-list/`;
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
    }
};
