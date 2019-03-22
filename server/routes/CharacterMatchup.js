class CharacterMatchup {
  constructor(realCharacter, fakeCharacter) {
    this.realCharacter = realCharacter;
    this.fakeCharacter = fakeCharacter;

    if (!this.realCharacter || !this.fakeCharacter) {
      throw new Error('Real character and fake character are required fields');
    }
  }

  toJSON() {
    return {
      realCharacter: this.realCharacter,
      fakeCharacter: this.fakeCharacter
    };
  }
}

module.exports = CharacterMatchup;
