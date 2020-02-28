const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
const generateHTML = require("./generateHTML");
const open = require("open")


function init() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your github username?",
                name: "username"
            },
            {
                type: "checkbox",
                message: "What is your favorite color?",
                name: "colors",
                choices: ["pink", "blue", "green", "red"]
            },

        ]).then(function (answers) {
            let username = answers.username
            let color = answers.colors
            console.log(answers);


            axios
                .get("https://api.github.com/users/" + username)
                .then(function (res) {
                    console.log(res);

                    axios
                        .get("https://api.github.com/users/" + username + "/repos?page=2&per_page=1000")
                        .then(function (repoRes) {
                            console.log(repoRes);
                            res.data.stars = 0;
                            for (let i = 0; i < repoRes.length; i++) {
                                res, data.stars += repoRes.data[i].stargazers_count;
                            }
                            res.data.color = color;
                            pdf.create(generateHTML(res.data)).toFile("./resumeExample.pdf", function (err, res) {
                                console.log(res);
                            }
                            );

                        });

                });




        });

    }



init();
