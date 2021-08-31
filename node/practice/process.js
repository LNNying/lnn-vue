/**
 * 输入输出交互
 */

const readLine = require('readline');

/**
 * 实例化接口
 * process 进程
 */
let rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('close', () => {
    process.exit(0);
})

function createQuestion(question) {
    return new Promise((resolve, reject) => {
       try {
           rl.question(question, answer => {
               resolve(answer);
           })
       } catch (e) {
           reject(e);
       }
    });
}


function closeProcess() {
    rl.close();
}

module.exports = {
    createQuestion,
    closeProcess
};
