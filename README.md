# UPAA Raffle

Offline, cross-platform raffle program for use by the University of the Philippines Alumni Association, Camarines Sur Chapter.

Made using [Vue.js](https://vuejs.org/) and [pkg](https://github.com/zeit/pkg#readme).

## Usage

To run the raffle program from source, download the repository and run the following commands:

```bash
npm install
npm run build
npm run start
```

To generate the packages for Mac and Windows, run the following:

```bash
npm run package
```

This will create the directory `build` containing the packages.
Each package is a folder containing a `run` or `RUN.bat` script and a `bin` folder. double click the run script to start the program.
