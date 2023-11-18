"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    // throw error("Error")
    res.render('index', { age: 21 });
});
router.get('/test', (_req, res) => {
    res.send('Test route successful');
});
exports.default = router;
