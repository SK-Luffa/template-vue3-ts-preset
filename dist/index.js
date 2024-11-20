import prompts from 'prompts'; //导入交互模块
import fs from "node:fs"; //导入文件模块
import colors from 'picocolors'; //导入颜色模块
import path from 'node:path'; //导入path模块
import { fileURLToPath } from 'node:url'; //路径模块
import { cwd } from 'node:process';
const { blue, blueBright, cyan, green, greenBright, magenta, red, redBright, reset, yellow, } = colors;
const defaultPreset = "vite-Preset"; //默认名称
let finalName = ""; //最终名称
async function init() {
    const renameFiles = {
        _gitignore: '.gitignore',
    };
    const name = await prompts({
        type: 'text',
        name: "vite-Preset",
        message: green('Entry Name:'),
        initial: 'vite-Preset',
        onState: (state) => {
            finalName = formatTargetDir(state.value) || 'vite-Preset';
        }
    });
    if (fs.existsSync(finalName)) { //判断是否存在名称相同的文件夹
        console.log(red("Error：") + green("Entry Name：“") + yellow(finalName) + green("” Already exists, please re-enter"));
        init();
    }
    fs.mkdirSync(finalName); //在当前文件夹下创建文件夹
    const root = path.join(cwd(), finalName);
    console.log(root);
    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
    const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.');
    const template = 'vue-ts';
    const templateDir = path.resolve(//获取当前文件夹下的我们指定的模版路径 绝对路径
    fileURLToPath(import.meta.url), '../..', `template-${template}`);
    const write = (file, content) => {
        const targetPath = path.join(root, renameFiles[file] ?? file);
        if (content) {
            fs.writeFileSync(targetPath, content);
        }
        else {
            copy(path.join(templateDir, file), targetPath);
        }
    };
    const files = fs.readdirSync(templateDir);
    for (const file of files.filter((f) => f !== 'package.json')) {
        write(file);
    }
    const pkg = JSON.parse(//获取模版package的配置内容
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'));
    pkg.name = finalName; //设置构建项目的 package的项目名称为我们输入的名称
    write('package.json', JSON.stringify(pkg, null, 2) + '\n');
}
function copy(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) { //判断是不是目录，如果是目录就调用copyDir 创建目录//如果不是目录就拷贝文件（异步拷贝）
        copyDir(src, dest);
    }
    else {
        fs.copyFileSync(src, dest);
    }
}
function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true }); //创建目标目录
    for (const file of fs.readdirSync(srcDir)) { //读取源目录下的所有目录及其文件
        const srcFile = path.resolve(srcDir, file); //源文目录或文件地址
        const destFile = path.resolve(destDir, file); //目标目录或文件地址
        copy(srcFile, destFile); //拷贝执行
    }
}
function pkgFromUserAgent(userAgent) {
    if (!userAgent)
        return undefined;
    const pkgSpec = userAgent.split(' ')[0];
    const pkgSpecArr = pkgSpec.split('/');
    return {
        name: pkgSpecArr[0],
        version: pkgSpecArr[1],
    };
}
function formatTargetDir(targetDir) {
    return targetDir?.trim().replace(/\/+$/g, '');
}
init();
