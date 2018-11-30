# SPA Template for ASP.NET Core 2.1 with VueJS (Vanilla)

This is a modified template based upon official Microsoft.AspNetCore.SpaTemplate::*

## This template has the following changes:

- Migrated to .Net Core 2.1
- Updated NPM packages
- Updated to Bootstrap 4
- Updated to WebPack 4
- Added Serilog
- Removed Typescript

Other than that it has minor changes to VueJS original files.

## How to install:

Clone or download this repo, and install as follows:

```
dotnet new --install <path to this template directory>
```
You can see it listed `dotnet new -l` with the shortname `vuevanilla` so in order to create new projects using this template just use that shortname.

```
dotnet new vuevanilla -n myspa -o myspa
cd myspa
dotnet restore
npm install
dotnet run
```
To publish, just as usual: `dotnet publish -c release`