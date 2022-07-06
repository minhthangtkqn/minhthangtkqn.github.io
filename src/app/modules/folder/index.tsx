import './index.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { demoFolderData } from "./demo-data";
import { CardItem } from "./card-item";
import { FolderItem } from "./folder-item";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';
import { DataProfile } from "@foundation/utils/data-access";
import { QueryURL } from "app/constant";
import { FlashCard } from "app/model";

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
            console.log('🚀 ~ file: index.tsx ~ line 25 ~ const_handleFetchAllCards= ~ response', response.data);
            setFlashCardList(Array.isArray(response.data) ? response.data : []);
        } catch (error) { } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        _handleFetchAllCards();
    }, []);

    useEffect(() => {
        console.log('🚀 ~ file: index.tsx ~ line 41 ~ useEffect ~ flashCardList', flashCardList);
    }, [flashCardList]);

    return (
        <div className="folder-page">
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
        </div>
    );
};
