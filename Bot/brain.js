// import the axio module to handle api calls
const axios = require('axios');

// simulates environment variables
const {
    getApiKey
} = require('./environment.js');

// import the openai modules
const {
    Configuration,
    OpenAIApi
} = require('openai');

// instantiate api configuration
const config = new Configuration({
    apiKey: getApiKey()
});

// instantiate openai api
const openai = new OpenAIApi(config);

// Generates and returns the image url
async function GetImage(prompt) {
    response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
    }).catch((err) => {
        console.log(err);
    });
    return response.data.data[0].url;
}

async function GetMotivation() {
    var URL = "https://type.fit/api/quotes"
    var url = "https://api.quotable.io/random"; // random quote
    const response = await axios.get(url);
    const data = await response.data.content;
    console.log(data);
    return data;
}


async function GetDefinition(word) {
    console.log("getting definition");
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const response = await axios.get(url);
    const data = await response.data[0].meanings;

    var definitions = '';
    for (var i = 0; i < data.length; i++) {
        definitions += data[i].partOfSpeech.toUpperCase() + '\n';
        for (var j = 0; j < data[i].definitions.length; j++) {
            definitions += data[i].definitions[j].definition + '\n';
        }
    }
    return (definitions);
}

async function GetSynonym(word) {
    console.log("getting synonyms");
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const response = await axios.get(url);
    const data = await response.data[0].meanings;

    var synonyms = '';
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].definitions.length; j++) {
            for (var k = 0; k < data[i].definitions[j].synonyms.length; k++)
                synonyms += data[i].definitions[j].synonyms[k] + '\n';
        }
    }
    console.log(synonyms);
    return (synonyms);
}

async function GetAntonym(word) {
    console.log("getting antonyms");
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const response = await axios.get(url);
    const data = await response.data[0].meanings;

    var antonyms = '';
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].definitions.length; j++) {
            for (var k = 0; k < data[i].definitions[j].antonyms.length; k++)
                antonyms += data[i].definitions[j].antonyms[k] + '\n';
        }
    }
    console.log(antonyms);
    return (antonyms);
}

async function GetTextPhonetics(word) {
    console.log("getting antonyms");
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const response = await axios.get(url);
    const data = await response.data[0].phonetics;

    var phonetics = '';
    for (var i = 0; i < data.length; i++) {
        phonetics += data[i].text + '\n';
    }

    console.log(phonetics);
    return (phonetics);
}

async function GetAudioPhonetics(word) {
    console.log("getting antonyms");
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const response = await axios.get(url);
    const data = await response.data[0].phonetics;
    var phonetics = [];
    for (var i = 0; i < data.length; i++) {
        phonetics.push(data[i].audio);
    }
    return (phonetics);
}

async function GetTranslation(word) {
    return 0;
}

module.exports = {
    GetImage,
    GetDefinition,
    GetMotivation,
    GetSynonym,
    GetAntonym,
    GetTextPhonetics,
    GetAudioPhonetics,
};

// console.log(GetAudioPhonetics('precarious'));