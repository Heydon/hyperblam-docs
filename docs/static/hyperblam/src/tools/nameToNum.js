const noteNums = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const noteMods = { 'b': -1, '#': 1 };
  
  const nameToNum = name => {
    if (!!Number(name)) {
      return name;
    }

    // ↓ Get letter
    let letter = name[0];
    let pc = noteNums[letter.toUpperCase()];
  
    // ↓ Modify
    let mod = name[1];
    let trans = noteMods[mod] || 0;
    pc += trans;
  
    let num = Array.from(name).pop();
    let octave;
    if (isNaN(num)) {
      octave = 4;
    } else {
      octave = parseInt(num);
    }  
  
    return pc + (12 * (octave + 1));
  }

  export { nameToNum }