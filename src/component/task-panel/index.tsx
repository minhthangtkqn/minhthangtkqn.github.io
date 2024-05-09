import React, { useState } from "react";
import styled from "styled-components";
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const StyledTaskPanel = styled.div`
    height: 100%;
    background-color: white;
    padding: var(--spacing-xs) var(--spacing-sm);

    .task-list-header {
        font-size: 2.5rem;
        font-weight: bold;
    }

    .task-list {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-sm);

        .task-item-btn {
            width: 100%;
        }

        .task-item {
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--br-sm);
            border: var(--bd);
        }
    }
`;

const demoTaskList = [
    {
        _id: 1,
        name: 'init project',
    },
    {
        _id: 2,
        name: 'clone navbar UI',
    },
];

export const TaskPanel: React.FC = () => {
    const [taskList, setTaskList] = useState<any[]>(demoTaskList);

    return (
        <StyledTaskPanel>
            <div className="task-list-header">Task</div>
            <div className="task-list">
                <Button
                    className="task-item-btn"
                    icon={<PlusOutlined />}
                    size="large"
                    type="dashed"
                >Add Task</Button>

                {taskList.map(item => <div key={item._id} className="task-item">{item.name}</div>)}
            </div>
        </StyledTaskPanel>
    );
};
