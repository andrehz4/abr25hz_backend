const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/calculate', (req, res) => {
  const { boothSize, group5, group7, exhibitors } = req.body;

  const r = boothSize * 0.10 * 250;
  const rTotal = r < 500 ? 500 : r;
  const r3 = 14 * boothSize;
  const r7 = group7 !== 'rawOnly' ? Math.ceil(boothSize / 50) * 45 : 0;
  const sp1 = 240;
  const media = 260;

  let group5Rate;
  switch (group5) {
    case 'earlyBird':
      group5Rate = 240;
      break;
    case 'regular':
      group5Rate = 260;
      break;
    case 'lateRebooking':
      group5Rate = 295;
      break;
    default:
      group5Rate = 240;
  }

  let group7Rate;
  switch (group7) {
    case 'rawOnly':
      group7Rate = 0;
      break;
    case 'standard':
      group7Rate = 130;
      break;
    case 'complete':
      group7Rate = 173;
      break;
    case 'premium':
      group7Rate = 250;
      break;
    case 'pavilionStandard':
      group7Rate = 170;
      break;
    case 'pavilionSuper':
      group7Rate = 270;
      break;
    default:
      group7Rate = 0;
  }

  const totalPrice = boothSize * group5Rate;
  const totalPrice2 = boothSize * group7Rate;
  const exhibitorsCost = exhibitors > 0 ? exhibitors * 470 : 0;

  const total = rTotal + r3 + r7 + sp1 + media + totalPrice + totalPrice2 + exhibitorsCost;

  res.json({ total });
});

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
