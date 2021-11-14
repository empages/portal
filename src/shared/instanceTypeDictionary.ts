import {ApplicationInstanceType} from "@/shared/enums";

export const getTypeColor = function (type: ApplicationInstanceType): string {
    switch (type) {
        case ApplicationInstanceType.Undefined:
            return 'bg-custom-unspecified';
        case ApplicationInstanceType.Web:
            return 'bg-custom-web';
        case ApplicationInstanceType.Mobile:
            return 'bg-custom-mobile';
        case ApplicationInstanceType.Desktop:
            return 'bg-custom-desktop';
        default:
            return '';
    }
};

export const getTypeIcon = function (type: ApplicationInstanceType): string {
    switch (type) {
        case ApplicationInstanceType.Undefined:
            return 'mdi mdi-progress-question';
        case ApplicationInstanceType.Web:
            return 'mdi mdi-web';
        case ApplicationInstanceType.Mobile:
            return 'mdi mdi-cellphone';
        case ApplicationInstanceType.Desktop:
            return 'mdi mdi-desktop-mac';
        default:
            return '';
    }
};

export const getTypeText = function (type: ApplicationInstanceType): string {
    switch (type) {
        case ApplicationInstanceType.Undefined:
            return 'Unspecified';
        case ApplicationInstanceType.Web:
            return 'Web';
        case ApplicationInstanceType.Mobile:
            return 'Mobile';
        case ApplicationInstanceType.Desktop:
            return 'Desktop';
        default:
            return '';
    }
};
