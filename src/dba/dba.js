const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'seller_management'
});

con.connect((err)=> {
    if (err) {
        console.log('Error on connect to database')
        console.log(err);
        throw err
    }
    console.log(`Connected to ${con.host}`);
})

const makeQuery = ( query ) => {
    return new Promise( (res, rej) => {
        con.query(query, (err, result) => {
            if(err) rej(err)
            else res(result)
        })
    })
}

module.exports = {
    con,
    makeQuery
};