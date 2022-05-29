const path = require("path");

module.exports = {
    entry: "./index.js",
    module: {
        rules: [
            { test: "/\.css$" , use: ["style-loader", "css-loader"] }
        ]
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, ""),
        filename: "index_bundle.js"
    },
    watch: true
}