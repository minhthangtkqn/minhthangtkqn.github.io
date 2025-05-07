export type PanelRegistry = {
    Component: React.ComponentType;
};

export class Module {
    private panelRegistry: Record<string, PanelRegistry> = {};
    private moduleKey: string;

    constructor(moduleKey: string) {
        this.moduleKey = moduleKey;
    }

    setupPanel(payload: { panelKey: string, PanelComponent: React.ComponentType; }) {
        const {
            panelKey,
            PanelComponent,
        } = payload;

        this.panelRegistry[panelKey] = {
            Component: PanelComponent,
        };
    }

    getPanel(panelKey: string) {
        return this.panelRegistry[panelKey];
    }
}

export class ModuleManager {
    private static moduleManager: ModuleManager;
    private moduleRegistry: Record<string, Module> = {};

    public static getModuleManager(): ModuleManager {
        if (!ModuleManager.moduleManager) {
            ModuleManager.moduleManager = new ModuleManager();
        }
        return ModuleManager.moduleManager;
    }

    setupModule(moduleKey: string, moduleInstance: Module) {
        this.moduleRegistry[moduleKey] = moduleInstance;
    }

    getModule(moduleKey: string): Module | undefined {
        return this.moduleRegistry[moduleKey];
    }
}
