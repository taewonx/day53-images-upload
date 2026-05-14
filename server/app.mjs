// server/app.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());

// 이미지가 저장될 위치와 이름 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// 업로드 API
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: "서버에 저장 완료!", file: req.file });
});

app.listen(5001, () => console.log("🚀 서버 가동: 5001"));