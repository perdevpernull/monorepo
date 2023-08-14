import esbuildServe from "esbuild-serve";

const clientEnv = {"process.env.NODE_ENV": "'dev'"};

esbuildServe(
  {
    "entryPoints": ["./index.jsx"],
    "bundle": true,
    "minify": false,
    "define": clientEnv,
    "outdir": "./dist",
    "sourcemap": "inline",
  },
  {
    // serve options (optional)
    "port": 7000,
    "root": "./dist",
  },
);
