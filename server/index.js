const express = require('express');
const authRoutes = require ('./routes/auth.js');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));