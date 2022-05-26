const url = "/dir"

function get_cookie(key) {
    const cookies = document.cookie;
    const cookiesStrings = cookies.split(";");
    let cookiesDict = {

    };
    cookiesStrings.forEach((cookieString) => {
        const cookiePair = cookieString.split("=");
        const keyIndex = 0;
        const valueIndex = 1;

        const cookieKey = cookiePair[keyIndex];
        const firstBracketIndex = 1;
        const lastBracketIndex = cookiePair[valueIndex].length - 1;
        const cookieValue = cookiePair[valueIndex].slice(firstBracketIndex, lastBracketIndex);

        cookiesDict[cookieKey] = cookieValue;
    });
    return cookiesDict[key];
}

async function get_dirs(work_directory) {
    const requestBody = {
        "cwd": work_directory
    }

    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
}

function move_to_dir() {

}

function create_directory_item_node(item_title) {
    const node = document.createElement("li");
    node.innerText = item_title;
    node.className = "directory_item";
    return node;
}


const current_dir = get_cookie("dir");
const directoryItems = get_dirs(current_dir).then((dirs) => {
    const itemsView = document.getElementsByClassName("directory_items")[0];
    const items = dirs["directory_items"];
    items.forEach((directoryItem) => itemsView.appendChild(create_directory_item_node(directoryItem)));
});