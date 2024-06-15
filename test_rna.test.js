const puppeteer = require("puppeteer");

let DNA;

describe("first tase case", () => {
    let browser, page;
    beforeEach(async () => {
        DNA = "ACTACGATCGACGTAAGCTAATT";
        browser = await puppeteer.launch({headless: false, slowMo: 80});
        page = await browser.newPage();
        await page.goto("file:///Users/danawls/Desktop/transcription-translation-simulator/index.html");
    });

    afterEach(() => {
        DNA = null;
        browser.close();
    });

    test("Get Test 1st", async () => {
        const isel = "#dna";
        await page.click("#dna");
        await page.type("#dna", DNA);
        await page.keyboard.press("Enter");
        let pro = await page.$eval("#protein", el => el.textContent);
        expect(pro).toBe("단백질: Met,Leu,Ala,Ala,Phe,Asp");
        DNA = "CTACTACGATCGACGTAAGC";
        // const browser = await puppeteer.launch({headless: false, slowMo: 80});
        // const page = await browser.newPage();
        // await page.goto("file:///Users/danawls/Desktop/DNA-RNA-Protein/index.html?");
        await page.evaluate(() => {document.querySelector("#dna").value = "";});
        await page.type("#dna", DNA);
        await page.keyboard.press("Enter");
        pro = await page.$eval("#protein", el => el.textContent);
        expect(pro).toBe("단백질: THERE IS NO END");
        DNA = "TCTAGTGATCGACGTAAGCAA";
        // const browser = await puppeteer.launch({headless: false, slowMo: 80});
        // const page = await browser.newPage();
        // await page.goto("file:///Users/danawls/Desktop/DNA-RNA-Protein/index.html?");
        await page.evaluate(() => {document.querySelector("#dna").value = "";});
        await page.type("#dna", DNA);
        await page.keyboard.press("Enter");
        pro = await page.$eval("#protein", el => el.textContent);
        expect(pro).toBe("단백질: THERE IS NO START");
    });

    // test("Get Test 2nd",async () => {
    //     DNA = "CTACTACGATCGACGTAAGC";
    //     // const browser = await puppeteer.launch({headless: false, slowMo: 80});
    //     // const page = await browser.newPage();
    //     // await page.goto("file:///Users/danawls/Desktop/DNA-RNA-Protein/index.html?");
    //     for (let i = 0; i < 2; ++i) {
    //         await page.click("#dna");
    //     }
    //     await page.keyboard.press("Delete");
    //     await page.type("#dna", DNA);
    //     await page.type("#dna", DNA);
    //     await page.keyboard.press("Enter");
    //     const pro = await page.$eval("#protein", el => el.textContent);
    //     expect(pro).toBe("단백질: THERE IS NO END");
    // });
    //
    // test("Get Test 2nd",async () => {
    //     DNA = "TCTAGTGATCGACGTAAGCAA";
    //     // const browser = await puppeteer.launch({headless: false, slowMo: 80});
    //     // const page = await browser.newPage();
    //     // await page.goto("file:///Users/danawls/Desktop/DNA-RNA-Protein/index.html?");
    //     for (let i = 0; i < 2; ++i) {
    //         await page.click("#dna");
    //     }
    //     await page.keyboard.press("Delete");
    //     await page.type("#dna", DNA);
    //     await page.type("#dna", DNA);
    //     await page.keyboard.press("Enter");
    //     const pro = await page.$eval("#protein", el => el.textContent);
    //     expect(pro).toBe("단백질: THERE IS NO START");
    // });
});

