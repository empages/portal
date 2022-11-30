// Enumerations

export enum PageActionType {
    Redirection = 1,
    Command = 2,
}

export enum ComponentType {
    Renderer = 1,
    Mutator = 2,
}

export enum MultiChoiceType {
    Select = 1,
    CheckboxGroup = 2,
    RadioGroup = 3,
}

enum TypeGroup {
    Texts = 1,
    Numbers = 2,
    Booleans = 3,
    DateTimes = 4,
    Enumerations = 5,
    Arrays = 6,
}

// Classes

export abstract class EmResponseModel {
    pageType: string;
    title: string;
    components: EmResponseComponent[];
    actions: EmResponseAction[];
    typeDescriptions: EmTypeDescription[];
}

export class EmTypeDescription {
    typeId: string;
    items: EmTypeDescriptionItem[];
}

export class EmTypeDescriptionItem {
    value: any;
    name: string;
}

export class EmTableResponseModel extends EmResponseModel {
    header: EmTableResponseHeader;
    rows: EmTableResponseRow[];
}

export class EmTableResponseHeader {
    cells: EmTableResponseHeaderCell[];
}

export class EmTableResponseHeaderCell {
    index: number;
    title: string;
}

export class EmTableResponseRow {
    index: number;
    cells: EmTableResponseCell[];
    actions: EmResponseAction[];
}

export class EmTableResponseCell {
    index: number;
    value: any;
}

export class EmDetailsResponseModel extends EmResponseModel {
    fields: EmDetailsResponseField[];
}

export class EmDetailsResponseField {
    index: number;
    label: string;
    value: any;
}

export class EmFormResponseModel extends EmResponseModel {
    inputs: EmFormResponseInput[];
}

export class EmFormResponseInput {
    index: number;
    label: string;
    value: any;
    required: boolean;
}

export class EmResponseAction {
    title: string;
    target: string;
    order: number;
    type: PageActionType;
    requiresConfirmation: boolean;
}

export class EmResponseComponent {
    index: number;
    sourceName: string;
    type: ComponentType;
    isNullable: boolean;
    parameters: any;
    propertyTypeGroup: TypeGroup;
}

export class EmPageCommandResult {
    message: string;
    succeeded: boolean;
    redirectUrl: string;
}
