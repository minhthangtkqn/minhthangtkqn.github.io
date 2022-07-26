export const BASE_API = 'http://127.0.0.1:5000'

export const QueryURL = {
    flashCard: {
        all: `${BASE_API}/flash_cards`
    },
};

export const CommandURL = {
    flashCard: {
        common: `${BASE_API}/flash_cards`,
        single: (cardId: string) => `${BASE_API}/flash_card/${cardId}`,
    },
};