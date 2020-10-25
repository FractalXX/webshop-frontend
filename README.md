# WebshopFrontend

A demo frontend for a webshop API, built in Angular 10.

## Libraries
|Library             |Version        |Description                 |
|:-------------------|---------------|---------------------------:|
|Angular             |~10.1.6        |Core of the application     |
|@angular/material   |^10.2.5        |Component library           |
|@angular/flex-layout|^10.0.0-beta.32|Layout library, responsivity|
|lodash-es           |^4.17.15       |Object transformation       |
|RxJS                |~6.6.0         |Reactive pattern            |

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Docker

Run `npm run build:docker` to create a docker image, then `npm run start:docker` to start it.
The docker image uses nginx to serve static content.

Note: when using the Docker image, the port is 80.
