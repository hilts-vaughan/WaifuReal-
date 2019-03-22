// Fake stuff
const JapaneseNameGenerator = require('./JapaneseNameGenerator');
const FakeWaifuService = require('./waifu/FakeWaifuService');

// MAL stuff
const MALCharacterService = require('./mal/MALCharacterService');
const CharacterEntryIdGenerator = require('./mal/CharacterEntryIdGenerator');

class DefaultServiceFactory {
  static createDefaultFakeCharacterService() {
    const SIMPLE_NAME_GENERATOR = new JapaneseNameGenerator();
    return new FakeWaifuService(SIMPLE_NAME_GENERATOR);
  }

  static createDefaultRealCharacterService() {
    const generator = new CharacterEntryIdGenerator(new Set());
    return new MALCharacterService(generator);
  }
}

module.exports = DefaultServiceFactory;
