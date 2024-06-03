"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const router = (0, express_1.Router)();
router.get("/api/v1", (req, res) => {
    res.json("Welcome to api!");
});
router.use("/user", user_1.router);
