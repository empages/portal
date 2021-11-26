export enum AuthenticationState {
    Login = 1,
    LoginWithTwoFactor = 2,
    LockedOut = 3,
    Authenticated = 4
}

export enum ApplicationInstanceType {
    Undefined = 0,
    Web = 1,
    Mobile = 2,
    Desktop = 3
}

export enum EmPageComponentType {
    Renderer = 1,
    Mutator = 2
}

export enum MultiChoiceType {
    Select = 1,
    CheckboxGroup = 2,
    RadioGroup = 3
}
