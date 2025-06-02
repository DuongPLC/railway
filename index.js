import express from 'express';
import { chromium } from 'playwright';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/getdata', async (req, res) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://esinad.minedu.gob.pe/e_sinadmed_1/resolucionesexternas/consultanormas.aspx');

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
    console.log(`Server running on port ${PORT}`);
});
