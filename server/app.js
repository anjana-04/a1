var express=require('express')
var bodyparser=require('body-parser')
const app=express()
var mongoose=require('mongoose')
var auth=require("./model/user")
var url="mongodb://127.0.0.1:27017/img"
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 res.setHeader('Access-Control-Allow-Credentials', true);
 next();

});
mongoose.connect(url,function(err){
    if(err) throw err
    else{
        console.log("database connected")
    }
})
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

app.post("/add",function(req,res){
    console.log(req.body)
    var u=new auth();
    u.text=req.body.pname;
    
    u.file1=req.body.pprice;
    
    u.save(function(err){
        if(err) throw err
        else{
           res.redirect("/")
        }
    })
    console.log()
    
    res.send({msg:"data from server"})
})
app.get("/viewbook",function(req,res){
    auth.find({},function(err,result){
        
        res.send(result)
    })
})
app.get("/update",function(req,res){
   
    auth.find({},(err,result)=>{
        if (err) throw err;
        else{
            console.log(result)
        res.render("update",{res:result})}
    })
})

app.listen(8000,function(req,res){
    console.log("stat")
})