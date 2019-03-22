const BASE_64_VERIFY = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/g;

class CharacterEntry {
  constructor(imageAsBase64String, characterName, characterBio) {
    this.imageAsBase64String = imageAsBase64String;
    this.characterBio = characterBio;
    this.characterName = characterName;
  }

  getCharacterName() {
    return this.characterName;
  }

  getCharacterBio() {
    return this.characterBio;
  }

  getImageAsBase64String() {
    return this.imageAsBase64String;
  }
}

module.exports = CharacterEntry;
