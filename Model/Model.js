const moongose = require('mongoose');

const motivotinalPhraseScheme = new moongose.Schema({
    phrase: String,
});

module.exports = moongose.model('motivotinalPhraseScheme', motivotinalPhraseScheme)