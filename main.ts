import root from "./routes/root";

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

root();
