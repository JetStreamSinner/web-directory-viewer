function format_timestamp(timestamp, splitter) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + (date.getDate() + 1);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formatted_time = day.substr(-2) + "-" + month.substr(-2) + "-" + year + splitter + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formatted_time;
}

module.exports = {
    "format_timestamp": format_timestamp
}