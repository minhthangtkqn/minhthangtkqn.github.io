import { useEffect, useState } from "react";
import { CentralRequestor } from "@/__lib__/access";

export const useRequest = <Data = any>(url?: string) => {
    const [idling, setIdling] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data>();
    const [error, setError] = useState<unknown>();
    const [queryCount, refreshQuery] = useState(0);

    useEffect(() => {
        let relevant = true;

        if (url) {
            (async () => {
                try {
                    setLoading(true);
                    const response = await CentralRequestor.get(url);
                    if (relevant) {
                        setData(response.data);
                    }
                } catch (error) {
                    if (relevant) {
                        setError(error);
                    }
                } finally {
                    setLoading(false);
                    setIdling(false);
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