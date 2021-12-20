import React from 'react';
import style from './index.module.scss';

export const AppBody: React.FC = ({ children }) => {
    return (
        <div className={style['app-body']}>
            {children}
        </div>
    );
};
