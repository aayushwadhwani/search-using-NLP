class PreProcessing {
  text = "";

  constructor(text) {
    this.text = text;
  }

  remove_html() {
    this.text = this.text.replace(/<.*?>/g, "");
    return this.text;
  }

  remove_spaces() {
    const regex = /\s{1,}/g;
    this.text = this.text.replace(regex, " ").trim().split(" ");
    return this.text;
  }

  lowe_case() {
    let len = this.text.length;
    for (let i = 0; i < len; i++) {
      this.text[i] = this.text[i].toLowerCase();
    }
    return this.text;
  }

  stem() {
    let len = this.text.length;
    for(let i=0; i<len; i+=1) {
      this.text[i] = porterStemmer(this.text[i]);
    } 
  }
}
