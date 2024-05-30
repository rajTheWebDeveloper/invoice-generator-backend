"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database/database"));
const accessRoutes_1 = __importDefault(require("./routes/accessRoutes"));
const pdfRoutes_1 = __importDefault(require("./routes/pdfRoutes"));
const __basePath = path_1.default.dirname(__filename);
const __configPath = __basePath + path_1.default.sep + 'config' + path_1.default.sep + '.env';
const app = (0, express_1.default)();
console.log(__basePath);
console.log(__configPath);
console.log("Raj KING");
app.use((0, cors_1.default)());
dotenv_1.default.config({
    path: __configPath
});
app.use(express_1.default.json());
app.use('/api', accessRoutes_1.default);
app.use('/api', pdfRoutes_1.default);
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Internal Server Error';
    return res.status(500).json({
        success: false,
        message: error.message
    });
});
const PORT = process.env.PORT || 2000;
let start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.default)();
    app.listen(2000, () => {
        console.log(`Connected to PORT ${PORT}`);
    });
});
start();
