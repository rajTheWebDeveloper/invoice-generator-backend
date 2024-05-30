"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdfController_1 = require("../controllers/pdfController");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
let router = express_1.default.Router();
router.post('/generate-pdf', validateToken_1.default, pdfController_1.generatePdf);
exports.default = router;
