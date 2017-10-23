class WordBag {
  constructor() {
    this.WordArr = [""];
    this.WordDict = { "": 0 };

    this.Add = this.Add.bind(this)
    this.WordToNum = this.WordToNum.bind(this)
    this.NumToWord = this.NumToWord.bind(this)
  }

  Add(word) {
    this.WordArr.push(word);
    this.WordDict[word] = this.WordArr.length - 1;
  }

  WordToNum(word) {
    if (this.WordDict[word] == undefined) {
      this.Add(word)
    }
    return this.WordDict[word];
  }

  NumToWord(Num) {
    return this.WordArr[Num];
  }

  Size() {
    return this.WordArr.length;
  }
}

const globalBag = new WordBag();

export default globalBag;