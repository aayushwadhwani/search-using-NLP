class TfIdf {
  indexes = [];
  text = "";

  constructor(indexes, text) {
    this.indexes = indexes;
    this.text = text.toLowerCase();
  }

  tf() {
    let tf_scores = {};
    for (let i = 0; i < this.indexes.length; i++) {
      tf_scores[this.indexes[i].id] = 0;
    }
    for (let i = 0; i < this.indexes.length; i++) {
      let tokens = this.indexes[i].tokens;
      for (let j = 0; j < tokens.length; j++) {
        if (tokens[j] === this.text) {
          tf_scores[this.indexes[i].id]++;
        }
      }
      tf_scores[this.indexes[i].id] /= tokens.length;
    }

    return tf_scores;
  }

  idf() {
    let N = this.indexes.length;
    let text_in = 0;
    for (let i = 0; i < N; i++) {
      if (this.indexes[i].tokens.includes(this.text)) {
        text_in++;
      }
    }
    if (text_in === 0) return 0;
    let idf_score = N / text_in;
    return Math.log10(idf_score);
  }
}
