export class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string = "Requisição inválida") {
        super(400, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = "Recurso não encontrado") {
        super(404, message);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string = "Não autorizado") {
        super(401, message);
    }
}

export class InternalServerError extends ApiError {
    constructor(message: string = "Erro interno do servidor") {
        super(500, message);
    }
}