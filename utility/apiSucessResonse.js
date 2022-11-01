const BaseError = require("./error/baseError");
const HttpStatusCode = require("./httpStatusCode");

class ApiSuccessResponse extends BaseError {
  constructor(name, status, data) {
    super(this);
    this.name = name;
    this.status = HttpStatusCode.OK;
    this.data = data;
  }
}

module.exports = ApiSuccessResponse;
