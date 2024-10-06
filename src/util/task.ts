const LOCAL_STORAGE_TASK_KEY = 'TASK';

export const addTaskItem = (newTask: Record<string, unknown>) => {
    try {
        const parsedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY) ?? '[]');
        if (Array.isArray(parsedList)) {
            localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify([
                ...parsedList,
                newTask,
            ]));
        } else {
            throw new Error('parsedList is not an array.');
        }
    } catch (error) {
        // không thể lấy list item do parse lỗi, ghi đè list mới vào localStorage
        localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify([newTask]));
    }
};

export const removeTaskItem = (taskId: string) => {
    try {
        const parsedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY) ?? '[]');
        if (Array.isArray(parsedList)) {
            localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(parsedList.filter(i => i._id !== taskId)));
        } else {
            throw new Error('parsedList is not an array.');
        }
    } catch (error) {
        // không thể lấy list item do parse lỗi, không làm gì cả
        console.error(error + 'Cannot remove the item');
    }
};

export const getTaskList = () => {
    try {
        const parsedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY) ?? '[]');
        if (Array.isArray(parsedList)) {
            return parsedList;
        } else {
            throw new Error('parsedList is not an array.');
        }
    } catch (error) {
        // không thể lấy list item do parse lỗi
        return [];
    }
};