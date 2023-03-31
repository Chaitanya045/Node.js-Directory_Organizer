let utility = {}
utility.types = {
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

module.exports = utility;