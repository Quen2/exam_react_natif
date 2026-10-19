import "i18next";
import fr from "./locales/fr.json";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: {
            translation: typeof fr;
        };
    }
}
