// This is the route for the root API response. We can return a "OK, I am alive response" for a heartbeat
// here but that's it. This is just for checking for health. That's it.

const DefaultServiceFactory = require('../services/DefaultServiceFactory');
const CharacterMatchup = require('./CharacterMatchup');

const REAL_CHARACTER_SERVICE = DefaultServiceFactory.createDefaultRealCharacterService();
const FAKE_CHARACTER_SERVICE = DefaultServiceFactory.createDefaultFakeCharacterService();

module.exports = ({ router }) => {
  router.get('/random', async (ctx, next) => {
    const realCharacterResponse = REAL_CHARACTER_SERVICE.getRandomCharacter();
    const fakeCharacterResponse = FAKE_CHARACTER_SERVICE.getRandomCharacter();

    // This is to do them in parallel
    const [realCharacter, fakeCharacter] = await Promise.all([
      realCharacterResponse,
      fakeCharacterResponse
    ]);

    const match = new CharacterMatchup(realCharacter, fakeCharacter);

    // Send the match to the user
    ctx.body = match.toJSON();
  });
};
