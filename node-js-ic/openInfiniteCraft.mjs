import puppeteer from 'puppeteer';
import * as pptr from 'puppeteer-core';
import path from 'path';

const pathToExtension = "C:/Users/Alexandru Andercou/AppData/Local/Google/Chrome/User Data/Default/Extensions/jinjaccalgkegednnccohejagnlnfdag/2.19.0_0";
function delay(time) {
return new Promise(function(resolve) {
setTimeout(resolve, time)
});}


(async () => {
    console.log("start");
    const browser = await pptr.launch({headless:false,
	executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
	
	args: [
    `--disable-extensions-except=${pathToExtension}`,
    `--load-extension=${pathToExtension}`,
  ],
        

});
	 const page = await browser.newPage();
	

	  
	 
	await page.goto('https://neal.fun/infinite-craft/');



const backgroundPageTarget = await browser.waitForTarget(
  target => target.type() === 'background_page'
);

const backgroundPage = await backgroundPageTarget.page();
    console.log(await backgroundPage.content());
    console.log("it started");



})();
