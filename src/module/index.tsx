import { FocusModule, FocusModuleInfo } from "./focus";
import { FlashcardModule, FlashcardModuleInfo } from "./flashcard";
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
};

export const ModuleInfo = {
    FocusModuleInfo,
    FlashcardModuleInfo,
};
