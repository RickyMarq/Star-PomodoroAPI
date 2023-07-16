const moongose = require('mongoose');

const unmotivotionalPhraseScheme = new moongose.Schema({
    phrase: String,
});

module.exports = moongose.model('unmotivotionalPhraseScheme', unmotivotionalPhraseScheme)