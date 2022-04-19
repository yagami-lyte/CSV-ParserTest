var payload=[]
var result = []
var fields = []
var fieldCount = 0


function removeConfiguredFields() {
    var addedField = document.getElementById("field");
    addedField.remove(addedField.selectedIndex);
}

function csvReader() {
    var csv = document.getElementById("csv_id").files[0];
    const reader = new FileReader();
    reader.onload = async function (event) {
        csv = event.target.result
        var lines = csv.toString().split("\n");
        //document.getElementById("field").innerHTML = lines[0];
        console.log(lines)
        console.log(lines[0])
        var headers = lines[0].split(",");
        showColFields(headers);
        fields.push(headers)
        for (var i = 1; i < lines.length-1; i++) {
            var obj = {};
            var currentLine = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
    };
    reader.readAsText(csv);
}

function showColFields(lines){
    var arr = lines[0].split(",")
    for (var i = 1, j = 0; i <= lines.length; i++,j++){
    fieldCount += 1
    var row = document.createElement('div');
    row.setAttribute("class", "row")
    row.setAttribute("id", `row${lines[j]}`)
    //row.setAttribute("style", "display: flex;")
    row.innerHTML = `<div id="fields">
                       <h4> ${lines[j]}</h4>

                     <div style="display:flex; ">
                         <div class="input-field col s4"
                          style="display:flex;  background: transparent;width: 400px; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 0.5px solid black;border-top: 1px solid black;border-radius: 5000px;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">
                            <label for="type">Type</label>
                            <select placeholder="Choose Type" data-cy="type" id="type${lines[j]}" onchange="showDateTimeOption(this.value,this.id , 'datetime${lines[j]}');">
                               <option value="">Choose Type of Data</option>
                                <option value="Number">Number</option>
                                <option value="AlphaNumeric">AlphaNumeric</option>
                                <option value="Alphabets">Alphabets</option>
                                <option value="Date Time">Date Time</option>
                            </select>
                         </div>


                         <div class="input-field  col s4"
                         style="display:flex;  background: transparent;width: 300px;margin-right: 3% ;margin-left:3%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 0.5px solid black;border-top: 1px solid black;border-radius: 5000px;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">
>
                             <label for="datetime" id="formats"> Date-Time Format</label>
                             <select placeholder="Choose date time format"  name="datetime" id='datetime${lines[j]}' style='display:none;'>
                                  <option>"choose date time format"</option>
                                  <option value="MM-dd-yyyy">MM-dd-yyyy</option>
                                  <option value="HH:mm:ss.SSSZ">HH:mm:ss.SSSZ</option>
                                  <option value="MMMM dd, yy">MMMM dd, yy</option>
                                  <option value="yy/MM/dd">yy/MM/dd</option>
                                  <option value="dd/MM/yy">dd/MM/yy</option>
                                  <option value="MMM dd, yyyy hh:mm:ss a">MMM dd, yyyy hh:mm:ss a</option>
                                  <option value="MMM dd HH:mm:ss ZZZZ yyyy">MMM dd HH:mm:ss ZZZZ yyyy</option>
                                  <option value="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'">yyyy-MM-dd'T'HH:mm:ss.SSS'Z'</option>
                             </select>
                         </div>


                         <div class="input-field  col s4"
                                                 style="display:flex;  background: transparent;width: 300px;margin-right: 3% ;margin-left:3%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 0.5px solid black;border-top: 1px solid black;border-radius: 5000px;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">

                            <label for="fixed-len">Length</label>
                            <input placeholder="Enter length"  type="number" id="fixed-len${lines[j]}" data-cy="fixed-len">
                         </div>
                       </div>

                         <div style="display:flex; ">

                         <div class="input-field  col s4"
                                                  style="display:flex;  background: transparent;width: 300px;margin-right: 3% ;margin-left:3%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 0.5px solid black;border-top: 1px solid black;border-radius: 5000px;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">

                             <label for="text_file_id">Values</label>
                             <input class="custom-file-input" type="file" name="text-file" data-cy="text_file_id" id="text_file_id${lines[j]}" accept=".txt">
                             <h5 style="font-size:20px;"> or </h5>
                             <textarea placeholder="Type Allowed values in new lines" id="textArea${lines[j]}"></textarea>
                         </div>


                         <div class="input-field  col s4"
                                                  style="display:flex;  background: transparent;width: 300px;margin-right: 3% ;margin-left:3%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 0.5px solid black;border-top: 1px solid black;border-radius: 5000px;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">

                             <label for="dependent">Dependent On</label>
                             <select placeholder="Choose dependant-field" name="dependentField" style="display: block;" id="dependent${lines[j]}">
                                 <option value="">Choose DateTime Pattern</option>
                                     ${lines.map((element) => {
                                         return `<option value='${element}'>${element}</option>`;
                                     })}
                             </select>
                         </div>

                         <div class="input-field  col s4"
                                                  style="display:flex;  background: transparent;width: 300px;margin-right: 3% ;margin-left:3%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 0.5px solid black;border-top: 1px solid black;border-radius: 5000px;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">

                             <label for="dep-val">Dependent Value</label>
                             <input type="text" id="dep-val${lines[j]}" data-cy="dep-val">
                         </div>
                    </div>
                     <br> </br> <br>
                      </div>
                 `
    document.getElementById("myform").appendChild(row)
}
console.log(fieldCount)
}

function showDateTimeOption(value , dateTimeID , valueID){
    var element = document.getElementById(dateTimeID);
    var elementForFormats = document.getElementById(valueID);
    if(value === 'Date Time'){
        element.style.display='block';
        elementForFormats.style.display='block';
    }
    else{
        element.style.display='none';
        elementForFormats.style.display='none';
    }
}

//function showHideTextarea() {
//if (document.getElementById('textAreaDiv').style.visibility="hidden")
//{
//document.getElementById('textAreaDiv').style.visibility="visible";
//}
//else
//{
//document.getElementById('textAreaDiv').style.visibility="hidden";
//}
//}

function addDataToJson() {
    for (var i = 1, j = 0; i <= fieldCount; i++,j++){
       let jsonObj = {}
        var field = fields[0][j]
        var type = document.getElementById(`type${fields[0][j]}`)
        var value = document.getElementById(`text_file_id${fields[0][j]}`).files[0]
        var typedValues = document.getElementById(`textArea${fields[0][j]}`)
        var fixed_len = document.getElementById(`fixed-len${fields[0][j]}`)
        var dependentOn = document.getElementById(`dependent${fields[0][j]}`)
        var dependentValue = document.getElementById(`dep-val${fields[0][j]}`)
        if (type.value === 'Date Time'){
            var dateTimeFormat = document.getElementById(`datetime${fields[0][j]}`)
            jsonObj["datetime"] = dateTimeFormat.value
        }
        console.log(field)
            jsonObj["fieldName"] = field
            jsonObj["type"] = type.value

            let reader = new FileReader();
            var text = ''
            if (value != null){

                reader.addEventListener('load', function(e) {
                     text.concat(e.target.result)
                    //jsonObj["values"] = text.split('\n')
                });
                console.log(text)
                reader.readAsText(value)
                jsonObj["values"] = text.split('\n')
            }
            console.log(jsonObj["values"])


            console.log(typedValues.value != '')
            if(typedValues.value != '' )
            {
            console.log(typedValues.value)
            jsonObj["values"] = typedValues.value.split('\n')
            }
            jsonObj["length"] = fixed_len.value

            jsonObj["dependentOn"] = dependentOn.value
            jsonObj["dependentValue"] = dependentValue.value
            payload.push(jsonObj)
            }
            console.log(payload)
            //resetForm()
            //removeConfiguredFields()
    }

var errMap ={}
function pushErrToMaps(object){
    for (var i in object) {
      console.log(`${i}: ${object[i]}`);
      errMap[i] = errMap[i] || [];
      errMap[i].push(object[i]);
    }
}

function showErr(map){
    var errors = document.getElementById("error-msgs");
    for (const [key, value] of Object.entries(map)) {
            let row = document.createElement("div");
            row.setAttribute("class", "row");
            row.innerHTML = `<br>
            <div class="col s10 offset-s1">
          <div class="card-panel" id="${key}" style="color:blue">
              <h3>Errors at Row Number: ${key}</h3>
          </div>
      </div>`;
            errors.appendChild(row)
            value.forEach(element => {
                let p = document.createElement("p")
                p.setAttribute("id", "error")
                p.setAttribute("style", "font-weight: bold; color:red;")
                p.innerText = `    -  ${element}`
                let parent = document.getElementById(`${key}`)
                parent.appendChild(p)
            });
        }
}



function traverse(object){
    for(var i in object){
        console.log(object[i])
        console.log(object[i] != "")
        if(object[i] != ""){
            for( j in object[i]){
            console.log(object[i][j])
            pushErrToMaps(object[i][j])
            }
        }
    }
    console.log(errMap)
    showErr(errMap)
}

async function displayErrors(){
   sendConfigData()
    const response = await fetch('csv', {
        method: 'POST',
        body: JSON.stringify(result)
    })

    if (response.status === 200) {
        var jsonData =  await response.json();
        console.log(jsonData)
        traverse(jsonData)
    }
}


function resetForm(){
    document.getElementById("myform").reset()
}

async function sendConfigData(){
    addDataToJson()
    var resp = await fetch('add-meta-data', {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    if (resp.status === 200) {
        var jsonData = await resp.json();
        console.log(jsonData)
    }
}

