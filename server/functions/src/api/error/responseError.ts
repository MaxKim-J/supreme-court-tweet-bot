export abstract class ResponseError extends Error {
    statusCode: number;

    protected constructor(message?: string) {
        super(message)
    }
}

export class NotFound extends ResponseError {
    constructor(message: string = '리소스가 존재하지 않습니다.') {
        super(message)
        this.statusCode = 404
    }
}
