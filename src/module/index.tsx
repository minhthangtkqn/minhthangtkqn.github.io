import { FocusModule, FocusModuleInfo } from "./focus";
import { FlashcardModule, FlashcardModuleInfo } from "./flashcard";
import { Route, Routes } from "react-router-dom";

export const BaseApplication = () => {
    return <Routes>
        <Route path="/" element={<FocusModule />} />
        <Route path={FocusModuleInfo.name} element={<FocusModule />} />
        <Route path={FlashcardModuleInfo.name} element={<FlashcardModule />} />
    </Routes>;
};

export const ModuleInfo = {
    FocusModuleInfo,
    FlashcardModuleInfo,
};
