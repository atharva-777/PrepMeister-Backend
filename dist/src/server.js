"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 8080;
app_1.app.use((req, res, next) => {
    console.log("Auth middleware");
});
app_1.app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
