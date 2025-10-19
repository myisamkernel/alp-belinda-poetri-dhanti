const authorizeAbacData = (req,res,data) => {

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    if(data.created_by != req.user.id){
      return res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = {
    authorizeAbacData
}