function get_cookie(key) {
    const cookies = document.cookie;
    const cookies_string = cookies.split(";");
    let cookies_dict = {};
    cookies_string.forEach((cookies_string) => {
        const cookie_pair = cookies_string.split("=");
        const key_index = 0;
        const value_index = 1;

        const cookie_key = cookie_pair[key_index];
        const first_bracket_index = 1;
        const last_bracket_index = cookie_pair[value_index].length - 1;
        const cookie_value = cookie_pair[value_index];

        cookies_dict[cookie_key] = cookie_value;
    });
    return cookies_dict[key];
}

module.exports = {
    "get_cookie": get_cookie
}