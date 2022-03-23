const webpush = require('web-push');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql_pool = require('./data/config_mysql');
const postgres_pool = require('./data/config_postgres')
const base64 = require('base-64');

const app = express();

const VAPIDKEY = { "publicKey": "BD51N85VL71eGHTwxXXdb7YtdZQnusxPMUA19K_VqESUCNfxiZApeUToIJwvyJ7ObF7Oetof0YuURrk1BydPr5w", "privateKey": "iw2teOL_xzC9m5RnI3MPyHtMp0EUGwoA0hrunDU1iS0" }
const PORT = process.env.PORT || 3000;
const HOST = 'https://pwa-be-demo.herokuapp.com/'
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log('The server started on port 3000 !!!!!!');
});

app.get('/', (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Welcome to<br><br>WEB PUSH to PWA</h1>"
  );
});

app.post('/api/send-push-subscription', (req, res) => {
  const sub = req.body.sub;
  // mysql_pool.query(`INSERT INTO Devices (Extras, UUID) VALUES ("${base64.encode(JSON.stringify(sub))}", "${req.body.uuid}")`, (error, result) => {
  //   if (error)
  //   res.send(error)
  //   else
  //     res.send('Save sub ok')
  // });
  let query = `INSERT INTO public.devices (extras, uuid) VALUES ('${base64.encode(JSON.stringify(sub))}', '${req.body.uuid}')`;
  postgres_pool.query(query, (error, result) => {
    console.log(query)
    if (error)
    {
      console.log(error)
      res.send(error);
    }
    else
      res.send('Save sub ok')
  });
});

app.post('/api/send-push-notification', (req, res) => {

  if (req.body.payload != null) {
    payload.notification.title = req.body.title
    payload.notification.data = req.body.data
    payload.notification.body = req.body.body
  }

  console.log(payload)
  // mysql_pool.query('SELECT * FROM Devices', (error, result) => {
  //   if (error) throw error;
  //   console.log(result)
  //   webpush.setVapidDetails('mailto:hnguyen48206@gmail.com', VAPIDKEY.publicKey, VAPIDKEY.privateKey);
  //   for (let i = 0; i < result.length; ++i) {
  //     webpush.sendNotification(JSON.parse(base64.decode(result[i].Extras)), JSON.stringify(payload)).then(res => {
  //       console.log(res)
  //     })
  //       .catch(err => {
  //         console.log(err)
  //       });
  //   }
  //   res.send('Push OK');
  // });

  postgres_pool.query('SELECT * FROM public.devices', (error, result) => {
    if (error) throw error;
    console.log(result.rows)
    webpush.setVapidDetails('mailto:hnguyen48206@gmail.com', VAPIDKEY.publicKey, VAPIDKEY.privateKey);
    for (let i = 0; i < result.rows.length; ++i) {
      webpush.sendNotification(JSON.parse(base64.decode(result.rows[i].extras)), JSON.stringify(payload)).then(res => {
        console.log(res)
      })
        .catch(err => {
          console.log(err)
        });
    }
    res.send('Push OK');
  });

});

// console.log(webpush.generateVAPIDKeys());

// const sub = {
//   "endpoint": "https://fcm.googleapis.com/fcm/send/eVBEyCYVQ_A:APA91bElPWhkkqRm-gvEdEEcYWIBa56_D1Wc2uO6n8cMdSed8VnUWe9-YQ_2oPkEacoME3meVKZmvlnkYoklsRebnyNuBTEph-SSa9cQODjLUdUe_BVLygtAnJHQi5ioUC1hsAHl3oW6",
//   "expirationTime": null, "keys": {
//     "p256dh": "BE7uaN11_io_lgwKXvU0SrWF1cPZPnqDfkgr934y4jAPvpU5z3WneiB4AWTG4-iCM7kEmgmJoCSqgpEXsAq2N9A",
//     "auth": "M9td7ZtCTau_Y91W0POcEA"
//   }
// }

var payload = {
  notification: {
    data: {
      url: 'abc.com',
      action: 'custom action to perform',
      extras: {}
    },
    title: 'Thông báo khẩn',
    body: 'Anytime, any where',
    icon: 'assets/icons/icon-128x128.png',
    badge: 'assets/icons/icon-128x128.png',
    vibrate: [100, 50, 100],
    priority: 'max',
    android: {
      priority: 'max'
    }
  },
};

