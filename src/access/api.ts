const apiUrl = 'http://127.0.0.1:5000';

export const QueryApi = {
    People: {
        item: (name: string) => {
            return `${apiUrl}/name/${name}`;
        },
        list: () => {
            return `${apiUrl}/name`;
        },
    },
    Flashcard: {
        item: (id: string) => {
            return `${apiUrl}/card/${id}`;
        },
        list: () => {
            return `${apiUrl}/card`;
        },
    }
};

export const CommandApi = {
    Flashcard: {
        addItem: () => {
            return `${apiUrl}/card`;
        },
        removeItem: (id: string) => {
            return `${apiUrl}/card/${id}`;
        },
    }
};
