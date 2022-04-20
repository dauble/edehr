// https://developers.google.com/sheets/api/quickstart/nodejs

const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

https://docs.google.com/spreadsheets/d/1CkEc1dmeV4tqck_at1ERaW25zspMt1n7q0lFPRCnP1I/edit#gid=1524198205

const INPUT_SPREADSHEET_ID = '1CkEc1dmeV4tqck_at1ERaW25zspMt1n7q0lFPRCnP1I'


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json'

// Load client secrets from a local file.
fs.readFile('credentials.json', 'utf8', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), getSheets)
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, 'utf-8', (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
/*
Original from sample code
  sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
 */

function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.get({
    spreadsheetId: '1CkEc1dmeV4tqck_at1ERaW25zspMt1n7q0lFPRCnP1I',
    range: 'CV-2!AC2:BA300'
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    const rows = res.data.values
    if (rows.length) {
      rows.map((row, index) => {
        console.log(`${index}: ${row}`)
        // console.log(index, row)
      })
    } else {
      console.log('No data found.')
    }
  })
}

function getSheets(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  getSheet(sheets, 'CV-3!AC2:BA300', 'raw_data/current-visit-3.txt')
}

function getSheet(sheets, range, fName) {
  sheets.spreadsheets.values.get({
    spreadsheetId: INPUT_SPREADSHEET_ID,
    range: range
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    const rows = res.data.values
    if (rows.length) {
      const data = []
      rows.map((row) => {
        const rowData = []
        row.map( (elem) => {
          rowData.push(elem.indexOf('\n') > -1 ? `"${elem}"`: elem)
        })
        const newStr = rowData.join('\t')
        data.push(newStr)
     })
      fs.writeFile(fName, data.join('\n'), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    } else {
      console.log('No data found.')
    }
  })
}

