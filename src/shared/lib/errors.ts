export class BasicError extends Error {
	constructor(message: string) {
		super(message)
		this.name = '[BASIC ERROR]:'
		this.message = message
	}
	public statusCode = 500
}

export class InActionsError extends BasicError {
	constructor(name: string, message: string) {
		super(message)
		this.name = `[${name} ACTIONS]:`
		this.message = message
	}
}

export class NotFoundError extends BasicError {
	constructor() {
		super('Not found')
		this.name = '[NOT FOUND]:'
	}
	public statusCode = 404
}

export class UnauthorizedError extends BasicError {
	constructor() {
		super('Unauthorized')
		this.name = '[UNAUTHORIZED]:'
	}
	public statusCode = 401
}

export class ForbiddenError extends BasicError {
	constructor() {
		super('Forbidden')
		this.name = '[FORBIDDEN]:'
	}
	public statusCode = 403
}

export class BadRequestError extends BasicError {
	constructor() {
		super('Bad request')
		this.name = '[BAD REQUEST]:'
	}
}

export class InternalServerError extends BasicError {
	constructor() {
		super('Internal server error')
		this.name = '[INTERNAL SERVER ERROR]:'
	}
	public statusCode = 500
}

export class PayloadError extends BasicError {
	constructor(message: string) {
		super(message)
		this.name = '[PAYLOAD ERROR]:'
		this.message = message
	}
	public statusCode = 500
}

export class PayloadNotFoundError extends BasicError {
	constructor() {
		super('Payload not found')
		this.name = '[PAYLOAD NOT FOUND]:'
	}
	public statusCode = 500
}

export class PayloadNotConfiguredError extends BasicError {
	constructor() {
		super('Payload not configured')
		this.name = '[PAYLOAD NOT CONFIGURED]:'
	}
	public statusCode = 500
}

export class InvalidCredentialsError extends BasicError {
	constructor() {
		super('Invalid credentials')
		this.name = '[INVALID CREDENTIALS]:'
	}
	public statusCode = 401
}

export class InvalidParametersError extends BasicError {
	constructor() {
		super('Invalid parameters')
		this.name = '[INVALID PARAMETERS]:'
	}
}
