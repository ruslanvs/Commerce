let express = require( "express");
let app = express();

let bodyParser = require( "body-parser" );
let path = require( "path" );
let mongoose = require( "mongoose" );
let uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.use( express.static( __dirname + "/client/dist" ) );

mongoose.connect( "mongodb://localhost/commerce" );

let Schema = mongoose.Schema;
let autoNumber = require('mongoose-auto-number');

let minlength = 3
let maxlength = 75
let min_zero = 0

let constraints = {
    minlength: minlength,
    maxlength: maxlength,
    min_zero: min_zero,

    str_r_u: {
        type: String,
        minlength: [minlength, "{PATH} should have at least {MINLENGTH} characters"],
        required: true,
        unique: true,
    },

    num_min_zero: {
        type: Number,
        min: [0, "{VALUE} is too low, {PATH} should be no less than {MIN}"],
        required: true,
    },
}
// mongoose.connect( "mongodb://localhost/commerce" );

// let connection = mongoose.createConnection("mongodb://localhost/commerce");

// autoNumber.init(connection);

let ProductSchema = new mongoose.Schema( {
    name: constraints.str_r_u,
    quantity: constraints.num_min_zero,
    price: constraints.num_min_zero,
}, { timestamps: true } );

ProductSchema.plugin( uniqueValidator, { message: '{PATH} {VALUE} is already registered, please use a unique one'} );

let Product = mongoose.model( "Product", ProductSchema );

// ProductSchema.plugin( autoNumber.plugin, 'Product' );


app.get( "/constraints", function( req, res ){
    res.json( constraints );
})

app.get( "/products/express", function( req, res ){
    Product.find( {}, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
    // .sort( "name" );
})

app.get( "/products/:id/express", function( req, res ){
    Product.find( { _id: req.params.id }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.post( "/products/create", function( req, res ){
    let product = new Product( req.body );
    product.save( function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.put( "/products/:id", function( req, res ){
    Product.findOne( { _id: req.params.id }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{
            data.name = req.body.name;
            data.quantity = req.body.quantity;
            data.price = req.body.price;
            data.save( function( err, dat ){
                if( err ){ res.json( { message: "Error", error: err } ) }
                else{ res.json( { message: "Success", dat: dat } ) }
            })
        }
    })
})

app.delete( "/products/:id", function( req, res ){
    Product.remove( { _id: req.params.id }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.all( "*", ( req, res, next ) => {
    res.sendFile( path.resolve( "./client/dist/index.html" ) );
});

app.listen( 8000, function(){
    console.log( "listening on port 8000" );
});