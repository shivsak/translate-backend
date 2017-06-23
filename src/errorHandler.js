// error.js

var errorHandler = {
    getErrorJson: function (message, error) {
        return {
            status: "failed",
            message: message,
            error: error
        };
    }
}

module.exports = errorHandler;
