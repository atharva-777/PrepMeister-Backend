import { app } from "./app";

const PORT = process.env.PORT || 8080;
app.use((req, res, next) => {
  console.log("Auth middleware");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
