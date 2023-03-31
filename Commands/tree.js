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

module.exports = {
    treeKey: treeFn
}