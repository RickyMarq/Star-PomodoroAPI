console.log("Hello World");
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
module.exports = app;
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server rodando http://localhost:${port}`));

app.use(cors({
    origin: '*'
  }
));

const DB_User = 'henriquefmcosta755'
const DB_PASSWORD = encodeURIComponent('AZZDGMhYcIcpV8SBB')

mongoose.connect(`mongodb+srv://henriquefmcosta75:${DB_PASSWORD}@databasestarpomodoro.9gmw0cy.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true},)
    .then(() => console.log("Connected to MongoDb"))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const motivationalScheme = require('./Model/Model');
const unmotivotionalScheme = require('./Model/Unmotivotinal');
const motivotionalJSON = require('./JSON/Motivotional.json');
const unmotivadedJSON = require('./JSON/Unmotivaded.json');
const phrasesUnMo = JSON.parse(fs.readFileSync('./JSON/Unmotivaded.json'));

// Retorna um json com todas as frases motivacionais.

app.get("/getmotivotionalphrase", async (req, res) => {
    const data = await motivationalScheme.find({})
    res.send({phrase: data})
});

// Retorna um json com 1 frase motivacional aleatória.

app.get("/getmotivotionalrandomphrase", async (req, res) => {
    try {
    const count = await motivationalScheme.countDocuments();
    const getRandomIndex = Math.floor(Math.random() * count);
    
    const randomPhrase = await motivationalScheme.aggregate([
        { $skip: getRandomIndex },
        { $limit: 1 },
    ]);
    res.status(200).json({ phrase: randomPhrase[0].phrase, author: randomPhrase[0].author});
    } catch {
        res.status(500)
    }
});

// Retorna um json com 1 frase desmotivacional aleatória.

app.get("/getunmotivotionalrandomphrase", async (req, res) => {
    try {
    const count = await unmotivotionalScheme.countDocuments();
    const getRandomIndex = Math.floor(Math.random() * count);
    
    const randomPhrase = await unmotivotionalScheme.aggregate([
        { $skip: getRandomIndex },
        { $limit: 1 },
    ]);
    res.status(200).json({ phrase: randomPhrase[0].phrase, author: randomPhrase[0].author});
    } catch {
        res.status(500)
    }
});

// Adiciona o JSON na Database.

app.get("/addMotivotionalPhrasesToDatabase", (req, res) => {
    try {
        motivationalScheme.create(motivotionalJSON)
        res.send("<h1> O conteúdo do JSON foi adicionando no Banco de dados </h1>")
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500).send(error.message)
    }
});

app.get("/addUnmotivotionalPhrasesToDatabase", (req, res) => {
    try {
        unmotivotionalScheme.create(unmotivadedJSON)
        res.send("<h1> O conteúdo do JSON foi adicionando no Banco de dados </h1>")
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500).send(error.message)
    }
});
