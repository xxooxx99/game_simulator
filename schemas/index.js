import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Mongoose strictQuery 설정
mongoose.set('strictQuery', true);

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: 'node_lv1',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;
