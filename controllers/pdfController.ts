import express, { Request, Response, NextFunction } from 'express';
import Products from '../models/productModel';
import puppeteer from 'puppeteer';

const generatePdf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundProducts = await Products.find({});

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
              ${foundProducts.map(product => `
                <tr>
                  <td>${product.productName ?? ''}</td>
                  <td>${product.productQuantity ?? 0}</td>
                  <td>${product.productRate ?? 0}</td>
                  <td>INR ${(product.productRate ?? 0) * (product.productQuantity ?? 0)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <p>Total: INR ${foundProducts.reduce((sum, product) => sum + ((product.productQuantity ?? 0) * (product.productRate ?? 0)), 0)}</p>
            <p>GST: 18%</p>
            <p>Grand Total: ₹ ${parseInt((foundProducts.reduce((sum, product) => sum + ((product.productQuantity ?? 0) * (product.productRate ?? 0)), 0) * 1.18).toString())}</p>
          </div>
          <div class="terms">
            <p>Valid until: ${new Date().toLocaleDateString()}</p>
            <p>Terms and Conditions</p>
            <p class="footer">We are happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention.</p>
          </div>
        </body>
        </html>
      `;

      const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
      return res.send(pdfBuffer);
    }

    return res.status(200).json({
      success: true,
      message: "No products found",
      data: []
    });

  } catch (error: any) {
    console.error('Error generating PDF:', error);
    next(error);
  }
};

export { generatePdf };
