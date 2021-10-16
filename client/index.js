const inquirer = require('inquirer')

//fork is use to run child process
const { fork } = require('child_process');

const questions = [
    {
        type: 'input',
        name: 'clientCount',
        message: "Enter client count you want to create:"
    },
    {
        type: 'input',
        name: 'intervalTime',
        message: "Enter at how many X seconds you want to send message:"
    }
]

//fork child process as per the user input
const main = async (count, pollInterval) => {
    for (let index = 0; index < count; index++) {
        fork(__dirname + '/child', ["Child" + (index + 1), pollInterval]);
    }
}

// inquirer is used to take user input
inquirer
    .prompt(questions)
    .then((userAnswers) => {
        main(userAnswers['clientCount'], userAnswers['intervalTime'])
    })
    .catch(() => {
        console.log("Something went wrong, please try again.")
    });