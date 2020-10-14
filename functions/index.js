require('dotenv').config();

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.SECRET_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.post('/payments/create', async (req, res) => {
  const { total } = req.query;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd'
    });

    res.status(201).send(paymentIntent.client_secret);
  } catch (err) {
    console.log(err);
    if (err.message === 'This value must be greater than or equal to 1.') {
      res.status(400).send('The transaction amount must be at least USD 0.50.');
    } else {
      res.status(400).send(err.message);
    }
  }
});

exports.api = functions.https.onRequest(app);
