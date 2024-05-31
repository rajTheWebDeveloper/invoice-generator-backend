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
exports.signIn = exports.signUp = void 0;
const accessModel_1 = __importDefault(require("../models/accessModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
let __basePath = path_1.default.dirname(__filename);
__basePath = __basePath.slice(0, __basePath.lastIndexOf(path_1.default.sep));
let __configPath = __basePath + path_1.default.sep + 'config' + path_1.default.sep + '.env';
dotenv_1.default.config({
    path: __configPath
});
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = req.body;
    try {
        let foundUser = yield accessModel_1.default.findOne({
            email: email
        });
        if (!foundUser) {
            let createdUser = yield accessModel_1.default.create({
                name,
                email,
                password
            });
            return res.status(200).json({
                success: true,
                message: "Account created successfully",
                data: createdUser
            });
        }
        return res.status(200).json({
            success: true,
            message: "User already exists",
            data: foundUser
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    try {
        let foundUser = yield accessModel_1.default.findOne({
            email: email
        });
        console.log(foundUser);
        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: "No such user exists",
                data: {}
            });
        }
        if (foundUser) {
            // if (!process.env.JWT_PASSWORD) {
            //     throw new Error("JWT_PASSWORD environment variable is not defined");
            // }
            if (yield foundUser.authenticate(password)) {
                let { _id } = foundUser;
                let token = jsonwebtoken_1.default.sign({ _id }, "I_AM_SUPER_SECRET_PASSWORD", { expiresIn: '8h' });
                foundUser = JSON.parse(JSON.stringify(foundUser));
                let withToken = Object.assign({ token: token }, foundUser);
                return res.status(200).json({
                    success: true,
                    message: "Logged In Successfully",
                    data: withToken
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Password"
                });
            }
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.signIn = signIn;
