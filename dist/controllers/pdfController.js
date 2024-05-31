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
exports.generatePdf = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const generatePdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundProducts = yield productModel_1.default.find({});
        console.log('Found Products:', foundProducts);
        if (foundProducts && foundProducts.length > 0) {
            const htmlContent = `
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif;padding:2rem }
            h1 {font-size:1.5rem;text-align:left;}
            .footer {background-color:red; display:flex;flex-direction:column; align-items:flex-end;justify-content:flex-end; }
            .invoice-header { text-align: center; margin-bottom: 20px; }
            .invoice-header h1 { margin: 0; }
            .invoice-header p { margin: 0; color: #888; }
            .invoice-table { width: 100%; border-collapse: collapse; }
            .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .invoice-table th { background-color: #f2f2f2; }
            .total { text-align: right; margin-top: 20px; }
            .terms { margin-top: 40px; font-size: 0.8em; color: #888; }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <h1>INVOICE GENERATOR</h1>
            <img src=""/>
          </div>
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${foundProducts.map(product => {
                var _a, _b, _c, _d, _e;
                return `
                <tr>
                  <td>${(_a = product.productName) !== null && _a !== void 0 ? _a : ''}</td>
                  <td>${(_b = product.productQuantity) !== null && _b !== void 0 ? _b : 0}</td>
                  <td>${(_c = product.productRate) !== null && _c !== void 0 ? _c : 0}</td>
                  <td>INR ${((_d = product.productRate) !== null && _d !== void 0 ? _d : 0) * ((_e = product.productQuantity) !== null && _e !== void 0 ? _e : 0)}</td>
                </tr>
              `;
            }).join('')}
            </tbody>
          </table>
          <div class="total">
            <p>Total: INR ${foundProducts.reduce((sum, product) => { var _a, _b; return sum + (((_a = product.productQuantity) !== null && _a !== void 0 ? _a : 0) * ((_b = product.productRate) !== null && _b !== void 0 ? _b : 0)); }, 0)}</p>
            <p>GST: 18%</p>
            <p>Grand Total: ₹ ${parseInt((foundProducts.reduce((sum, product) => { var _a, _b; return sum + (((_a = product.productQuantity) !== null && _a !== void 0 ? _a : 0) * ((_b = product.productRate) !== null && _b !== void 0 ? _b : 0)); }, 0) * 1.18).toString())}</p>
          </div>
          <div class="terms">
            <p>Valid until: ${new Date().toLocaleDateString()}</p>
            <p>Terms and Conditions</p>
            <p class="footer">We are happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention.</p>
          </div>
        </body>
        </html>
      `;
            const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = yield browser.newPage();
            yield page.setContent(htmlContent);
            const pdfBuffer = yield page.pdf({ format: 'A4' });
            yield browser.close();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
            return res.send(pdfBuffer);
        }
        return res.status(200).json({
            success: true,
            message: "No products found",
            data: []
        });
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        next(error);
    }
});
exports.generatePdf = generatePdf;
