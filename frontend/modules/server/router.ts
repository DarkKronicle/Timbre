import { Router } from 'express';
import AuthRouter from "./routers/authRouter"

const router = Router();

router.use("/auth", AuthRouter)

router.get('/', (req, res) => {
    res.send('Hello World!');
});

export default router;