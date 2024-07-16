//Import modules et compléments
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

//Get controllers
//Post controllers
exports.register = async (req, res) => {
  if (req.body) {
    const password = await bcrypt.hash(req.body.password, 10)
		const user = {
      name: req.body.name,
			email: req.body.email,
			password: password
		}
    
    //Dans le cadre du DB sous format json
		const data = JSON.stringify(user)
		var dbUserEmail = require('./db/user.json').email
    
		if (dbUserEmail === req.body.email) {
      res.sendStatus(400)
		} 
		else {
      fs.writeFile('./db/user.json', data, err => {
        if (err) {
          console.log(err + data)
				} else {
          const token = jwt.sign({ user }, 'the_secret_key')
					// In a production app, you'll want the secret key to be an environment variable
					res.json({	
            token,
						email: user.email,
						name: user.name
					})
				}
			})
		} //Fin partie db sous format json
	} else {
    res.sendStatus(400)
	}
}
//Put controllers