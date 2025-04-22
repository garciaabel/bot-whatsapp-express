const express = require('express');
const app = express();
app.use(express.json());

// Webhook de verificación
app.get('/webhook', (req, res) => {
  const verify_token = 'mibottoken';

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === verify_token) {
    console.log('✅ Webhook verificado correctamente');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Webhook de recepción de mensajes
app.post('/webhook', (req, res) => {
  console.log('📥 Mensaje recibido:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
