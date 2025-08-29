const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());

app.post("/pdf", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url || !/^https?:\/\//i.test(url) || !url.startsWith("https://footie.scaf-folder.com") || !url.includes("mystring")) {
            return res.status(400).json({ error: "Invalid or missing URL" });
        }

        const browser = await puppeteer.launch({
            headless: "new",
            executablePath: "/usr/bin/chromium-browser",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        const pdfBuffer = await page.pdf({ format: "A4" });
        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=page.pdf"
        });
        res.send(pdfBuffer);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`PDF service running on port ${PORT}`));
