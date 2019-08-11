require("dotenv").config();
var keys = require("./keys.js");
var spotify = Spotify(keys.spotify);
var inquirer = require("inquirer");
var movie = require("./movie");
var axios = require("axios");
var fs = require("fs");