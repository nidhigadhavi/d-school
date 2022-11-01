

class BaseError extends Error 
{
    constructor(name , statusCode , isOperatinal, description){
        super(description);
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name;
        this.statusCode = statusCode;
        this.description = description;
        this.isOperatinal = isOperatinal;
        Error.captureStackTrace(this) 
    }
}

module.exports = BaseError;