import { useEffect, useState } from "react";

export const MODULE_PARAM_KEY = 'module';

const getModuleKey = () => {
    return (new URLSearchParams(window.location.search)).get(MODULE_PARAM_KEY);
};

const updateModuleKey = (newModuleKey: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(MODULE_PARAM_KEY, newModuleKey);
    window.location.href = newUrl.href;
};

export const useModuleKey = () => {
    const [moduleKey, setModuleKey] = useState<string | undefined>(getModuleKey() || undefined);
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        if (refreshCount) {
            setModuleKey(getModuleKey() || undefined);
        }
    }, [refreshCount]);

    const internalUpdateModuleKey = (newModuleKey: string) => {
        updateModuleKey(newModuleKey);
        setRefreshCount(c => c + 1);
    };

    return {
        moduleKey,
        refreshCount,
        updateModuleKey: internalUpdateModuleKey,
    };
};