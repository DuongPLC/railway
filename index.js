import express from 'express';
import { chromium } from 'playwright';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/getdata', async (req, res) => {
    const { num, from, to } = req.query;

    if (!num || !from || !to) {
        return res.status(400).json({ error: 'Thiếu tham số: num, from, to' });
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    try {
        await page.goto('https://esinad.minedu.gob.pe/e_sinadmed_1/resolucionesexternas/consultanormas.aspx', { waitUntil: 'load' });

        await page.fill('#ctl00_ContentPlaceHolder1_txtNumResol', num);
        await page.evaluate(({ from, to }) => {
            document.querySelector('#ctl00_ContentPlaceHolder1_txtFechaHasta').value = to;
            document.querySelector('#ctl00_ContentPlaceHolder1_txtFechaDesde').value = from;
        }, { to, from });
        // await page.click('#ctl00_ContentPlaceHolder1_txtFechaHasta');
        // await page.keyboard.type(to);
        // await page.click('#ctl00_ContentPlaceHolder1_txtFechaDesde');
        // await page.keyboard.type(from);

        // await page.fill('#ctl00_ContentPlaceHolder1_txtFechaHasta', to);
        // await page.fill('#ctl00_ContentPlaceHolder1_txtFechaDesde', from);

        await page.click('#ctl00_ContentPlaceHolder1_ibtnBuscar');
        await page.waitForTimeout(3000); // đợi kết quả

        const html = await page.content();
        await browser.close();

        res.send(html); // gửi HTML thô về PHP để xử lý tiếp
    } catch (err) {
        await browser.close();
        console.error(err);
        res.status(500).json({ error: 'Err', message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});




// import express from 'express';
// import { chromium } from 'playwright';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/getdata', async (req, res) => {
//     const { num, from, to } = req.query;

//     if (!num || !from || !to) {
//         return res.status(400).json({ error: 'Error num, from or to' });
//     }

//     try {
//         const browser = await chromium.launch({ headless: true });
//         const context = await browser.newContext({
//             userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
//         });
//         const page = await context.newPage();

//         await page.goto('https://esinad.minedu.gob.pe/e_sinadmed_1/resolucionesexternas/consultanormas.aspx', { waitUntil: 'load' });

//         await page.fill('#ctl00_ContentPlaceHolder1_txtNumResol', num);
//         await page.fill('#ctl00_ContentPlaceHolder1_txtFechaDesde', from);
//         await page.fill('#ctl00_ContentPlaceHolder1_txtFechaHasta', to);
//         await page.click('#ctl00_ContentPlaceHolder1_ibtnBuscar');

//         await page.waitForTimeout(3000);
//         const html = await page.content();

//         await browser.close();
//         res.json({ html });
//     } catch (err) {
//         console.error('Error scrape:', err);
//         res.status(500).json({ error: 'Error scraping', message: err.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`🚀 Server run http://localhost:${PORT}`);
// });





// import express from 'express';
// import { chromium } from 'playwright';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/getdata', async (req, res) => {
//     // const browser = await chromium.launch({ headless: true });
//     // const page = await browser.newPage();

//     const browser = await chromium.launch({ headless: true });
//     const context = await browser.newContext({
//         userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
//     });
//     const page = await context.newPage();
//     await page.goto('https://esinad.minedu.gob.pe/e_sinadmed_1/resolucionesexternas/consultanormas.aspx', { waitUntil: 'load' });

//     await page.fill('#ctl00_ContentPlaceHolder1_txtNumResol', '077-2025-MINEDU');
//     await page.fill('#ctl00_ContentPlaceHolder1_txtFechaDesde', '01/02/2025');
//     await page.fill('#ctl00_ContentPlaceHolder1_txtFechaHasta', '28/05/2025');
//     await page.click('#ctl00_ContentPlaceHolder1_ibtnBuscar');
//     await page.waitForTimeout(3000);

//     const html = await page.content();
//     await browser.close();

//     res.json({ html });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
