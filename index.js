import express from "express";
const app = express();
const port = 3000;
import bodyParser from "body-parser";

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

let postedblogs = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {postedblogs});
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/pblog", (req, res) => {
    const blogtitle = req.body.blogT;
    const blogname = req.body.blogN;
    const blogcontent = req.body.blogC;
    const postedtime = new Date();
    const blogpost = {id: genPID(), blogtitle, blogname, blogcontent, postedtime};
        postedblogs.push(blogpost);
});

app.post("/edit", (req, res) => {
    const PID = req.body.id;
    const blogpost = postedblogs.find(post => post.id == PID);
    if (blogpost) {
        blogpost.blogtitle = req.body.blogT;
        blogpost.blogname = req.body.blogN;
        blogpost.blogcontent = req.body.blogC;
    } else {
        console.log("Where are the bloody posts at?")
    }
    res.redirect("/");
});

app.post("/del", (req, res) => {
    const PID = req.body.id;
    postedblogs = postedblogs.filter(post => post.id != PID);
    res.redirect("/");
});

function genPID() {
    return Math.floor(Math.random() * 10000);
}

app.listen(port, () => {
    console.log(`Live on port ${port}`);
});
