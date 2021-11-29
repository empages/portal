
export class EmPageFormSubmissionResponse {
    mutatedModelId: string;
    succeeded: boolean;
    validationErrors: { [property: string] : Array<string> };
    operationError: string;
}
