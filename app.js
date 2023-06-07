//express 모듈 불러오기
const express = require("express");

//express 사용
const app = express();

//포트번호
const port = 3000;

//임시 데이터
const courses = [
    { id: 1, name: "courses1" },
    { id: 2, name: "courses2" },
    { id: 3, name: "courses3" },
];
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

// 해당하는 ID를 찾아서 Respon
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`ID was not found`);
    res.send(course);
});

app.use(express.json());

app.post("/api/courses", (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
});
