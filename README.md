# Yelp Camp

## Overview

Yelp Camp is a full-stack website project that allows users to explore, create, and review campgrounds. It provides a platform for users to discover new camping destinations, share their experiences, and connect with fellow outdoor enthusiasts. You can visit the website [https://yelp-camp-tkfu.onrender.com](https://yelp-camp-tkfu.onrender.com/).

## Screenshots

### Homepage
![Homepage](./public/images/screenshots/homepage.png)

### All Campgrounds Page
![All Campgrounds Page](./public/images/screenshots/all-campgrounds.png)

### Show Page
![Show Page](./public/images/screenshots/show-page.png)

### New Campground Page
![New Campground Page](./public/images/screenshots/new-page.png)

### Edit Campground
![Edit Campground Page](./public/images/screenshots/edit-page.png)

### Login & Register Page
![Login & Register Page](./public/images/screenshots/login-and-register.png)

## Technologies Used

### Frontend 

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

### Backend

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### Authentication

![Passport](https://img.shields.io/badge/Passport-34E27A?logo=passport&logoColor=000&style=for-the-badge)

### Template Engine

![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=white)

### Deployment

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Instructions

To run the Yelp Camp project locally, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone https://github.com/akdevv/yelp-camp.git
```

2. Navigate to the project directory:
```bash
cd yelp-camp
```

3. Install dependencies using npm:
```bash
npm install
```

4. Set up the environment variables:
    - Create your account on [MongoDB](https://www.mongodb.com/) and get DB url
    - Create you account on [Mapbox](https://cloudinary.com/) and get Access Token
    - Create your account on [Cloudinary](https://cloudinary.com/) and get API keys
    - Create a `.env` file in the root directory
    - And add the following environment variables:
    ```js
        CLOUDINARY_CLOUD_NAME=<<your-cloud-name>>
        CLOUDINARY_API_KEY=<<your-api-key>>
        CLOUDINARY_API_SECRET=<<your-api-secret>>
        MAPBOX_TOKEN=<<your-mapbox-token>>
        DB_URL=<<your-mongodb-url>>
        SECRET=<<secret-pharase>>
    ```

5. Run the project:
```bash
npm start
```

6. Access the application through your web browser at `http://localhost:3000`.

## File Structure

```
├── cloudinary/                 # cloudinary config script
├── controllers/                # backend controllers (express)
├── models/                     # backend models (mongoose)
├── public                      # static assets
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
├── routes/                     # backend route handlers
├── seeds/                      # database seeding scripts
├── utils/                      # utility functions
├── views/                      # server-side rendered views (EJS)
│   ├── campgrounds             # campground views
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── layouts                 # boilerplate layout
│   │   └── boilerplate.ejs
│   ├── partials                # EJS partials (flash msg, footer & navbar)
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── users                   # users views
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── error.ejs
│   └── home.ejs
├── app.js                      # main script file
├── middleware.js               # custom middleware functions
├── schemas.js                  # joi validation schemas
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Credits

This project was created with reference to the Udemy course [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) by **Colt Steele**. I appreciate the valuable insights and knowledge gained from the course.
