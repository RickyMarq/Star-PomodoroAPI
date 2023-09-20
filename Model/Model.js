const moongose = require('mongoose');

const motivotinalPhraseScheme = new moongose.Schema({
    phrase: String,
});

module.exports = moongose.model('motivotinalPhraseScheme', motivotinalPhraseScheme)

// Configuração necessária para criar os modelos no banco de dados do MongoDB.