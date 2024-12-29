import { useEffect } from 'react';
import { QueryApi } from "@/access";
import { useRequest } from "@/util";

export const FlashcardListPanel = () => {
    const {
        data,
        error,
        loading,
        queryCount,
        refresh,
    } = useRequest(QueryApi.People.list());

    return (
        <div>
            FlashcardCategoryListPanel
        </div>
    );
};
