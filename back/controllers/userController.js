

// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

export const Logout = (req, res) => {

  req.session.destroy((err)=>{
      res.redirect("/login")
  })

}
