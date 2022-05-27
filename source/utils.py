import os
import os.path as filesystem


def remove_brackets(path: str):
    if path[0] == "\"" and path[-1] == "\"":
        return path[1:-1]
    return path


def make_dir_body(current_dir: str, target_dir: str):
    next_dir = ""
    target_dir = remove_brackets(target_dir)

    if current_dir == target_dir:
        next_dir = current_dir
    else:
        target_dir = remove_brackets(target_dir)
        target_dir = filesystem.basename(target_dir)
        next_dir = filesystem.abspath(current_dir + "/" + target_dir)

    top_dir_exist = next_dir != "/" and next_dir != "//"
    next_dir_list = [".."] if top_dir_exist else []
    next_dir_list.extend(os.listdir(next_dir))
    return next_dir, next_dir_list
