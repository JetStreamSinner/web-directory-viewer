const {init_filesystem_view, display_filesystem_view} = require("./filesystem_view_component/filesystem_view");
const {create_expire_tool_tip} = require("./expire_tooltip");
const {remote_model} = require("./filesystem_models/remote_filesystem_model");

function handler_error(error) {
    if (error.code == 400) {
        create_expire_tool_tip(error.message);
    }
}

view_options = {
    "error_handler": (error) =>  handler_error(error)
}

init_filesystem_view("view_wrapper", remote_model, view_options);
display_filesystem_view();
