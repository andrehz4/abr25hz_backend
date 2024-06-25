const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/calculate', (req, res) => {
  const { boothSize, group5, group7, exhibitors } = req.body;

  const r = boothSize * 0.10 * 250;
  const rTotal = r < 500 ? 500 : r;
  const r3 = 14 * boothSize;
  const r7 = group7 !== 0 ? Math.ceil(boothSize / 50) * 45 : 0;
  const sp1 = 240;
  const media = 260;
  const totalPrice = boothSize * group5;
  const totalPrice2 = boothSize * group7;
  const exhibitorCost = exhibitors * 470;

  const total = rTotal + r3 + r7 + sp1 + media + totalPrice + totalPrice2 + exhibitorCost;

  res.json({ total });
});

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
