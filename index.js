const axios = require("axios");
const express = require("express");

const app = express();

require("dotenv").config();

const URL = `http://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`;

const fetchMan = async (url) => {
  const response = await axios.get(url);
  const getData = response.data.articles;
  var comment = "";
  getData.forEach(
    (article) =>
      (comment += `<a href="${article.url}" target="_blank"><h4>${article.title}</h4><small>${article.content}</small></a>`)
  );
  return comment;
};

const PORT = process.env.PORT || 5000;
app.listen(PORT);

fetchMan(URL).then((comments) => {
  app.get("/", (req, res) => {
    return res.status(200).send(`<div><ul>${comments}</ul></div>`);
  });
});
