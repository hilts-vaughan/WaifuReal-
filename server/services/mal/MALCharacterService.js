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
    const entry = this.characterEntryGenerator.getEntry();
    const response = await axios.get(
      `https://api.jikan.moe/v3/character/${entry.getOrdinal()}/`
    );

    const characterDto = new JikaCharacterDto(response.data);

    return new CharacterEntry(
      characterDto.getImageUrl(),
      characterDto.getName(),
      characterDto.getBio()
    );
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
