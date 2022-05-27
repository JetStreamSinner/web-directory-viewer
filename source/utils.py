import os
import os.path as filesystem


def remove_brackets(path: str):
    if path[0] == "\"" and path[-1] == "\"":
        return path[1:-1]
    return path


def get_file_meta(path: str):
    item_type = ""
    if filesystem.isdir(path):
        item_type = "directory"
    elif filesystem.isfile(path):
        item_type = "file"
    elif filesystem.islink(path):
        item_type = "link"
    else:
        item_type = "unknown"

    meta = {
        "type": item_type
    }
    return meta


def get_directory_info(path: str):
    top_exist = path != "/" and path != "//"

    next_dir_list = [".."] if top_exist else []
    next_dir_list.extend(os.listdir(path))

    next_dir_info = [
        {
            "item_name": filesystem_item,
            "meta": get_file_meta(path + "/" + filesystem_item)
        }
        for filesystem_item in next_dir_list
    ]
    return next_dir_info


def make_dir_body(current_path: str, target_path: str):
    next_path = ""
    target_path = remove_brackets(target_path)

    if current_path == target_path:
        next_path = current_path
    else:
        target_path = remove_brackets(target_path)
        target_path = filesystem.basename(target_path)
        next_path = filesystem.abspath(current_path + "/" + target_path)

    directory_info = get_directory_info(next_path)

    return next_path, directory_info
