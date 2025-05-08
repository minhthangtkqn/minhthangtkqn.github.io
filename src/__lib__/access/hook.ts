import { useEffect, useState } from "react";
import { CentralRequestor } from "@/__lib__/access";

export const useRequest = <Data = any>(
    url?: string,
    callback?: {
        onCompleted?: () => void;
        onFailed?: (error: unknown) => void;
        onSuccess?: (data: Data) => void;
    },
) => {
    const [idling, setIdling] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data>();
    const [error, setError] = useState<unknown>();
    const [queryCount, refreshQuery] = useState(0);

    const {
        onCompleted,
        onFailed,
        onSuccess,
    } = callback ?? {};

    useEffect(() => {
        let relevant = true;

        if (url) {
            (async () => {
                try {
                    setLoading(true);
                    const response = await CentralRequestor.get(url);
                    if (relevant) {
                        setData(response.data);
                        onSuccess?.(response.data);
                    }
                } catch (error) {
                    if (relevant) {
                        setError(error);
                        onFailed?.(error);
                    }
                } finally {
                    setLoading(false);
                    setIdling(false);
                    if (relevant) {
                        onCompleted?.();
                    }
                }
            })();
        }

        return () => {
            relevant = false;
        };
    }, [url, queryCount]);

    return {
        data,
        loading,
        idling,
        error,
        queryCount,
        refresh: () => refreshQuery(c => c + 1),
    };
};
