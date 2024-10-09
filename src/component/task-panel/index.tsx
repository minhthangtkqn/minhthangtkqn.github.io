import React, { useState } from "react";
import styled from "styled-components";
import { Empty, Input, Checkbox } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { addTaskItem, getTaskList, mergeClass, removeTaskItem } from "@/util";
import { ActionButton } from "../atom";

const StyledTaskPanel = styled.div`
    /* height: 100%; */
    flex: 1;
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
            column-gap: var(--spacing-sm);

            .task-item-title {
                flex: 1;

                &.done {
                    text-decoration: line-through;
                }
            }
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
    const [doneTaskIdList, setDoneTaskIdList] = useState<string[]>([]);

    const handleAddNewTask = (value: string) => {
        addTaskItem({ _id: uuidv4(), title: value });
        setTaskList(getTaskList());
    };

    const handleRemoveTask = (task_id: string) => {
        removeTaskItem(task_id);
        setTaskList(getTaskList());
    };

    const handleToggleTask = (task_id: string) => {
        setDoneTaskIdList(prevIdList => {
            if (prevIdList.includes(task_id)) {
                return prevIdList.filter(i => i !== task_id);
            } else {
                return [...prevIdList, task_id];
            }
        });
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
                    <Checkbox onChange={() => handleToggleTask(item._id)} />
                    <div
                        className={mergeClass(
                            'task-item-title',
                            'truncate',
                            doneTaskIdList.includes(item._id) ? 'done' : undefined,
                        )}
                        title={item.title}
                    >{item.title}</div>
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
