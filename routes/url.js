const{Router}=require("express");
const URL=require("../models/url");
const router=Router();
const ShortUniqueId=require("short-unique-id").default;
const {requireAuth}=require("../middlewares/authentication");


const uid = new ShortUniqueId({ length: 10 });


router.get("/generateURL",requireAuth,async(req,res)=>{
    return res.render("url",{
        
    });
});


router.get("/:shortId", async (req, res) => {
    
        const { shortId } = req.params;
        const urlEntry = await URL.findOne({ shortId });

        if (!urlEntry) {
            return res.status(404).send("URL Not Found");
        }

        
        
    

        res.redirect(urlEntry.redirectURL);
    
});

router.post("/generateURL",requireAuth,async(req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});
    const shortID = uid.rnd();
     const newURL=await URL.create({  
        shortId:shortID,
        redirectURL:body.url,
        
    });
    // return res.redirect("/url/generateURL",{
    //     id:shortID,
    // });
    return res.render("url", {
         id: shortID,
     });    
});



module.exports=router;
