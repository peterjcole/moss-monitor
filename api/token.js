const axios = require('axios')

const tokenUrl = 'https://oauth2.awair.is/v2/token'
const clientId = process.env.VUE_APP_AWAIR_CLIENT_ID
const clientSecret = process.env.AWAIR_CLIENT_SECRET
const grantType = 'authorization_code'

module.exports = async (req, res) => {
  console.log({
    clientId,
    clientSecret,
    grantType,
    code: req.body.code,

  })

  axios.post(tokenUrl, {
    'client_id': clientId,
    'client_secret': clientSecret,
    'grant_type': grantType,
    code: req.body.code
  }).then(response => {
    res.json(response.data)
  }).catch(err => {
    console.log(err)
    res.status(err.status)
  })
}
