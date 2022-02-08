const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);

// cb : call back
const getProductsFromFile = cb => {  
    fs.readFile(p, (err, fileContent) => {
        if (err){
            return cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(title){
        this.title = title;
    }

    // just like a function without function keyword
    save(){
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}