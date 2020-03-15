# TaskAppNodeJS
This is a simple server-side application using Node.js, Express.js and MongoDB database, allowing to handle HTTP requests. This application performs CRUD operations, as well as Authorization process (using JSON Web Token). 
For testing jest framework was used. This application became a part of TasksToDo application(MEAN).
# Prerequisites
The server running the application should have NodeJS (8.x) and MongoDB installed.
Below there are steps necessary to run the application: 
# 1. Install all required dependencies
npm dependencies
```
npm install
```
# 2. Configuration
In root directory create a directory 'config' with dev.env (and test.env for testing) in it.
## 1) MongoDB
Set a variable MONGODB_URL.
If you use local MongoDB:
```
MONGODB_URL=mongodb://127.0.0.1:27017/name_of_db
```
If Atlas MongoDB:
```
MONGODB_URL=url_you_can_find_in_connection_section_of_atlas
```
## 2) ExpessJS
Set PORT variable. It can be 8080, 3000, or other:
```
PORT=port_of_your_choice
```
## 3) JSON Web Token
Set JWT_SECRET:
```
PORT=your_secret
```
## 4) SendGrid
Set SENDGRID_API_KEY:
```
SENDGRID_API_KEY=sendgrid_api_key_of_your_account
```
# 3. Start database service
If you have set path for MongoDB, then run in comand line:
```
mongod --dbpath 'path/to/your/db'
```
If no, you should change directory to bin folder of your MongoDB (for windows smth like c:\Program Files\MongoDB\Server\3.4\bin). Then run:
```
mongo.exe --dbpath 'path/to/your/db'
```
You can add more variables if you want to precise port, host, so on.
# 4. Start express server
To run express server in development mode use command:
```
npm run dev
```
For the test mode: 
```
npm test
```
# 5. Postman
To send HTTP requests you can use Postman and to see how the application works.
