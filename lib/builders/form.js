module.exports = function (client, data) {
    var output = '';
    for (var key in data) {
        output += '<input type="hidden" name="' + key + '" value="' + data[key] + '">';
    }

    return output;
};
