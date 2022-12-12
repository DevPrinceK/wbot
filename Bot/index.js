// QR Code Generator
const qrcode = require('qrcode-terminal');
const {
    GetImage,
    GetDefinition,
    GetTextPhonetics,
    GetAudioPhonetics,
    GetMotivation,
    GetSynonym,
    GetAntonym,
    GetTranslation
} = require('./brain.js');

const {
    Client,
    LocalAuth,
    MessageMedia
} = require('whatsapp-web.js'); //noqa

// instantiating the client and setting the auth strategy to local auth
const client = new Client({
    authStrategy: new LocalAuth()
});

// GENERATE QR CODE
client.on('qr', (qr) => {
    qrcode.generate(qr, {
        small: true
    });
});

// CLIENT IS READY TO USE
client.on('ready', () => {
    console.log('Client is ready!');
});


// SENDING MESSAGES
client.on('message', async message => {
    // check of message is a status upate
    if (message.isStatus === false) {
        console.log(message.body);
        if (message.body.startsWith('#')) {
            const prompt = message.body.slice(1).trim();
            console.log("prompt: " + prompt);
            const url = await GetImage(prompt).catch((err) => console.log(err));
            console.log("sending image");
            const imgFile = await MessageMedia.fromUrl(url);
            message.reply(imgFile);
            console.log("image sent");
        }
        // word definitions: query starts with @
        else if (message.body.startsWith('@')) {
            const word = message.body.slice(1).trim();
            console.log("word: " + word);
            const definition = await GetDefinition(word).catch((err) => console.log(err));
            console.log("sending definition");
            message.reply(definition);
            console.log("definition sent");
        }
        // get motivation: query starts with !
        else if (message.body.startsWith('!')) {
            const motivation = await GetMotivation().catch((err) => console.log(err));
            console.log("sending motivation");
            message.reply(motivation);
            console.log("motivation sent");
        }
        // get synonym: query starts with =
        else if (message.body.startsWith('=')) {
            const word = message.body.slice(1).trim();
            console.log("word: " + word);
            const synonym = await GetSynonym(word).catch((err) => console.log(err));
            console.log("sending synonym");
            message.reply(synonym);
            console.log("synonym sent");
        }
        // get antonym: query starts with -
        else if (message.body.startsWith('-')) {
            const word = message.body.slice(1).trim();
            console.log("word: " + word);
            const antonym = await GetAntonym(word).catch((err) => console.log(err));
            console.log("sending antonym");
            message.reply(antonym);
            console.log("antonym sent");
        }
        // get text phonetics: query starts with &
        else if (message.body.startsWith('&')) {
            const word = message.body.slice(1).trim();
            console.log("word: " + word);
            const phonetics = await GetTextPhonetics(word).catch((err) => console.log(err));
            console.log("sending phonetics");
            message.reply(phonetics);
            console.log("phonetics sent");
        }
        // get audio pronunciation: query starts with |
        else if (message.body.startsWith('|')) {
            const word = message.body.slice(1).trim();
            console.log("word: " + word);
            const audios = await GetAudioPhonetics(word).catch((err) => console.log(err));
            console.log("sending audio");
            for (audio of audios) {
                if (audio == '') {
                    continue;
                } else {
                    const audioFile = await MessageMedia.fromUrl(audio);
                    message.reply(audioFile);
                }
            }
            console.log("audios sent");
        }

    }
});


client.initialize();