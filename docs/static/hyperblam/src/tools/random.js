const random = {
  oneOf(array) {
    array = array || [0];
    return array[Math.floor(Math.random() * array.length)];
  },
  chance(fraction) {
    return Math.random() <= fraction;
  },
  floatBetween(min, max) {
    min = min > max ? max : min;
    max = max < min ? min : max;
    return (Math.random() * (max - min) + min);
  },
  integerBetween(min, max) {
    min = min > max ? max : min;
    max = max < min ? min : max;
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  },
  some(array) {
    let shuffled = this.shuffle(array);
    let amount = this.integerBetween(1, array.length);
    return shuffled.slice(0, amount);
  }
}

export { random }