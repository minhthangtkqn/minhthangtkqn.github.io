import { uniqueId } from 'lodash';
import { Folder } from 'app/model';

export const demoFolderData: Folder[] = [
    {
        id: uniqueId(),
        name: 'Mandarin',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'Spanish',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'English',
        cards: [
            {
                id: uniqueId(),
                word: 'Lorem',
                description: 'Lorem ipsum',
            },
            {
                id: uniqueId(),
                word: 'Lorem',
                description: 'Lorem ipsum',
            },
            {
                id: uniqueId(),
                word: 'Lorem',
                description: 'Lorem ipsum',
            },
            {
                id: uniqueId(),
                word: 'Lorem',
                description: 'Lorem ipsum',
            },
            {
                id: uniqueId(),
                word: 'Lorem',
                description: 'Lorem ipsum',
            },
        ],
    },
    {
        id: uniqueId(),
        name: 'Portuguese',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'Vietnamese',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'Japanese',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'Russian',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'Hindi',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'Bengali',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'Arabic',
        cards: [],
    },
    {
        id: uniqueId(),
        name: 'Chinese',
        cards: [],
    },
];