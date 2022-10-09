class Bm25 {
  indexes = [];
  text = "";

  constructor(indexes, text) {
    this.indexes = indexes;
    this.text = text.toLowerCase();
  }

  tf() {
    let tf_scores = {};
    let total_tokens_length = 0;
    for (let i = 0; i < this.indexes.length; i++) {
      tf_scores[this.indexes[i].id] = 0;
      total_tokens_length += this.indexes[i].tokens.length;
    }

    for (let i = 0; i < this.indexes.length; i++) {
      let tokens = this.indexes[i].tokens;
      for (let j = 0; j < tokens.length; j++) {
        if (tokens[j] === this.text) {
          tf_scores[this.indexes[i].id]++;
        }
      }
      tf_scores[this.indexes[i].id] *= (1 + 1.25);
      let avg_length = tokens.length / total_tokens_length;
      let den = tokens.length + (1.25 * (1 - 0.75 + (0.75 * avg_length)));
      tf_scores[this.indexes[i].id] /= den;
    }

    return tf_scores;
  }

  idf() {
    let text_in = 0;
    let N = this.indexes.length;
    for (let i = 0; i < N; i++) {
      if (this.indexes[i].tokens.includes(this.text)) {
        text_in++;
      }
    }
    let num = this.indexes.length - text_in + 0.5;
    let den = this.indexes.length + 0.5
    let ans = Math.log10((num/den) + 1);
    // if (text_in === 0) return 0;
    return ans;
  }
}
