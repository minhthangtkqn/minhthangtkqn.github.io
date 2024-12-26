const apiUrl = 'http://127.0.0.1:5000';

export const QueryApi = {
    People: {
        item: (name: string) => {
            return `${apiUrl}/name/${name}`;
        },
        list: () => {
            return `${apiUrl}/name`;
        },
    }
};