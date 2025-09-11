const jwt = require("jsonwebtoken");

function ensureAuth(req,res,next){
    const token = req.cookies.token;
    if(!token)  return res.redirect("/login");
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.redirect("/login");
  }
}

module.exports =  ensureAuth ;
