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

module.exports = {
    organizeKey: organizeFn
}