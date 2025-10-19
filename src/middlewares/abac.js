const authorizeAbacData = (req,res,data) => {

    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" })
      return false;
    }
    
    if(data.created_by != req.user.id){
      res.status(401).json({ error: "Unauthorized" })
      return false;
    }

    return true;
}

module.exports = {
    authorizeAbacData
}