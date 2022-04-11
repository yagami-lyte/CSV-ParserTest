var payload=[]

function csvReader() {
    var csv = document.getElementById("csv_id").files[0];
    const reader = new FileReader();
    reader.onload = async function (event) {
        csv = event.target.result
        var lines = csv.toString().split("\n");
        console.log(lines)
        var result = [];
        console.log(lines[0])
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length-1; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }


        console.log(result)
        const response = await fetch('csv', {
            method: 'POST',
            body: JSON.stringify(result)
        })
        if (response.status === 200) {
            var jsonData =  await response.json();
            console.log(jsonData)
        }
        response.forEach(element => {
            const node = document.createElement("li");
            const textnode = document.createTextNode(`Line Number ${Object.keys(element)[0]}: ${element[Object.keys(element)[0]]}`);
            node.appendChild(textnode);
            document.getElementById("error_msgs_list").appendChild(node)
        });

    };
    reader.readAsText(csv);
}

function addDataToJson() {
    let jsonObj = {}
    var field = document.getElementById("field")
    var type = document.getElementById("type")
    var value = document.getElementById("text_file_id").files[0]
    var max_len = document.getElementById("max-len")
    var min_len = document.getElementById("min-len")
    var fixed_len = document.getElementById("fixed-len")
    jsonObj["fieldName"] = field.value
    jsonObj["type"] = type.value
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
        let text = e.target.result
        jsonObj["values"] = text.split('\n')
    });
    reader.readAsText(value)
    jsonObj["maxLength"] = max_len.value
    jsonObj["minLength"] = min_len.value
    jsonObj["length"] = fixed_len.value
    payload.push(jsonObj)
}

