import './index.scss';
import React from 'react'
import { Folder } from "app/model";

type Props = {
    folder: Folder;
    onSelectFolder?: () => void;
};

export const FolderItem: React.FC<Props> = ({ folder, onSelectFolder }) => {
    return (
        <div
            className="folder-item"
            key={folder.id}
            onClick={onSelectFolder}
        >{folder.name}</div>
    );
};
