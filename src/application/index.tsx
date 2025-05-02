import { FocusApp, FocusAppInfo } from "./focus";
import { FlashcardApp, FlashcardAppInfo } from "./flashcard";
// import { Route, Routes } from "react-router-dom";
import { useApplicationKey } from "@/util";

export const BaseApplication = () => {
    const { applicationKey = FocusAppInfo.name } = useApplicationKey();

    switch (applicationKey) {
        case FocusAppInfo.name:
            return <FocusApp />;
        case FlashcardAppInfo.name:
            return <FlashcardApp />;
        default:
            return <FocusApp />;
    }
    // return <Routes>
    //     <Route path="/" element={<FocusApp />} />
    //     <Route path={FocusAppInfo.name} element={<FocusApp />} />
    //     <Route path={FlashcardAppInfo.name} element={<FlashcardApp />} />
    // </Routes>;
};

export const ApplicationInfo = {
    FocusAppInfo,
    FlashcardAppInfo,
};
