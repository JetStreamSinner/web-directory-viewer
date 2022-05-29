function RequestError(message, error_code) {
    this.name = "RequestError";
    this.message = message;
    this.stack = (new Error()).stack;
    this.code = error_code
}
RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;

module.exports = {
    "RequestError": RequestError
}