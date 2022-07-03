import './index.scss';
import React, { useMemo, useState } from 'react';
import { demoFolderData } from "./demo-data";
import { CardItem } from "./card-item";
import { FolderItem } from "./folder-item";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {};
export const Folder: React.FC<Props> = () => {
    const [selectedFolderId, setSelectedFolderId] = useState<any>(null);

    const selectedFolder = useMemo(() => {
        return demoFolderData.find(item => item.id === selectedFolderId);
    }, [selectedFolderId]);

    return (
        <div className="folder-page">
            {!selectedFolderId && (
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
            )}
        </div>
    );
};
