import {LinkModel} from "@/models/link-model";
import {HttpMethod} from "@/models/http-method";

export class ActionModel extends LinkModel {
    order: number;
    openOnSeparatePage: boolean;
    actionHttpMethod: HttpMethod;
    hasConfirmation: boolean;
    confirmationMessage: string;
}
