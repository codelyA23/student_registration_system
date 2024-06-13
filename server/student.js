// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const AuthRoute = require("./router/AuthRoute.js");
const UserRouter = require("./router/UserRouter.js");
const db = require('./DatabaseConfig/Database.js');
const cookieParser = require("cookie-parser");
const AcademicRecordRoute = require("./router/AcademicRecordRoute.js")
const CourseRoute = require("./router/CourseRoute.js")
const EnrollmentRoute = require("./router/EnrollmentRoute.js")
const FacultyRoute = require("./router/FacultyRoute.js");
const StudentRoute = require("./router/StudentRoute.js")
const StaffRoute = require("./router/StaffRoute.js")
const ModuleRoute = require("./router/ModuleRoute.js")
const ScheduleRoute = require("./router/ScheduleRoute.js")


const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.static('./public'));
app.use(cookieParser());

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const store = new SequelizeStore({
    db: db
});

(async () => {
    await db.sync();
})();

app.use(flash());

app.use(session({
    secret: process.env.SESS_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: "http://localhost:2502"
}));

app.use(AuthRoute);
app.use(UserRouter);
app.use(AcademicRecordRoute);
app.use(CourseRoute);
app.use(FacultyRoute);
app.use(EnrollmentRoute);
app.use(StudentRoute);
app.use(StaffRoute);
app.use(ModuleRoute);
app.use(ScheduleRoute);

const PORT = process.env.PORT || 2402;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
