const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpack = require('copy-webpack-plugin'); 
const { patch } = require('semver');

//las Exportaciones
module.exports = {
    entry:'./src/index.js',//Entry nos permite saber el archivo que compilara webpack
    output: {//el  objeto output se refiere al archivo ya compilado
        filename: '[hash].main.js',//nombre del archivo js compilado
        path: path.resolve(__dirname, 'dist')//carpeta donde estara los archivos optimizados y compilados
    },
    resolve:{
        extensions: ['.js']//indicamos la extencion
    },
    mode: "development",
    module: {//en module se añaden los loader(los loader pre-procesa el codigo fuente y lo devuelve transformafo)
        
        rules: [//En rules se añaden todas las reglas de los loader
           
            //reglas de babel.
            {
        
                test: /\.m?js$/,//se declara la extencion de los archivos que aplaicara el loader
               
                exclude: /node_modules/,
               
                use: {//use es objeto donde estara el loader a utilizar.
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: [MiniExtractPlugin.loader,'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use:['file-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3000,
      },
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniExtractPlugin(),
        new CopyWebpack({
            patterns:[
                {
                    from: path.resolve(__dirname, 'src', 'assets/image'),
                    to: "assets/image"
                }
            ]
        })
    ]
}