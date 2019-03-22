const axios = require('axios');

const CharacterEntry = require('../CharacterEntry');

/**
 * This service is going to pull character entries from MAL. These are real characters, from real shows.
 * There is no encoding here needed because of that.
 */
class MALCharacterService {
  constructor(characterEntryGenerator) {
    this.characterEntryGenerator = characterEntryGenerator;
  }

  async getRandomCharacter() {
    let iterationsRemaining = 5;

    while (iterationsRemaining > 0) {
      const entry = this.characterEntryGenerator.getEntry();
      const response = await axios.get(
        `https://api.jikan.moe/v3/character/${entry.getOrdinal()}/`
      );

      // The entry we get back might not have the gender we want
      const characterDto = new JikaCharacterDto(response.data);

      // We give up in case something is wrong and we have to
      if (this.isSuitableEntry(characterDto) || iterationsRemaining === 1) {
        return new CharacterEntry(
          characterDto.getImageUrl(),
          characterDto.getName(),
          characterDto.getBio()
        );
      }

      iterationsRemaining--;
    }
  }

  isSuitableEntry(characterDto) {
    const bio = characterDto.getBio().toLowerCase();

    // Do something dumb and just check for female pronouns
    const PRONOUNS = ['she', 'her', 'hers'];

    return PRONOUNS.some(pronoun => {
      return bio.indexOf(pronoun) > -1;
    });
  }
}

class JikaCharacterDto {
  constructor(json) {
    this.json = json;
  }

  getName() {
    return this.json.name;
  }

  getBio() {
    return this.json.about;
  }

  getImageUrl() {
    return this.json.image_url;
  }
}

module.exports = MALCharacterService;
