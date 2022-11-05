import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
import { createUser } from "./controller/user-controller.js";
import { logUserIn } from './controller/auth-controller.js';
import { verifyToken } from './helper/jwt-auth.js';
import { checkRole } from './helper/role-control.js';
const router = express.Router()


// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/', createUser)
router.post("/login", logUserIn);
router.get("/test",verifyToken, checkRole("readAny", "endpoints"), (_, res) => res.send("You are an authenticated and authorised admin"));


app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(9000, () => console.log("user-service listening on port 9000"));