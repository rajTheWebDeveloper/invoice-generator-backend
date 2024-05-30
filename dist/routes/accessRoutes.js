"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accessController_1 = require("../controllers/accessController");
let router = express_1.default.Router();
router.post('/signup', accessController_1.signUp);
router.post('/signin', accessController_1.signIn);
exports.default = router;
