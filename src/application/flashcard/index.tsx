import { DetailedLayout, LayoutPanelSlot, ModuleManager, ModuleParamKey, PanelRegistry } from "@/__lib__/layout";
import styled from "styled-components";
import { useSearchParams } from "@/util";
import { useEffect, useState } from "react";
import { FlashcardListingModuleInfo, setupFlashcardListingModule, FlashcardListPanelInfo, FlashcardDetailPanelInfo } from "./module";

const StyledFlashcardAppLayout = styled(DetailedLayout)`
    .primary {
        overflow-x: hidden;
    }
`;

export const FlashcardAppInfo = {
    name: 'flashcard' as const,
};

export const FlashcardApp = () => {
    const { params, updateSearchParams } = useSearchParams();
    const moduleKey = params.get(ModuleParamKey) ?? '';
    const primaryPanelKey = params.get(LayoutPanelSlot.PRIMARY) ?? '';
    const secondaryPanelKey = params.get(LayoutPanelSlot.SECONDARY) ?? '';
    const extensionPanelKey = params.get(LayoutPanelSlot.EXTENSION) ?? '';

    const [primaryPanel, setPrimaryPanel] = useState<PanelRegistry>();
    const [secondaryPanel, setSecondaryPanel] = useState<PanelRegistry>();
    const [extensionPanel, setExtensionPanel] = useState<PanelRegistry>();

    const initiateApp = () => {
        const moduleManager = ModuleManager.getModuleManager();
        // import & setup modules & panels
        moduleManager.setupModule(FlashcardListingModuleInfo.name, setupFlashcardListingModule());

        // mapping module & panel key to get Component for displaying
        const moduleRegistry = moduleManager.getModule(moduleKey);
        setPrimaryPanel(moduleRegistry?.getPanel(primaryPanelKey));
        setSecondaryPanel(moduleRegistry?.getPanel(secondaryPanelKey));
        setExtensionPanel(moduleRegistry?.getPanel(extensionPanelKey));
        console.log(
            '🚀 ~ useEffect ~ Did_Mount:',
            '\n ~ primaryPanel: ', primaryPanel,
            '\n ~ secondaryPanel: ', secondaryPanel,
            '\n ~ extensionPanel: ', extensionPanel,
        );
    };

    // cần đảm bảo các module được setup vào ModuleManager ngay từ đầu để lượt render đầu tiên có thể truy cập danh sách module & panel
    useEffect(() => {
        initiateApp();
    }, []);

    if (!moduleKey) {
        // missing module => redirect to default route
        updateSearchParams(prev => {
            prev.set(ModuleParamKey, FlashcardListingModuleInfo.name);
            prev.set(LayoutPanelSlot.PRIMARY, FlashcardListPanelInfo.name);
            prev.set(LayoutPanelSlot.SECONDARY, FlashcardDetailPanelInfo.name);
            prev.delete(LayoutPanelSlot.EXTENSION);
            return prev;
        });
    }

    /**
     * @todo chỉ làm tạm thời để redirect nhằm hiển thị UI phù hợp
     * Sau này sẽ setup default route riêng cho từng module, đảm bảo không if else phức tạp
     */
    if (!primaryPanelKey && !secondaryPanelKey && !extensionPanelKey) {
        // missing all panel => redirect to default route
        updateSearchParams(prev => {
            prev.set(LayoutPanelSlot.PRIMARY, FlashcardListPanelInfo.name);
            prev.set(LayoutPanelSlot.SECONDARY, FlashcardDetailPanelInfo.name);
            prev.delete(LayoutPanelSlot.EXTENSION);
            return prev;
        });
    }

    return (
        <StyledFlashcardAppLayout
            // PrimaryComponent={FlashcardListPanel}
            // SecondaryComponent={FlashcardDetailPanel}
            PrimaryComponent={primaryPanel?.Component}
            SecondaryComponent={secondaryPanel?.Component}
            ExtensionComponent={extensionPanel?.Component}
        />
    );
};
