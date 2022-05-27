import os
import os.path as filesystem


def validate_path(path: str):
    if path[0] == "\"" and path[-1] == "\"":
        return path[1:-1]
    return path


def normalize_path(current_path: str, target_path: str):
    normalized_path = ""
    if current_path == target_path:
        normalized_path = current_path
    else:
        target_path = filesystem.basename(target_path)
        normalized_path = filesystem.abspath(current_path + "/" + target_path)
    return normalized_path


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


def make_dir_body(path: str):
    directory_info = get_directory_info(path)
    return directory_info


def is_accessible(path: str):
    return os.access(path, mode=os.R_OK)


def make_error_string(path: str):
    error_string = "Access to {} restricted".format(path)
    return error_string
