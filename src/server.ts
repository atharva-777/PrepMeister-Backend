import { app } from "./app";

const port = process.env.PORT || 4000;
app.use((req, res, next) => {
  console.log("Auth middleware");
  next();
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
