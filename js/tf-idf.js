class TfIdf {
  unique_words = []
  indexes = [];
  text = "";

  constructor(indexes, text, unique_words = []) {
    this.indexes = indexes;
    this.unique_words = unique_words;
    this.text = text.toLowerCase();
    console.log(indexes)
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

  get_scores() {
    const scores = {}
    for(let i=0; i<this.unique_words.length; i++) {
      scores[this.unique_words[i]] = {};
    }
    for(let i=0; i<this.unique_words.length; i++) {
      const idf = this.idf();
      // console.log(idf);
      this.text = this.unique_words[i];
      const tf_scores = this.tf();
      for (const section in tf_scores) {
        tf_scores[section] *= idf;
      }
      scores[this.text] = tf_scores;
      // console.log(tf_scores)/
    }
    return scores;
  }
}
