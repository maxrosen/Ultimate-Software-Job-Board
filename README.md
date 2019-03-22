# Slackers
CS 320 Semester project based on the MERN Stack

## Folder Structure

### Backend
* backend
  * models
  * router
  * package-lock.json
  * package.json
  * server.js
  
The **models** folder contains the database schemas. Currently, we have **user.js** as a template
The **router** folder contains the api in different categories. Currently, we have **users.js** for some basic **CRUD** operation regarding to user management.
The **server.js** is the main entry point of the backend.
The **Json** files are the dependencies.

### Frontend
* client
  * public
  * src
  * package-lock.json
  * package.json
  
Details refer to [create-react-app](https://github.com/facebook/create-react-app)

## Get Started
To run **Backend**, go to **backend** folder and run `npm start`. If **backend** start correctly, there will be prompt in the console. The **backend** will be on **port 4000**.

To run **Frontend**, go to **client** folder and run `npm start`. If **frontend** start correctly, there will be page rendered on **port 3000**.

## Tips
If being prompted missing dependency, use `npm install` which will install all missing dependencies. If still not working, you can install individual ones manually.

There is also a Google drive([click here](https://drive.google.com/open?id=1pHtNcOMY7GyDvs-HadJavbgazAI0MEP_)) that contain more tutorials about the project.


