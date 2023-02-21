const express = require('express');
const balance = require('./routes/balance');
const event = require('./routes/event');
const reset = require('./routes/reset');

const app = express();

app.use(express.json());

app.use('/balance', balance);
app.use('/event', event);
app.use('/reset', reset);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});