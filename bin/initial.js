#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

const GET_FILENAME_INCURRENT_DIR = (s) => {
    let files = fs.readdirSync(process.cwd());
    return files.indexOf(s) >= 0;
};

const OUT = (s) => {
    process.stdout.write(s);
};

const EXCE_FUNC = (s) => {
    console.log('正在执行,请稍等...n分钟');
    let timer = setInterval(() => {
        OUT('-');
    }, 30);
    return new Promise((resolve, reject) => {
        exec(s, (err, stdout, stderr) => {
            clearInterval(timer);
            timer = null;
            if(err){console.log('项目初始化失败', err);reject(1); return ;}
            console.log('\r\n初始化项目完成');
            resolve(stdout);
        });
    });
};

const MAIN = async  () => {
    let l = process.argv.length;
    let sName = process.argv[l - 1];
    let reg = /(.+)?\/.+/;
    if(reg.test(sName)){
        sName = 'ReactFrontProjectStructure';
        console.log('默认项目名称为"ReactFrontProjectStructure"');
    }
    let b = GET_FILENAME_INCURRENT_DIR(sName);
    if(b){
        console.log(`初始化失败,当前目录下已有${sName}的同名的文件或文件夹...`);
        return ;
    }
    let result = await EXCE_FUNC(`git clone https://github.com/huoxuhuoxu/ReactFrontProjectStructure.git ${sName}`);
    if(result === 1){
        console.log('抱歉,请查看package确认当前环境可以进行项目初始化...');
        return ;
    }
    console.log(`请查看${sName}项目根目录下,README.md文件,开始你的旅途吧!`);
};



MAIN();




