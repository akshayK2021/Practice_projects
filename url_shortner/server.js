const express=require("express");
const app=express();
const urlparse=require("url-parse")
app.use(express.json());

const letters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let address = new Map();
let url_contain=new Map();

function isValid(url){
  try{
    const parse=new urlparse(url);

    return parse.host!=='' && parse.protocol!=='';

  }catch(err){

  }
}

function generateUrl(ln){
  let new_url="";
  for(let i=0;i<ln;i++){
    new_url+=letters[Math.floor(Math.random()*51)];

    

  }
  return new_url;
}





app.get("/short",(req,res)=>{
  const str=req.query.url;
  if(!isValid(str)){
    return res.send({
      msg:"please enter the valid url"
    })

  }
  const url=str.substring(8);
  const ar=url.split("/");
  const ln=ar.length;

  if(url_contain.has(url)){
    return res.send(`localhost:3000/ak/${url_contain.get(url)}`);
  }
 
  
  const new_url=generateUrl(ln);
  while(address.has(new_url)){
    new_url=generateUrl(ln);
    
  }
  address.set(new_url,url);
  url_contain.set(url,new_url);

  return res.send(`localhost:3000/ak/${new_url}`);

})

app.get("/ak/:url",(req,res)=>{
  try{
  const new_url=req.params.url;
  if(!address.has(new_url)){
    return res.send({
      msg:"Please enter the valid short url"
    })
  }
  const url=address.get(new_url);
  console.log(url);
  return res.redirect(301, `https://${url}`);
  }
  catch(err){
    res.send({
      msg:"error occured"
    })
    
  }

})

app.listen(3000);
