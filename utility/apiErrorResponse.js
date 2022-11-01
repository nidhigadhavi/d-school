const HttpStatusCode = require("./httpStatusCode");
const BaseError = require("./error/baseError");

class Api404ErrorRes extends BaseError {
  constructor(
    name,
    statusCode = HttpStatusCode.NOTFOUND,
    isOperational = true,
    description = "Not Found"
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api400ErrorRes extends BaseError {
  constructor(
    name,
    statusCode = HttpStatusCode.BAD_REQUEST,
    isOperational = true,
    description = "Bad Request"
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api500ErrorRes extends BaseError {
  constructor(
    name,
    statusCode = HttpStatusCode.INTERNAL_ERROR,
    isOperational = true,
    description = "Internal Error"
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api401ErrorRes extends BaseError {
  constructor(
    name,
    statusCode = HttpStatusCode.UNAUTHORIZED,
    isOperational = true,
    description = "Unauthorized"
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = {
  Api401ErrorRes,
  Api400ErrorRes,
  Api404ErrorRes,
  Api500ErrorRes,
};
