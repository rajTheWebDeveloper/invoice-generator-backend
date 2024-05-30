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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
let __basePath = path_1.default.dirname(__filename);
__basePath = __basePath.slice(0, __basePath.lastIndexOf(path_1.default.sep));
let __configPath = __basePath + path_1.default.sep + 'config' + path_1.default.sep + '.env';
dotenv_1.default.config({
    path: __configPath
});
const database = () => __awaiter(void 0, void 0, void 0, function* () {
    // if (!process.env.MONGO_URI) {
    //     throw new Error("MONGO_URI environment variable is not defined");
    // }
    return mongoose_1.default.connect("mongodb://webDevMaster:rajTheWebDeveloper@ac-70rgez7-shard-00-00.cqgngsb.mongodb.net:27017,ac-70rgez7-shard-00-01.cqgngsb.mongodb.net:27017,ac-70rgez7-shard-00-02.cqgngsb.mongodb.net:27017/invoice-generator?ssl=true&replicaSet=atlas-3w8jnm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
        console.log("Connected to mongo ATLAS");
    })
        .catch(() => {
        console.log("Please check the connection again");
    });
});
exports.default = database;
