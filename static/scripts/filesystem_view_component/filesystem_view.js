const {format_timestamp} = require("../utils");

const view_template =
    `<table class="filesystem_view">
        <thead>
        <tr class="view_header stretch_row default_font view_row">
            <th class="header_item">Name</th>
            <th class="header_item">Size</th>
            <th class="header_item">Last modify</th>
        </tr>
        </thead>
        <tbody class="view_body">
        </tbody>
    </table>`;

let directory_information_source = null;
let module_options = {
    "view_item_generator": (item_text, item_type, item_size, last_modify_time) => {
        return create_directory_item_node(item_text, item_type, item_size, last_modify_time, module_options.click_handler);
    },
    "click_handler": (event) => {
        return item_clicked(event, directory_information_source);
    },
    "error_handler": (error) => {
        console.log(error.stack);
    }
}

function init_view(target_node_id, information_source, view_options) {
    for (let key in view_options) {
        if (key in module_options) {
            module_options[key] = view_options[key];
        }
    }

    const target = document.getElementById(target_node_id);
    target.innerHTML = view_template;
    directory_information_source = information_source;
}

async function display_view() {
    const current_directory_info = await directory_information_source.get_current_directory_info();
    update_view(current_directory_info);
}

async function item_clicked(event, directory_information_source) {
    const next_dir_path = event.currentTarget.childNodes[0].childNodes[1].innerText;
    try {
        const next_dir_info = await directory_information_source.move_to_directory(next_dir_path);
        update_view(next_dir_info);
    } catch (err) {
        module_options.error_handler(err);
    }
}

function get_icon_path(type) {
    const path_to_resources = "/static/resources/images/";
    const path_to_file_icon = path_to_resources + "/" + "file_icon.png";
    const path_to_folder_icon = path_to_resources + "/" + "folder_icon.png";
    const path_to_filelink_icon = path_to_resources + "/" + "filelink_icon.png";

    switch (type) {
        case "directory":
            return path_to_folder_icon;
        case "file":
            return path_to_file_icon;
        case "link":
            return path_to_filelink_icon;
        default:
            return "";
    }
}

function create_directory_item_node(item_text, item_type, item_size, last_modify_time, item_click_handler) {
    const row_node = document.createElement("tr");
    row_node.className = "view_item view_row";
    row_node.addEventListener("click", (event) => module_options.click_handler(event));

    const name_node = document.createElement("td");
    const image_item = document.createElement("img");
    image_item.src = get_icon_path(item_type);
    image_item.className = "item_icon no_select";

    const text_item = document.createElement("span");
    text_item.className = "no_select default_font filename";
    text_item.innerText = item_text;
    name_node.className = "text_cell fill_width";
    name_node.appendChild(image_item);
    name_node.appendChild(text_item);

    const size_node = document.createElement("td");
    size_node.innerText = item_size;
    size_node.className = "no_select fill_wdith";

    const last_modify_node = document.createElement("td");
    last_modify_node.className = "no_select fill_width";
    last_modify_node.innerText = format_timestamp(last_modify_time, " ");

    row_node.appendChild(name_node);
    row_node.appendChild(size_node);
    row_node.appendChild(last_modify_node);

    return row_node;
}

function update_view(directory_info) {
    const items_view = document.getElementsByClassName("view_body")[0];
    const items = directory_info["directory_info"];
    clear_view();

    items.forEach((directory_item) => {
        const item_text = directory_item["item_name"];
        const item_type = directory_item["meta"]["type"];
        const item_size = directory_item["meta"]["size"];
        const last_modify_time = directory_item["meta"]["last_modification"];
        const item = module_options.view_item_generator(item_text, item_type, item_size, last_modify_time);
        items_view.appendChild(item);
    });
}

function clear_view() {
    const view_body = document.getElementsByClassName("view_body")[0];
    view_body.innerText = "";
}

module.exports = {
    "init_filesystem_view": init_view,
    "display_filesystem_view": display_view
}
