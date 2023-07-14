import root, { server } from "./routes/root";

process.on("unhandledRejection", async (err) => {
  await server.app.prisma.$disconnect();
  console.error(err);
  process.exit(1);
});

root()
  .then((s) => {
    console.log(`
🚀 Server ready at: ${server.info.uri}
`);
  })
  .catch((err) => {
    console.error(err);
  });
