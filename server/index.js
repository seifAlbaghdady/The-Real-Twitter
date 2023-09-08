import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import {verifyToken} from './middleware/auth.js';
import { register } from './controllers/auth.js';
import userRoutes from './routes/userRoutes.js';
import { createPost } from './controllers/post.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.json());
app.use(cors());
app.use(morgan('common'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use("assets", express.static(path.join(__dirname, "public/assets")));

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// when access to url not found
app.all((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    res.status(404).json({ message: error.message });
});

app.post('/auth/register', upload.single('file'), register);
app.post('/posts',verifyToken,upload.single('file'),createPost);

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
