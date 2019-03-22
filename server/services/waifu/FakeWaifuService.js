const axios = require('axios');

const CharacterEntry = require('../CharacterEntry');

/**
 * Allows us to get fake waifus from the "This waifu does not exist" site and API
 * using some simple API calls.
 */
class FakeWaifuService {
  constructor(nameGenerator) {
    this.nameGenerator = nameGenerator;
  }

  async getRandomCharacter() {
    const MAX_OPTIONS = 5000;
    const optionIndex = Math.floor(Math.random() * MAX_OPTIONS);

    const characterInfo = await axios.get(
      `https://www.thiswaifudoesnotexist.net/snippet-${optionIndex}.txt`
    );

    return new CharacterEntry(
      `https://www.thiswaifudoesnotexist.net/example-${optionIndex}.jpg`,
      this.nameGenerator.getName(),
      characterInfo.data
    );
  }
}

module.exports = FakeWaifuService;
