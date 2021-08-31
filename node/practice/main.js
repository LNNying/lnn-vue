const {readFile, writeFile, inputFileStream, outputFileStream} = require('./index.js');
const {createQuestion, closeProcess} = require('./process.js');

/**
 * 先读取 在写入测试
 * @return {Promise<void>}
 */
async function textRW() {
    try {
        let data = await readFile('../file/file1.txt', {
            flag: 'r',
            encoding: 'utf-8'
        });
        let result = await writeFile('../file/textFile.txt', data.data, {
            flag: 'a',
            encoding: 'utf-8'
        });
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}
// textRW();

/**
 * 测试读写流
 * @return {Promise<void>}
 */
async function testFileStream() {
    const wr = await outputFileStream('../file/textFile.txt', {
        flag: 'r',
        encoding: 'utf-8'
    });
    const ws = await inputFileStream('../file/testStreamFile.txt', {
        flag: 'a',
        encoding: 'utf-8'
    });

    wr.on('data', data => {
        console.log('数据读取大小：' + data.length);
        ws.write(data, err => {
            err && (console.log(err));
        })
    });

    wr.on('close', () => {
        ws.end();
    });
}
// testFileStream();

/**
 * 测试输入输出交互进程
 * @return {Promise<void>}
 */
async function testProcess() {
    const name = await createQuestion('请问你的名字是什么?');
    const age = await createQuestion('请问你的年龄是多大？');
    const address = await createQuestion('请问你家的地址是哪里？');

    const content = `姓名：${name}   年龄：${age}   地址： ${address} \n`;
    const result = await writeFile('../file/process.txt', content, {
        flag: 'a',
        encoding: 'utf-8'
    });
    console.log(result);
    closeProcess();
}

testProcess();
