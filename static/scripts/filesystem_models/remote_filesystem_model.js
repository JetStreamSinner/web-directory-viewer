const {get_dirs} = require("../api");
const {get_cookie} = require("../cookie");

function get_current_directory() {
    const current_directory_cookie_key = "dir";
    return get_cookie(current_directory_cookie_key);
}

async function get_current_directory_info() {
    const current_directory = get_current_directory();
    const current_directory_info = await get_directory_info(current_directory);
    return current_directory_info;
}

async function get_directory_info(path) {
    const directory_info = await get_dirs(path);
    return directory_info;
}

module.exports = {
    "remote_model": {
        "get_current_directory": get_current_directory,
        "get_current_directory_info": get_current_directory_info,
        "get_directory_info": get_directory_info,
        "move_to_directory": get_directory_info
    }
}

