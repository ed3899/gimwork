import Hapi from '@hapi/hapi';

const init = async () => {
  const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    }
  });

  await server.start();
  console.log('Server running on', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
