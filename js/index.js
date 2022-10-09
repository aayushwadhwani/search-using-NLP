const page = document.getElementById("body");
const button = document.getElementById("search");
// console.log(page.innerHTML);
const divs = page.querySelectorAll("div");

const indexes = [];
const afterPreProcessing = [];

for (let i = 0; i < divs.length; i++) {
  //   console.log(divs[i].id);
  indexes.push({
    id: divs[i].id,
    content: divs[i].innerHTML,
  });
  afterPreProcessing.push({
    id: divs[i].id,
    content: new PreProcessing(divs[i].innerHTML),
  });
}

for (let i = 0; i < afterPreProcessing.length; i++) {
  afterPreProcessing[i].content.remove_html();
  afterPreProcessing[i].content.remove_spaces();
  afterPreProcessing[i].content.lowe_case();
  afterPreProcessing[i].content.stem();
  afterPreProcessing[i]["tokens"] = afterPreProcessing[i].content.text;
  console.log(afterPreProcessing[i].tokens);
  delete afterPreProcessing[i].content;
}

button.addEventListener("click", (e) => {
  const search_for = document.getElementById("text").value;
  // console.log(search_for);
  let algo = document.getElementById("algo").value;
  // console.log(algo);
  let algo_obj = new TfIdf(
    afterPreProcessing,
    porterStemmer(search_for.toLowerCase())
  );
  if (algo !== "TF-IDF") {
    algo_obj = new Bm25(
      afterPreProcessing,
      porterStemmer(search_for.toLowerCase())
    );
  }
  const tf_scores = algo_obj.tf();
  const idf_score = algo_obj.idf();
  // console.log(idf_score);
  for (let section in tf_scores) {
    tf_scores[section] *= idf_score;
  }
  console.log(tf_scores);
  if (search_for !== "") {
    document.getElementById(
      "scores"
    ).innerText = `The ${algo} values for the text: ${search_for} is  ${JSON.stringify(
      tf_scores
    )}`;
  } else {
    document.getElementById("scores").innerText = ``;
  }

  for (let i = 0; i < divs.length; i++) {
    let id = divs[i].id;
    if (tf_scores[id] === 0 && search_for !== "") {
      divs[i].style.display = "none";
    } else {
      divs[i].style.display = "block";
    }
  }
});
