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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
let __basePath = path_1.default.dirname(__filename);
__basePath = __basePath.slice(0, __basePath.lastIndexOf(path_1.default.sep));
let __configPath = __basePath + path_1.default.sep + 'config' + path_1.default.sep + '.env';
dotenv_1.default.config({
    path: __configPath
});
let validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (token) {
        if (!process.env.JWT_PASSWORD) {
            return next("JWT_PASWORD environment variable is not defined");
        }
        token = token.split(' ')[1];
        let verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD);
        console.log(verifiedToken);
        if (verifiedToken) {
            next();
        }
        else {
            return next("JWT_PASWORD environment variable is not defined");
        }
    }
    else {
        return next("Invalid Token");
    }
});
exports.default = validateToken;
