# Homepage Installation

This package is a complete project folder. Extract it into `C:\Users\ASUS\Development` so the final path is:

`C:\Users\ASUS\Development\sripalee-college-digital-platform`

Do not place the extracted project inside another folder with the same name.

After extraction, run:

```powershell
cd C:\Users\ASUS\Development\sripalee-college-digital-platform
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm install
npm run dev
```

The development script uses Webpack to avoid stale Turbopack chunk errors during local development.
