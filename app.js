import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './schemas/index.js';
import characterRoutes from './routes/characters.router.js';
import itemRoutes from './routes/items.router.js';  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB 연결
connect();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Game Item Simulator가 정상적으로 실행되었습니다!');
});

app.use('/api', characterRoutes);
app.use('/api', itemRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
