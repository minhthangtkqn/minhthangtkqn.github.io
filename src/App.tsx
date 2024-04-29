import './App.scss';
import './style/index.scss';
import React from 'react';
import logo from './logo.svg';
import { Button } from 'antd';

const App: React.FC = () => {
    return (
        <div className="App">
            <div><img src={logo} className="App-logo" alt="logo" /></div>
            <div>
                <Button type="primary">Button</Button>
            </div>
        </div>
    );
};

export default App;
