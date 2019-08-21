# Item Details Component
## Author
   * Kevin Bench - https://github.com/kbench09
## An Item Description designed to mimic Ebay 
   * This is a component of a webpage designed with Service Oriented Architecture.
   * This was build as a part of a larger group project during my time at Hack Reactor.
   * Renders an item based on user selection, and allows users to add that item to the shopping cart for purchase.
## Tech Stack
   * Database - MongoDB hosted on MongDB Atlas Cloud platform
   * Server - Express.js framework running on Node.js
   * React - A Javascript library on the front end to handle the User-Interface.
   * Deployed using PM2, Nginx, and AWS EC2.
## Challenges
   * First Deployed Web application.
   * Using MongoDB for the first time. Learned how to query and interact with the database with Mongoose.
 ![Component Screenshot](https://kbench09git.s3.us-east-2.amazonaws.com/Screen+Shot+2019-07-19+at+4.15.24+PM.png)
## How it works
    * This app works as one component out of five that combine to create a SOA. Event handlers pass data between each of the    components to handle changes.
    * Multiple item details are pulled in to render different details based on user selection.  
## Future plans
    * I would like to refactor this to use React Hooks, build out other pages such as a home page, and the ability to add   remove items
