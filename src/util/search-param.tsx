import { createContext, useContext, useState } from "react";

type SearchParamContextType = {
    params: URLSearchParams;
    updateSearchParams: (callback: (prevUrlSearchParams: URLSearchParams) => URLSearchParams) => void;
};

export const SearchParamContext = createContext<SearchParamContextType | undefined>(undefined);

export const SearchParamProvider = ({ children }: { children?: React.ReactNode; }) => {
    const [searchParams, setSearchParams] = useState(window.location.search);

    const updateSearchParams = (callback: (prevUrlSearchParams: URLSearchParams) => URLSearchParams) => {
        const nextUrlSearchParam = callback(new URLSearchParams(searchParams));
        setSearchParams(nextUrlSearchParam.toString());
        history.pushState(null, '', window.location.origin + window.location.pathname + '?' + nextUrlSearchParam.toString());
    };

    return <SearchParamContext.Provider
        value={{
            params: new URLSearchParams(searchParams),
            updateSearchParams,
        }}
    >{children}</SearchParamContext.Provider>;
};

export const useSearchParams = () => {
    const context = useContext(SearchParamContext);
    if (!context) {
        throw new Error('useSearchParams must be used within a SearchParamsProvider');
    }
    return context;
};
