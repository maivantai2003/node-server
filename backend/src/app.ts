import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { subjectRouter } from './routes/subjectRouter';
import { detailSubjectRouter } from './routes/detailSubjectRouter';
import { userRouter } from './routes/userRouter';
import { AppDataSource } from './data-source';
import { console } from 'inspector';
import cookieParser from "cookie-parser";
import { authRouter } from './routes/authenticationRouter';
const app = express();
const PORT = 3000;
app.use(cors());
app.use(cookieParser())
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/subject', subjectRouter);
app.use('/api/detail-subject', detailSubjectRouter);
app.use("/api/user", userRouter);
app.use("/api/auth",authRouter)
AppDataSource.initialize().then(() => {
    console.log("Database connected successfully"); 
    const PORT = process.env.PORT || 3000;
    console.log(process.env.JWT_REFRESH_SECRET)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error during Data Source initialization:", error);
});

