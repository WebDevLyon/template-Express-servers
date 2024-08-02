//Import modules et compléments
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const fs = require("fs")
const { handleLogin, handleGoogleLogin } = require("../utilities/authUtilities")

//const GoogleAuth = require("../utilities/google")

const ConnectionTypes = {
	LOGIN: "login",
	GOOGLE: "Google",
}

//Get controllers
//Post controllers
exports.register = async (req, res) => {
	if (req.body) {
		const password = await bcrypt.hash(req.body.password, 10)
		const user = {
			name: req.body.name,
			email: req.body.email,
			password: password,
		}

		//Dans le cadre du DB sous format json
		const data = JSON.stringify(user)
		var dbUserEmail = require("./db/user.json").email

		if (dbUserEmail === req.body.email) {
			res.sendStatus(400)
		} else {
			fs.writeFile("./db/user.json", data, (err) => {
				if (err) {
					console.log(err + data)
				} else {
					const token = jwt.sign({ user }, "the_secret_key")
					// In a production app, you'll want the secret key to be an environment variable
					res.json({
						token,
						email: user.email,
						name: user.name,
					})
				}
			})
		} //Fin partie db sous format json
	} else {
		res.sendStatus(400)
	}
}

exports.login = async (req, res) => {
	try {
		const userDB = fs.readFileSync("./db/user.json")
		const userInfo = JSON.parse(userDB)

		if (
			!req.body ||
			!req.body.typeOfConnect ||
			!req.body.userInformations
		) {
			return res.status(400).json({ error: "Invalid request" })
		}
		const { typeOfConnect, userInformations } = req.body

		if (typeOfConnect == ConnectionTypes.LOGIN) {
			try {
				const response = await handleLogin(userInformations, userInfo)
				res.json(response)
			} catch (error) {
				res.status(400).json({ error: error.message })
			}
		} else if (typeOfConnect == ConnectionTypes.GOOGLE) {
			try {
				const response = await handleGoogleLogin(
					userInformations,
					userInfo
				)
				res.json(response)
			} catch (error) {
				res.status(400).json({ error: error.message })
			}
		} else {
			res.status(400).json({ error: "Unknown connection type" })
		}
	} catch (error) {
		console.error("Error during login process:", error.message)
		res.status(500).json({ error: "Internal server error" })
	}
}
//Put controllers
