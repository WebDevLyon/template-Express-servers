const { OAuth2Client } = require("google-auth-library")
require('dotenv').config();

class GoogleAuth {
	constructor(token) {
    this.client = new OAuth2Client()
    this.token = token
	}

  async verifyToken() {
		try {
			const ticket = await this.client.verifyIdToken({
				idToken: this.token,
				audience: process.env.CLIENT_ID
			})
			const payload = ticket.getPayload()
			return {
				userid: payload["sub"],
				payload: payload,
			}
		} catch (error) {
			throw new Error(`Failed to verify token: ${error.message}`)
		}
	}
}

// Export
module.exports = GoogleAuth
