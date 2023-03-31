#!/usr/bin/env node
let fs = require("fs");
let path = require("path"); 
// let helpObj = require("C:\\WebDevelopment\\First_project\\Commands\\help.js");
// let treeObj = require("C:\\WebDevelopment\\First_project\\Commands\\tree.js");
// let organizeObj = require("C:\\WebDevelopment\\First_project\\Commands\\organize.js");
// const tree = require("./Commands/tree");
let inputArr = process.argv.slice(2);
let types = {
    audio : ['.aif', '.cda', '.mid', '.midi', '.mp3', '.mpa', '.ogg', '.wav', '.wma', '.wpl'],
    image : ['.ai', '.bmp', '.gif', '.ico', '.jpg', '.jpeg', '.png', '.ps', '.psd', '.svg', '.tif', '.tiff', '.webp'],
    app : ['apk', '.bat', '.bin', '.com', '.exe', '.gadget', '.jar', '.msi', '.py', '.wsf'],
    database : ['.csv', '.dat', '.db', '.dbf', '.log', '.mdb', '.sav', '.sql', '.tar', '.xml'],
    disc : ['.bin', '.dmg', '.iso', '.toast', '.vcd'],
    archives : ['.7z', '.arj', '.deb', '.pkg', '.rar', '.rpm', '.tar.gz', '.z', '.zip'],
    presentation : ['.key', '.odp', '.pps', '.ppt', '.pptx'],
    programs : ['.c', '.cgi', '.pl', '.class', '.cpp', '.cs', '.h', '.java', '.php', '.py', '.sh', '.swift', '.vb'],
    spreadsheet : ['.ods', '.xls', '.xlsm', '.xlsx'],
    video : ['.3g2', '.3gp', '.avi', '.flv', '.h264', '.m4v', '.mkv', '.mov', '.mp4', '.mpg', '.mpeg', '.rm', '.swf', '.vob', '.webm', '.wmv'],
    textfile : ['.doc', '.docx', '.pdf', '.rtf', '.tex', '.txt', '.wpd']

}
// console.log(inputArr);
//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help 
let command = inputArr[0];
switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn(inputArr[1]);
        break;
    default:
        console.log("Plase🙏 enter valid command. You can try 'help' command to get the list of commands");
        break;
}

function organizeFn(dirPath){
    // console.log("organize command executed");
    let destPath;
    if(dirPath==undefined){
        destPath = process.cwd();
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            destPath = path.join(dirPath, "organized_files");
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);
            }

        }else{
            console.log("Please enter the correct path.");
        }
    }
    organizeHelper(dirPath, destPath);
}


function organizeHelper(src, dest){
    let childNames = fs.readdirSync(src);
    for(let i=0; i<childNames.length; i++){
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category = getCategory(childNames[i]); 
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category){
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
}

function getCategory(name){
    let ext = path.extname(name);

    for(let type in types){
        let cTypeArray = types[type];
        for(let i=0; i<cTypeArray.length; i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return others;
}

function treeFn(dirPath){
    // console.log("Tree command executed");
    let destPath;
    if(dirPath==undefined){
        destPath = process.cwd();
        treeHelper(destPath, "");
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            treeHelper(dirPath,"");

        }else{
            console.log("Please enter the correct path.");
        }
    }
}


function treeHelper(dirPath, indent){
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile){
        let fileName = path.basename(dirPath);
        console.log(indent+"|---"+fileName);
    }else{
        let dirName = path.basename(dirPath);
        console.log(indent+"'--"+dirName);
        let childrens = fs.readdirSync(dirPath);
        for(let i=0; i<childrens.length; i++){
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent, "\t");
        }
    }
}


function helpFn(dirPath){
    console.log(`
    List of all the commands:
                node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help 
    `);
    
}
