import express from 'express';
import cors from 'cors';
import routes from './routes/coordinates.routes';

import 'dotenv/config';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server Started');
});
