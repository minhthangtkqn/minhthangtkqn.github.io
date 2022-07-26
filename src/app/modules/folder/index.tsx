import './index.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { demoFolderData } from "./demo-data";
import { FolderItem } from "./folder-item";
import { ArrowBackIcon, AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';
import { DataProfile } from "@foundation/utils/data-access";
import { QueryURL, CommandURL } from "app/constant";
import { FlashCard } from "app/model";
import { FlashCardList } from "./flash-card-list";

type Props = {};
export const Folder: React.FC<Props> = () => {
    const [selectedFolderId, setSelectedFolderId] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [flashCardList, setFlashCardList] = useState<FlashCard[]>([]);

    const selectedFolder = useMemo(() => {
        return demoFolderData.find(item => item.id === selectedFolderId);
    }, [selectedFolderId]);

    const _handleFetchAllCards = async () => {
        try {
            setLoading(true);
            const response = await DataProfile.Get(QueryURL.flashCard.all);
            console.log('🚀 ~ file: index.tsx ~ line 25 ~ const_handleFetchAllCards= ~ response', response);
            setFlashCardList(Array.isArray(response.data) ? response.data : []);
        } catch (error) { } finally {
            setLoading(false);
        }
    };

    const _handleAddNewCard = async () => {
        const newCardId = uuidv4();
        try {
            setLoading(true);
            await DataProfile._request('POST', {
                // url: CommandURL.flashCard.single(newCardId),
                url: CommandURL.flashCard.common,
                data: {
                    _id: newCardId,
                    name: 'Test',
                    description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
                } as FlashCard,
            });
            _handleFetchAllCards();
        } catch (error) { } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        _handleFetchAllCards();
    }, []);

    return (
        <div className="folder-page">
            <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                onClick={_handleAddNewCard}
                variant="outline"
            >Add New Card</Button>

            {/* {!selectedFolderId && (
                <div>
                    <div className="folder-page__title">FOLDER LIST</div>
                    <div className="folder-list">
                        {demoFolderData.map(folder => {
                            return (
                                <FolderItem
                                    key={folder.id}
                                    folder={folder}
                                    onSelectFolder={() => setSelectedFolderId(folder.id)}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {selectedFolderId && (
                <div>
                    <div
                        className="folder-page__title folder-page__title--card-list"
                        onClick={() => setSelectedFolderId('')}
                    >
                        <Flex mt={2} align="center">
                            <Box as={ArrowBackIcon} />
                            <Text ml={1}>CARD LIST</Text>
                        </Flex>
                    </div>
                    <div className="folder-page__sub-title">Folder: {selectedFolder?.name}</div>
                    <div className="folder-item__card-list">
                        {demoFolderData.find(item => item.id === selectedFolderId)?.cards.map(card => {
                            return (
                                <CardItem card={card} />
                            );
                        })}
                    </div>
                </div>
            )} */}

            <div style={{ marginTop: 10 }} />
            <FlashCardList
                flashCardList={flashCardList}
            />
        </div>
    );
};
