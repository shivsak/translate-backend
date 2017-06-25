var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const translate = require('google-translate-api');
const errorHandler = require('./src/errorHandler');
const logger = require('./src/logger');

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/languages', function(request, response) {
    var languages = translate.languages;
    response.json(languages)
});

app.post('/translate/:to_lang', function (req, resp) {
    var toLang = req.params.to_lang;
    if (req.body.hasOwnProperty('text') && req.body.text.length > 0) {
        var text = req.body.text;
        translate(text, {to: toLang})
            .then(
                function (res) {
                    //successFn
                    resp.json({
                        "status": "success",
                        "result": res.text
                    });
                }, function (err) {
                    // failureFn
                    logger.logError(err, "Unable to translate text");
                    resp.status(400).json(errorHandler.getErrorJson("Unable to translate your text", err));
                });

    }
    else {
        resp.status(400).json(errorHandler.getErrorJson("Must pass in some text to translate!", null));
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
