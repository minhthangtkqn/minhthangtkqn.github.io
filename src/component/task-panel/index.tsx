import React, { useState } from "react";
import styled from "styled-components";
import { Empty, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { addTaskItem, getTaskList, removeTaskItem } from "@/util";
import { ActionButton } from "../atom";

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
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
`;

type TaskItem = {
    _id: string;
    title: string;
};

export const TaskPanel: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [taskList, setTaskList] = useState<TaskItem[]>(getTaskList());

    const handleAddNewTask = (value: string) => {
        addTaskItem({ _id: uuidv4(), title: value });
        setTaskList(getTaskList());
    };

    const handleRemoveTask = (task_id: string) => {
        removeTaskItem(task_id);
        setTaskList(getTaskList());
    };

    return (
        <StyledTaskPanel>
            <div className="task-list-header">Task</div>
            <div className="task-list">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Input & Enter to add new task"
                    onPressEnter={(e) => {
                        const value = (e.target as HTMLInputElement)?.value?.trim();
                        if (value) {
                            handleAddNewTask(value);
                            setInputValue('');
                        }
                    }}
                />

                {taskList.map(item => <div key={item._id} className="task-item">
                    {item.title}
                    <ActionButton.Delete
                        onClick={() => handleRemoveTask(item._id)}
                        tooltip="Delete"
                    />
                </div>)}
                {taskList.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}
            </div>
        </StyledTaskPanel>
    );
};
