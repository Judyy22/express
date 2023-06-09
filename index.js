//express 모듈 불러오기
const express = require("express");
const cors = require("cors");

//express 사용
const app = express();

app.set("port", process.env.PORT || 3000); // 포트 설정
app.set("host", process.env.HOST || "0.0.0.0"); // 아이피 설정

app.use(cors());

// 서버 동작중인 표시
app.listen(app.get("port"), app.get("host"), () =>
    console.log(
        "Server is running on : " + app.get("host") + ":" + app.get("port")
    )
);

app.post("/", function (req, res) {
    res.send({ ip: req.ip });
});

//임시 데이터
const courses = [
    { id: 1, name: "courses1" },
    { id: 2, name: "courses2" },
    { id: 3, name: "courses3" },
];
app.get("/", (req, res) => {
    res.send("Welcome");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

// 해당하는 ID를 찾아서 Response
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
    res.send(courses);
});
