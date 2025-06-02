import express from 'express';
import { chromium } from 'playwright';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/getdata', async (req, res) => {
    // const browser = await chromium.launch({ headless: true });
    // const page = await browser.newPage();

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
    await page.goto('https://esinad.minedu.gob.pe/e_sinadmed_1/resolucionesexternas/consultanormas.aspx', { waitUntil: 'load' });
    // await page.goto('https://esinad.minedu.gob.pe/e_sinadmed_1/resolucionesexternas/consultanormas.aspx');

    await page.fill('#ctl00_ContentPlaceHolder1_txtNumResol', '077-2025-MINEDU');
    await page.fill('#ctl00_ContentPlaceHolder1_txtFechaDesde', '01/02/2025');
    await page.fill('#ctl00_ContentPlaceHolder1_txtFechaHasta', '28/05/2025');
    await page.click('#ctl00_ContentPlaceHolder1_ibtnBuscar');
    await page.waitForTimeout(3000);

    const html = await page.content();
    await browser.close();

    res.json({ html });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
