
const express=require('express')
const app=express()
const https=require('https')
const CoinMarketCap = require('coinmarketcap-api')
const apiKey = '873fa67d-60a6-444f-8228-a44286ca2c8d'
const client = new CoinMarketCap(apiKey)




app.use(express.static(__dirname + '/public'));


const arrName=[]
const arrSym=[]
const arrPrice=[]
const arrVol=[]
const arrVolChg=[]



app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


app.post("/",async(req,res)=>{
    
   let limit=await client.getTickers({limit: 100},{sort:'total_supply'})
console.log(limit.data[0])
 limit.data.map(item=>{
     let price=item.quote.USD.price
     arrPrice.push(price.toFixed(2))

     let name=item.name
     arrName.push(name)
     
     let symbol=item.symbol
     arrSym.push(symbol)

     let volume=item.quote.USD.volume_24h
     arrVol.push((volume/1000000).toFixed(1))

     let volumechange=item.quote.USD.volume_change_24h
     arrVolChg.push(volumechange.toFixed(2))
 })
 res.write("Symbol"+"                    "+"Price(Usd)"+"                  "+"Volume(in Millions)"+"       "+"Volume_change"+"                 "+"Name"+"\n\n\n")
for(let i=0;i<arrPrice.length;i++){
    res.write(arrSym[i]+"                      ")
    res.write(arrPrice[i]+"                    " )
    res.write(arrVol[i]+"M"+"                    ")
    res.write(arrVolChg[i]+" %"+"                    ")
    res.write(arrName[i]+"                    \n\n")
    
}
res.send()
    
})
app.listen('3000',()=>{

    console.log("i am listening")
})























