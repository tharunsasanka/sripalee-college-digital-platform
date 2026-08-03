$ErrorActionPreference = "Stop"

Set-Location (Split-Path -Parent $PSScriptRoot)

Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm install
npm run dev
