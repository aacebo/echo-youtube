import { App } from '@aacebo/echo';

if (!process.env.CLIENT_ID) {
  throw new Error('`CLIENT_ID` is required');
}

if (!process.env.CLIENT_SECRET) {
  throw new Error('`CLIENT_SECRET` is required');
}

const app = new App({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

app.event('link', async ({ event, ack }) => {
  const videoId = new URL(event.body.link).searchParams.get('v');

  if (!videoId || typeof videoId !== 'string') {
    return ack();
  }

  await app.api.messages.extend(event.body.message_id, {
    body: {
      type: 'video',
      url: `https://www.youtube.com/embed/${videoId}`
    }
  });

  ack();
});

app.start();
