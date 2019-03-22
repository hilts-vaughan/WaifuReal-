const generate = require('japanese-name-generator');

class JapaneseNameGenerator {
  constructor(gender = 'female') {
    if (gender !== 'male' && gender !== 'female') {
      throw new Error('You must provide some kind of gender');
    }

    this.gender = gender;
  }

  getName() {
    return generate({ gender: this.gender }).name;
  }
}

module.exports = JapaneseNameGenerator;
