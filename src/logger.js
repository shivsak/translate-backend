var colors = require('colors/safe');

var logger = {
    logError: function (errorResponse, errorMessage) {
        console.log('\n\n\n****** START LOGGING ERROR *****');
        console.log(colors.red('[ERROR]: ' + errorMessage));
        if (errorResponse) {
            if (errorResponse.hasOwnProperty('statusCode')) console.log(colors.red('[ERROR]: ' + errorResponse.statusCode + ' Error'));
            if (errorResponse.hasOwnProperty('body')) console.log('[ERROR]: ' + errorResponse.body);
        }
        console.log(errorResponse);
        console.log('****** END LOGGING ERROR *****\n\n\n');
    },

    logInfo: function(infoMessage) {
        console.log(colors.blue('[INFO]: ' + infoMessage));
    }

};


module.exports = logger;