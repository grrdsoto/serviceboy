const express = require('express')
var cors = require('cors')
require('dotenv').config()
var Base64 = require('js-base64').Base64;
var axios = require('axios')
const app = express()
const port = 3000
app.use(cors())

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET 


const kroger = "https://api.kroger.com/v1"
let clientinfo = client_id + ":" + client_secret;
let base64convert = Base64.encode(clientinfo)
// console.log(base64convert)
app.get('/', (req, res) => res.send('Hello World!'))
// https://api.kroger.com/v1/connect/oauth2/authorize

app.get('/connect/oauth2/token', (req, res) => {

    var settings = {
        url: kroger + "/connect/oauth2/token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${base64convert}` 
        },
        data:'grant_type=client_credentials&scope=product.compact'
      }

    axios(settings)
        .then(response => {
            res.json(
                response.data
            ) 
        })
        .catch(e => {
            console.log(e)
        })
})

//gets products list
app.get('/products',(req, res) => {

    console.log(req.header("Authorization"))
    console.log("MEEEEEEE")
    axios.get(kroger + "/products",{ 
        headers: {
        "Authorization": req.header("Authorization")
                 }
    }       
    )
      .then(response => {
        console.log(response.data);
        res.json(
            response.data
            )
    })
    .catch(e => {
        // console.log(e)
    })

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
