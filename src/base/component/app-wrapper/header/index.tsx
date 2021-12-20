import React from 'react';
import { Link } from 'react-router-dom';
import style from './index.module.scss';

export const AppHeader: React.FC = () => {
    return (
        <div className={style['app-header']}>
            <div className={style['container']}>
                <span><Link to="/" key="home">Home</Link> <Link to="/about" key="about">About</Link></span>
            </div>
        </div>
    );
};
