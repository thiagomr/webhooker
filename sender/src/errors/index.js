export class MissingParamError extends Error {
    constructor(paramName) {
        super(`missing param: ${paramName}`);
        this.name = 'MissingParamError';
    }
}

export class InvalidParamError extends Error {
    constructor(paramName) {
        super(`invalid param: ${paramName}`);
        this.name = 'InvalidParamError';
    }
}
