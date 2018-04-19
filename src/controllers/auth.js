const authModel = require('../models/auth')
const jwt = require('jsonwebtoken')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// Login Controller
//
// 1. Make sure that request is good
// 2. Attempt Login
// 3. Create token
// 4. Send back token
//////////////////////////////////////////////////////////////////////////////

function login(req, res, next){
  // 1. Make sure that request is good
  if(!req.body.username){
    return next({ status: 400, message: 'Bad request'})
  }

  if(!req.body.password){
    return next({ status: 400, message: 'Bad request'})
  }

  // 2. Attempt Login
  authModel.login(req.body.username, req.body.password)
  .then(function(user){

    // 3. Create token
    const token = jwt.sign({id: user.id}, process.env.SECRET)

    // 4. Send back token
    return res.status(200).send({ token })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

function isAuthenticated(req, res, next){

}

function isSelf(req, res, next){

}



module.exports = {
  login,
  isAuthenticated,
  isSelf
}
