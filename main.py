import asyncio
from flask import Flask, jsonify
from playwright.async_api import async_playwright

app = Flask(__name__)

@app.route("/getdata", methods=["GET"])
def get_data():
    result = asyncio.run(scrape_data())
    return jsonify(result)

async def scrape_data():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://esinad.minedu.gob.pe/e_sinadmed_1/resolucionesexternas/consultanormas.aspx")

        await page.fill('#ctl00_ContentPlaceHolder1_txtNumResol', '077-2025-MINEDU')
        await page.fill('#ctl00_ContentPlaceHolder1_txtFechaDesde', '01/02/2025')
        await page.fill('#ctl00_ContentPlaceHolder1_txtFechaHasta', '28/05/2025')
        await page.click('#ctl00_ContentPlaceHolder1_ibtnBuscar')
        await page.wait_for_timeout(3000)

        html = await page.content()
        await browser.close()
        return {"html": html}
