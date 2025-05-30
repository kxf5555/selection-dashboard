import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

puppeteer.use(StealthPlugin());

const sleep=ms=>new Promise(r=>setTimeout(r,ms));

(async()=>{
  const ck=process.env.COOKIE_1688;
  if(!ck){console.error('缺少 COOKIE_1688');process.exit(1);}
  const browser=await puppeteer.launch({
    executablePath:'/usr/bin/google-chrome',
    headless:'new',
    args:['--no-sandbox','--disable-gpu']
  });
  const page=await browser.newPage();
  await page.setExtraHTTPHeaders({ 'Cookie': ck });
  console.log('开始抓取 tiyicj.1688.com...');
  await page.goto('https://tiyicj.1688.com/page/offerlist.htm',{waitUntil:'networkidle2',timeout:60000});
  let prevHeight=0; let loops=0;
  while(loops<20){
    const height=await page.evaluate('document.body.scrollHeight');
    if(height===prevHeight) break;
    prevHeight=height; loops++;
    await page.evaluate('window.scrollTo(0,document.body.scrollHeight)');
    await sleep(1200);
  }

  const items=await page.evaluate(()=>{
    const list=[];
    document.querySelectorAll('.offer').forEach(el=>{
      const title=el.querySelector('.offer-title')?.textContent?.trim()||'';
      const price=parseFloat(el.querySelector('.price')?.textContent?.replace(/[^\d.]/g,'')||'0');
      const sku=el.getAttribute('data-offerid')||'';
      const img=el.querySelector('img')?.getAttribute('src')||'';
      list.push({title,sku,price,imageUrl:img});
    });
    return list;
  });
  console.log('抓取完成，商品数:',items.length);
  fs.mkdirSync('public/data',{recursive:true});
  fs.writeFileSync('public/data/products.json',JSON.stringify(items,null,2),'utf-8');
  await browser.close();
})();