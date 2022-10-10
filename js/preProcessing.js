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
    this.text = this.text.replace(regex, " ").trim();
    return this.text;
  }

  remove_special_chars() {
    const regex = /[^A-Za-z0-9]+/g;
    this.text = this.text.replace(regex, " ").trim();
    return this.text;
  }

  word_tokens() {
    this.text = this.text.split(" ");
    return this.text;
  }

  lower_case() {
    let len = this.text.length;

    for (let i = 0; i < len; i++) {
      this.text[i] = this.text[i].toLowerCase().trim();
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
