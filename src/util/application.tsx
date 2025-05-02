import { useEffect, useState } from "react";

export const APPLICATION_PARAM_KEY = 'application';

const getApplicationKey = () => {
    return (new URLSearchParams(window.location.search)).get(APPLICATION_PARAM_KEY);
};

const updateApplicationKey = (newApplicationKey: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(APPLICATION_PARAM_KEY, newApplicationKey);
    window.location.href = newUrl.href;
};

export const useApplicationKey = () => {
    const [applicationKey, setApplicationKey] = useState<string | undefined>(getApplicationKey() || undefined);
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        if (refreshCount) {
            setApplicationKey(getApplicationKey() || undefined);
        }
    }, [refreshCount]);

    const internalUpdateApplicationKey = (newApplicationKey: string) => {
        updateApplicationKey(newApplicationKey);
        setRefreshCount(c => c + 1);
    };

    return {
        applicationKey,
        refreshCount,
        updateApplicationKey: internalUpdateApplicationKey,
    };
};
