# wbot
 A whatsapp bot powered by OpenAI's DALL-E AI model. Also uses two external APIs. 
 1. https://api.quotable.io/random for generating random motivational quotes.
 2. https://api.dictionaryapi.dev/api/v2/entries/en/word for getting definitions, synonyms, antonyms, phonetics etc... 

Instructions
1. Git  clone
2. npm install

ENDPOINTS
a. Generate images
To generate an images, describe a scene and precede it with a #
```#a roaring lion```

b. Get word definition
To get the defintion of a word, precede it with @
```@family```

c. Get text phonetics
To know the text phonetics of a word, precede it with &
```&family```

d. Get audio phonetic
To get the audio phonetic of a word, precede it with |
```|family```

e. Get Synonyms
To get the synonyms of a word, precede it with = 
```=boy```

f. Get anthonym
To fet the antonyms of a word, precede it with -
```-great```

g. Get motivatioal Quote
To get a motivational quote, send ! only
```!```


