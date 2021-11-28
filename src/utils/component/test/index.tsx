import React from 'react';
import { Link } from 'react-router-dom';

export const TestComp: React.FC = () => {
    return (
        <div>
            <div>
                <Link to="/" key="home">Home</Link>
            </div>

            <div>
                <Link to="/about" key="about">About</Link>
            </div>
        </div>
    )
}
