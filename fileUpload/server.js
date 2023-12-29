const express=require("express");
const app=express();

const multer=require("multer");
const cors=require("cors")

app.use(express.json());
app.use(cors());



const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"files/");
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+" "+file.originalname);
  }
})

const upload=multer({storage:storage});



app.post("/upload",upload.single("file"),(req,res)=>{
  res.send(req.file);

})

app.listen(3000);