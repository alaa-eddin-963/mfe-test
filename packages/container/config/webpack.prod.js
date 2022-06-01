const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require("./webpack.common.js")
const packageJson = require("../package.json")
const domain = process.env.PRODUCTION_DOMAIN
const prodConfig = {
    mode: "production",
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            output: {
                filename: "[name][contenthash].js"
            },
            remotes: {
                marketing: `marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies
        }),
    ]
}
module.exports = merge(commonConfig, prodConfig)