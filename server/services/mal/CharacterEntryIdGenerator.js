const CharacterEntryId = require('./CharacterEntryId');

/**
 * Generates a character entry ID from some business rules, given some set of valid things.
 *
 * It mostly maintains a blacklist of IDs that is cannot use again to compare against.
 */
class CharacterEntryIdGenerator {
  constructor(restrictedEntrySet) {
    // This set will get mutated if something rejects the entry
    this.restrictedEntrySet = restrictedEntrySet;

    this.set = this._getOriginalSet();
  }

  getEntry() {
    const item = this.set[Math.floor(Math.random() * this.set.length)];
    return new CharacterEntryId(item);
  }

  _getOriginalSet() {
    const ORIGNAL_SET = [];
    const MAX_ID = 10000;

    for (let i = 0; i < MAX_ID; i++) {
      if (!this.restrictedEntrySet.has(i)) {
        ORIGNAL_SET.push(i);
      }
    }

    return ORIGNAL_SET;
  }
}

module.exports = CharacterEntryIdGenerator;
