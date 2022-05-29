const {RequestError} = require("./request_error");

async function get_dirs(work_directory) {
    const url = "/dir"

    const request_body = {
        "target_directory": work_directory
    }

    const request_options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request_body)
    }
    const response = await fetch(url, request_options);
    const json = await response.json();

    if (response.status == 400) {
        throw new RequestError(json.detail, response.status);
    }
    return json;
}

module.exports = {
    "get_dirs": get_dirs
}