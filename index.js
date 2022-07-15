const { request, response } = require("express");
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");

// Definind0 os arquivos estáticos
// app.use(express.static(path.join(__dirname, "views")));

// const staticFolder = path.join(__dirname, "views");
// const expressStatic = express.static(staticFolder);
// app.use(expressStatic);

// Definind0 os arquivos publico
// app.use(express.static(path.join(__dirname, "public")));

// const publicFolder = path.join(__dirname, "views");
// const expressPublic = express.static(publicFolder);
// app.use(expressPublic);

// habilita server para receber dados via post (formulários)
app.use(express.urlencoded({ extended: true }));

// rotas
app.get("/", (request, response) => {
  response.render("index", {
    title: "Digital tech - Home",
  });
});

app.get("/posts", (request, response) => {
  response.render("posts", {
    title: "Digital tech - Posts",
    posts: [
      {
        title: "Novidade no mundo da tecnologia",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non impedit, optio iusto officia suscipit eos sapiente facilis aspernatur voluptatibus reiciendis est vel dolorem repellendus, sed tenetur blanditiis reprehenderit accusantium.",
        stars: 3,
      },
      {
        title: "Criando um servidor com node.js",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non impedit, optio iusto officia suscipit eos sapiente facilis aspernatur voluptatibus reiciendis est vel dolorem repellendus, sed tenetur blanditiis reprehenderit accusantium.",
      },
      {
        title: "Novidade no mundo das series",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non impedit, optio iusto officia suscipit eos sapiente facilis aspernatur voluptatibus reiciendis est vel dolorem repellendus, sed tenetur blanditiis reprehenderit accusantium.",
        stars: 4,
      },
    ],
  });
});

app.get("/cadastro-posts", (request, response) => {
  const { c } = response.query;
  response.render("cadastro-posts", {
    title: "Digital tech - Cadastrar Post",
    cadastrado: c,
  });
});

app.post("/salvar-post", (request, response) => {
  const { titulo, texto } = request.body;

  const data = fs.readFileSync("./store/posts.json");
  const posts = JSON.parse(data);

  posts.push({
    titulo,
    texto,
  });

  const postsString = JSON.stringify(posts);

  fs.writeFileSync("./store/posts.json", postsString);

  response.redirect("/cadastro-posts?c=1");
});

// 404 error (not found)
app.use((request, response) => {
  response.send("Página não encontrada!");
});

// executando o servidor
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is listing on port ${port}`));
