# Selection Dashboard

选品评估仪表盘 - 全站源码  
部署指南详见 README 内部说明。

## 快速部署 (Cloudflare Pages)
1. 把源码推到 GitHub 仓库  
2. 仓库 Secrets 添加 `COOKIE_1688` （你的 1688 登录 Cookie）  
3. Cloudflare Pages 选择此仓库  
   - Framework: **Vite**  
   - Build command: `npm run build`  
   - Output dir: `dist`  
4. 首次部署后访问 `https://<project>.pages.dev`  

GitHub Action (`.github/workflows/fetch-1688.yml`) 将每天抓取最新数据并触发自动重构。
