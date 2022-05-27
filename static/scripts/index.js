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
        const cookieValue = cookiePair[valueIndex];

        cookiesDict[cookieKey] = cookieValue;
    });
    return cookiesDict[key];
}

async function get_dirs(work_directory) {
    const url = "/dir"

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

function create_directory_item_node(item_title) {
    const node = document.createElement("li");

    const path_to_folder_icon = "/static/resources/images/folder_icon.png"
    const imageItem = document.createElement("img");
    imageItem.src = path_to_folder_icon
    imageItem.className = "item_icon";

    const textItem = document.createElement("span");
    textItem.innerText = item_title;

    node.appendChild(imageItem);
    node.appendChild(textItem);
    node.className = "directory_item";
    node.addEventListener("click", (event) => {
        const next_dir = event.target.innerText;
        get_dirs(next_dir)
            .then((dirs) => {
                updateView(dirs);
            })
    })
    return node;
}

function updateView(dirs) {
    const itemsView = document.getElementsByClassName("directory_items")[0];
    itemsView.innerHTML = "";
    const items = dirs["directory_items"];
    items.forEach((directoryItem) => itemsView.appendChild(create_directory_item_node(directoryItem)));
}


const current_dir = get_cookie("dir");
get_dirs(current_dir).then((dirs) => {
    updateView(dirs);
});