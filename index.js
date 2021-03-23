const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
const prompt = require('prompt-sync')();
const period = Number(prompt('Period: '));
console.log(period);
const key = prompt('Key: ');
var people = [];
if (period == 1){
  people = ["Ryan Dai", "Ryan Dong", "Srideep Dornala", "Arjun Ganesan", "Dhruv Gupta",
  "Isabelle Hsu", "Yue Jiang", "Ansh Kharbanda", "William Kim", "Isabel Lai",
  "Louis Law", "Sean Lin", "Thompson Ma", "Payasa Manandhar", "Eshaan Mistry", "Sidarth Raman",
  "Gauri Renjith", "Aaryan Rustagi", "Tanish Sathish", "Ananya Setty", "Aarushi Sharma",
  "Suhani Shukla", "Ambareesh Shyam Sundar", "Selina Song", "Mithil Srungarapu", "Ritvik Suraparaju",
  "Shreyas Verma", "Vincent Wang", "Enxi Zhang", "Alice Zhu", "Ellen Zulkarnain"];
}else if (period == 2){
  people = ["Arnold Cai", "Connor Chen", "Anshul Govindu", "Bryan Jerish", "Kripa Kini",
  "Bhavesh Kumar", "Michael Lan", "Patrick Li", "Wanning Lu", "Yousuf Mustafa", "Anushka Nair",
  "Vinay Patil", "Siddharth Ramshankar", "Vikram Senthil", "Aaryan Shah", "Rishab Shah", "Uma Shankar",
  "Sanidhya Singh", "Kerrine Tai", "Masroor Uddin", "Lili Wan", "Harshith Yallampalli", "Edward Zhang",
  "Rick Zhang", "Jerry Zhao"];
}else if (period == 3){
  people = ["Rohan Adwankar", "Jiwon Ahn", "Alisha Bhat", "Nandini Borkar", "Louis Chan",
  "Saksham Dhuria", "Edi Du", "Lisa Feng", "Ben Kao", "Alvin Lin", "Mandy Liu", "Princeton Liu",
  "Urmi Mandal", "Ayush Patel", "Samah Qadeer", "Aadhav Rajesh", "Anvesh Sharma", "Hanqing Sun",
  "Neha Suresh", "Cameron Tran", "Daniel Wang", "Linden Wang", "Kaiwen Xiao", "Helen Yuan",
  "Jeffery Zang", "Michael Zheng", "Sophia Zhu"];
}else if (period == 4){
  people = ["Mehran Abbasi", "Brooke Alonzo", "Nishant Asopa", "Paige Chen", "Ian Cook",
  "Mario Delgado", "Rodrigo Antonio Granados Perez", "Destany Hostnick", "Evan Jordan",
  "Prisha Joshi", "Jayse Keeley", "Hadeed Khaki", "Nicholas Lau", "Harold Lee", "Tyson Lincavage",
  "Safwan Malik", "Gabriel Moya", "Jooyeon Oh", "Mia Ontiveros", "Emma Pham", "Samuel Ramirez Salas",
  "Patricia Riley", "Bharghav Satyanarayana", "Karan Singh", "Tabatha Soto", "Yuji Trisnadi",
  "Siddarth Vermeulen", "Eryn Yoo"];
}else if (period == 5){
  people = ["Aria Blackmun", "Ashley Block", "Juan Chanelo", "Elliotte Chrisp", "Jasmin Cruz",
  "Gurtej Deol", "Diksha Diksha", "Kirsten Anne Elloso", "Daniel Fernandez", "Madison Gossette", "Ariya Jamarani",
   "Carly Jernigan", "Leo Kuo", "Mattania Liu", "Roberto Loera", "Vaishali Madoori", "Adrian Medina", "Kyal Moe",
  "Varun Nair", "Samara Orozco-Tapia", "Joshua Pan", "Diego Preciado", "Alexzander Rafael", "Krish Rajan",
   "Alan Rivera Serrato", "Geo Sampaga", "Sonya Shetty", "Mehtaab Singh", "Bir Sohal", "Delilah Tinoco",
   "Rachael Tiong", "Travis Tsuei", "Malachi Vega"];
}
console.log(people);
let submitted = new Array(people.length).fill(0);
// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), listFiles);
  module.exports.submittedd = submitted;
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  getList(drive, '');
}
function getList(drive, pageToken){
  const str = '"' + key + '"' + ' in parents';
  console.log(str);
  drive.files.list({
    pageSize: 10,
    // q: "name='samm'",
    // q: '"0Bx0PI61hO3PBfi10NFpmYlE4aXVqSkpTMjNxNVBlZEh6OXdRa0FUTzJkT25UYXpaYUhwTnM" in parents',
    q: str,
    pageToken: pageToken ? pageToken : '',
    fields: 'nextPageToken, files(*)',
    // fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      // console.log('Loading:');
      // files.map((file) => {
      //   console.log(`${file.name} (${file.id})`);
      // });
      files.forEach(file => {
        // console.log(file);
        const owners = file.permissions;
        owners.forEach(owner => {
          // if (owner.displayName == "Frederick Z" || owner.displayName == "Accelerated Alg2/PreCalc 1 teachers" || owner.displayName == "Anne Chung"){
          if (owner.displayName == "Frederick Z" || owner.displayName == "Accelerated Alg2/PreCalc 1 teachers" || owner.displayName == "Anne Chung"){
            return true;
          }
          console.log(owner.displayName);
          if (people.indexOf(owner.displayName) != -1){
            submitted[people.indexOf(owner.displayName)] = 10;
          }
          console.log(submitted);

          for (let i=0; i<submitted.length; i++){
            if (submitted[i] == 0){
              console.log(people[i] + ": 0");
            }
          }
        })
        // console.log();
      });
      if (res.data.nextPageToken) {
        getList(drive, res.data.nextPageToken);
      }

    } else {
      console.log('No files found.');
    }
  });
}
