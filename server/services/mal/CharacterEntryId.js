class CharacterEntryId {
  constructor(id) {
    this._id = id;
  }

  getOrdinal() {
    return this._id;
  }
}

module.exports = CharacterEntryId;
