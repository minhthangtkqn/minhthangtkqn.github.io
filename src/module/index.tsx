import { FocusModule, FocusModuleInfo } from "./focus";
import { FlashcardModule, FlashcardModuleInfo } from "./flashcard";
// import { Route, Routes } from "react-router-dom";
import { useModuleKey } from "@/util";

export const BaseApplication = () => {
    const { moduleKey = FocusModuleInfo.name } = useModuleKey();

    switch (moduleKey) {
        case FocusModuleInfo.name:
            return <FocusModule />;
        case FlashcardModuleInfo.name:
            return <FlashcardModule />;
        default:
            return <FocusModule />;
    }
    // return <Routes>
    //     <Route path="/" element={<FocusModule />} />
    //     <Route path={FocusModuleInfo.name} element={<FocusModule />} />
    //     <Route path={FlashcardModuleInfo.name} element={<FlashcardModule />} />
    // </Routes>;
};

export const ModuleInfo = {
    FocusModuleInfo,
    FlashcardModuleInfo,
};
