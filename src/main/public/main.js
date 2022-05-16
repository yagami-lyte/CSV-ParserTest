var payload=[]
var result = []
var fields = []
var fieldCount = 0


function removeConfiguredFields() {
    var addedField = document.getElementById("field");
    addedField.remove(addedField.selectedIndex);
}

function csvReader() {
    localStorage.setItem("csv" , document.getElementById("csv_id").value.split("\\")[2])
    var csv = document.getElementById("csv_id").files[0];
    const reader = new FileReader();
    reader.onload = async function (event) {
        csv = event.target.result
        console.log(document.getElementById("csv_id").value.split("\\")[2])
        var lines = csv.toString().split("\n");
        var headers = lines[0].split(",");
        showColFields(headers);
        fields.push(headers)
        for (var i = 1; i < lines.length-1; i++) {
            var obj = {};
            var currentLine = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j].replaceAll('"', '');
            }
            result.push(obj);
            //localStorage.setItem(csv, JSON.stringify(result));
        }
    };
    reader.readAsText(csv);
}

async function getConfigResponse(){
    var resp = await fetch('get-config-response', {
            method: 'POST',
            body: JSON.stringify([{ "csv" : localStorage.getItem("csv")}])
        })

        if (resp.status === 200) {
            var jsonData = await resp.json();

            console.log(jsonData)
            setValuesInConfig(jsonData)
        }
}

function setValuesInConfig(object){
    console.log(object)
    for(var i in object){
            console.log(object[i])
            console.log(object[i] != "")
            if(object[i] != ""){
                for( j in object[i]){
                    changeDefaultValuesOfConfig(object[i][j])
                }
            }
        }

}

function changeDefaultValuesOfConfig(object){
    for (var fields in object) {
            console.log(fields)
            console.log(`type${fields}`)
            document.getElementById(`type${fields}`).value = object[fields]["type"];
            document.getElementById(`fixed-len${fields}`).value = object[fields]["length"];
            document.getElementById(`allowNull${fields}`).value = object[fields]["nullValue"];
            if(object[fields]["nullValue"] === "Allowed"){
                document.getElementById(`allowNull${fields}`).checked = "checked";
            }
            document.getElementById(`date${fields}`).value = object[fields]["date"];
            document.getElementById(`dateTime${fields}`).value = object[fields]["dateTime"];
            document.getElementById(`dependent${fields}`).value = object[fields]["dependentOn"];
            document.getElementById(`dep-val${fields}`).value = object[fields]["dependentValue"];
            document.getElementById(`time${fields}`).value = object[fields]["time"];

            alterDateTimeOptions(fields)
        }
}

function alterDateTimeOptions(fields) {
    if(document.getElementById(`type${fields}`).value === "Date Time"){
        document.getElementById(`dateTime${fields}`).style.display = 'block'
        document.getElementById(`dateTimeDiv${fields}`).style.display = 'flex'
        document.getElementById(`dateTimeFormats${fields}`).style.display = 'block'
        document.getElementById(`length-div${fields}`).style.display = 'none'
        document.getElementById(`time${fields}`).value = ''
        document.getElementById(`date${fields}`).value = ''
        document.getElementById(`fixed-len${fields}`).value = ''
    }
    if( document.getElementById(`type${fields}`).value === "Date"){
        document.getElementById(`date${fields}`).style.display = 'block'
        document.getElementById(`dateDiv${fields}`).style.display = 'flex'
        document.getElementById(`dateFormats${fields}`).style.display = 'block'
        document.getElementById(`dateTimeDiv${fields}`).style.display = 'none'
        document.getElementById(`length-div${fields}`).style.display = 'none'
        document.getElementById(`dateTime${fields}`).value = ''
        document.getElementById(`time${fields}`).value = ''
        document.getElementById(`fixed-len${fields}`).value = ''
    }

    if( document.getElementById(`type${fields}`).value === "Time"){
        document.getElementById(`time${fields}`).style.display = 'block'
        document.getElementById(`timeDiv${fields}`).style.display = 'flex'
        document.getElementById(`timeFormats${fields}`).style.display = 'block'
        document.getElementById(`dateDiv${fields}`).style.display = 'none'
        document.getElementById(`length-div${fields}`).style.display = 'none'
        document.getElementById(`dateTime${fields}`).value = ''
        document.getElementById(`date${fields}`).value = ''
        document.getElementById(`fixed-len${fields}`).value = ''
    }
    const typeValue = document.getElementById(`type${fields}`).value;
    if( typeValue === "Date" || typeValue === "Time" || typeValue === "Date Time"){
        document.getElementById(`value-div${fields}`).style.display = 'none'
    }

    if( typeValue !== "Date" ){
        document.getElementById(`date${fields}`).value = ''
    }
    if( typeValue !== "Time" ){
        document.getElementById(`time${fields}`).value = ''
    }
    if(  typeValue !== "Date Time"){
            document.getElementById(`dateTime${fields}`).value = ''
    }
}

function showColFields(lines){
    var arr = lines[0].split(",")
    for (var i = 1, j = 0; i <= lines.length; i++,j++){
        fieldCount += 1
        var row = document.createElement('div');
        var field = `${lines[j]}`.replaceAll('"', '');
        row.setAttribute("class", "row")
        row.setAttribute("id", `row${field}`)
        row.innerHTML = `<div id="addConfig${field}">
                        <div id="fields">
         <div class="input-field col s4"
          style="display:flex;  background: transparent;width: 400px;border-radius: 7px; height: 40px;margin-right: 3% ;margin-left:35%;padding: 1em;margin-bottom: 3em;border-left: 4px solid grey;border-top: 4px solid grey;border-bottom: 4px solid grey;border-right: 4px solid grey;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">
           <h4 style= " text-transform: uppercase;"> ${field}</h4>
           </div>

                     <div style="display:flex; ">
                         <div class="input-field col s4"
                                     style="display:flex;  background: transparent;width: 300px;border-radius: 7px; height: 40px;margin-right:13% ;margin-left:15.4%;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid black;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">

                            <label  style="border-radius: 150px;" for="type" class ="required-field">Type </label>
                            <select  placeholder="Choose Type" data-cy="type" id="type${field}"
                            onchange="showDateTimeOption(this.value,'dateDiv${field}','dateFormats${field}' , 'date${field}','timeDiv${field}','timeFormats${field}','time${field}','dateTimeDiv${field}','dateTimeFormats${field}' , 'dateTime${field}' ,'length-div${field}', 'value-div${field}');" required>
                               <option value="">Choose Type of Data</option>
                                <option value="Number">Number</option>
                                <option value="AlphaNumeric">AlphaNumeric</option>
                                <option value="Alphabets">Alphabets</option>
                                <option value="Floating Number">Floating Number</option>
                                <option value="Special Characters">Text</option>
                                <option value="Date Time">Date Time</option>
                                <option value="Date">Date</option>
                                <option value="Time">Time</option>
                                <option value="Email">Email</option>
                            </select>
                         </div>

                         
                     <div  id = "dateTimeDiv${field}" class="input-field  col s4" 
                                        style="display:none;  background: transparent;width: 300px;border-radius: 7px; height: 40px;margin-right: 13% ;margin-left:10%;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid black;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">

    <label for="datetime" id="dateTimeFormats${field}" style='display:none;'>Date-Time Format</label>
                                                
    <select placeholder="Choose date time format"  name="datetime" id='dateTime${field}' style='display:none;'>
         <option value="">Choose Date Time format</option>
         <option value="HH:mm:ss.SSSZ">HH:MM:SS.SSSZ</option>
         <option value="MMMM dd, yy">MMMM DD, YYYY</option>
         <option value="MMM dd, yyyy hh:mm:ss a">MMM dd, yyyy hh:mm:ss a</option>
         <option value="MMM dd HH:mm:ss ZZZZ yyyy">MMM dd HH:mm:ss ZZZZ yyyy</option>
         <option value="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'">yyyy-MM-dd'T'HH:mm:ss.SSS'Z'</option>
         <option value="yyyy-MM-dd'T'HH:mm:ss">YYYY-MM-DD'T'HH:MM:SS</option>
         <option value="MMM dd, yyyy hh:mm:ss a">MMM DD, YYYY HH:MM:SS AM</option>
         <option value="dd/MMM/yyyy:HH:mm:ss ZZZZ">DD/MMM/YYYY:HH:MM:SS ZZZZ</option>
         <option value="MMM dd HH:mm:ss ZZZZ yyyy">MMM DD HH:MM:SS ZZZZ YYYY</option>
         <option value="MMM dd yyyy HH:mm:ss">MMM DD YYYY HH:MM:SS</option>
         <option value="MM/dd/yyyy hh:mm:ss a">MM/DD/YYYY HH:MM:SS AM</option>
         <option value="MM/dd/yyyy hh:mm:ss a:SSS">MM/DD/YYYY HH:MM:SS AM:SSS</option>
         <option value="MMdd_HH:mm:ss.SSS">MMDD_HH:MM:SS.SSS</option>
         <option value="MMdd_HH:mm:ss">MMDD_HH:MM:SS</option>
         <option value="dd MMM yyyy HH:mm:ss*SSS">DD MMM YYYY HH:MM:SS*SSS</option>
         <option value="dd MMM yyyy HH:mm:ss">DD MMM YYYY HH:MM:SS</option>
         <option value="dd/MMM/yyyy HH:mm:ss"">DD/MMM/YYYY HH:MM:SS</option>
         <option value="dd/MMM HH:mm:ss,SSS"">DD/MMM HH:MM:SS,SSS</option>
    </select>
</div>

                         
                         
                         <div id = "dateDiv${field}" class="input-field  col s4"
                                                style="display:none;  background: transparent;width: 300px;border-radius: 7px; height: 40px;margin-right: 2% ;margin-left:6%;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid black;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">
                                                
                            <label for="date" id="dateFormats${field}" style='display:none;'>Date Format</label>
                            <select placeholder="Choose date format"  name="date" id='date${field}' style='display:none;'>
                                 <option value="">"Choose Date Format"</option>
                                 <option value="MM-dd-yyyy">MM-DD-YYYY</option>
                                 <option value="dd-MM-yyyy">DD-MM-YYYY</option>
                                 <option value="dd/MM/yyyy, yy">DD/MM/YYYY</option>
                                <option value="yy/MM/dd">YY/MM/DD</option>
                                <option value="yyyy/MM/dd">YYYY/MM/DD</option>
                                <option value="M/d/yyy">M/D/yyy</option>
                                <option value="d/M/yyyy">D/M/YYYY</option>
                                <option value="yyyy/M/dd">YYYY/M/DD</option>
                                <option value="ddMMyYYy">DDMMYYYY</option>
                                <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                            </select>
                         </div>


                     <div id = "timeDiv${field}" class="input-field  col s4" 
                      style="display:none;border-radius: 7px;  background: transparent;width: 300px; height: 30px;margin-right: 3% ;margin-left:6%;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid black;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">

                       <label for="time" style='display:none;' id="timeFormats${field}">Time Format</label>
                           <select  placeholder="Choose time format"  name="time" id='time${field}' style='display:none;'>
                                <option value="">Choose Time Format</option>
                                <option value="hh:mm:ss">HH:MM:SS</option>
                                <option value="HH:mm:ss zzz">HH:MM:SS ZZZ</option>
                                <option value="HH:mm:ss.SSSZ">HH:MM:SS.SSSZ</option>
                           </select>
                      </div>


                         <div id="length-div${field}"class="input-field  col s4"
                         style="display:flex;  background: transparent;width: 300px;margin-right: 7% ;border-radius: 7px;margin-left:7%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid black;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">
                            <label for="fixed-len">Length</label>
                            <input placeholder="Enter Length" min=0 onkeypress="return event.charCode >= 49" style="padding:10px" type="number" id="fixed-len${field}" data-cy="fixed-len">
                         </div>
                       </div>

                         <div style="display:flex; ">

                         <div>
                         <div id="allowNullDiv${field}" class="input-field  col s4"
                         style="display:flex;  background: transparent;width: 300px;margin-right: 53% ;border-radius:7px;margin-left:55%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid black;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">
                         <label style="border-radius:60px;margin-right:-140%;margin-top:7%;" for="values">Select to allow empty values</label>
                         <p style="font-size:14px;display: inline-block;white-space: nowrap;margin-top:-12%;margin-left:36%;margin-right:160%;width:20px;"></p>
                         <label class="switch">
                           <input id="allowNull${field}" type="checkbox" value="Not Allowed" onclick="toggleYesOrNo(this.id);">
                           <span class="slider round"></span>
                         </label>
                         </div>

                         <div id="value-div${field}" class="input-field  col s4"
                                  style="display:flex;  background: transparent;width: 300px;margin-right: 3% ;border-radius:7px;margin-left:55%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid black;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">
                                  <label for="values">Values</label>
                                     <select style="margin-left:5%;" type="text" name="values" id="values${field}"
                                       onchange="onChangeHandler(this.value,'text_file_id${field}','popUp${field}','addConfig${field}');">
                                     <option  style="display:flex;border-radius:60px;margin-top:7%;" value=""> Choose</option>
                                       <option value="Upload File">Upload File</option>
                                                   <option value="Type Values">Type Values</option>
                                                            </select>
                                             <input onchange="readFile(event,'${field}');" type="file" id="text_file_id${field}" style="display:none;" accept=".txt">
                                                  </label>
                                                  </div>


                            
                         </div>


                         <div class="input-field  col s4"
                           style="display:flex;  background: transparent;border-radius: 7px;width: 300px;margin-right: 10% ;margin-left:35%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid black;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;ont-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">

                             <label for="dependent">Dependent</label>
                             <select placeholder="Choose dependant-field" name="dependentField" style="display: block;" id="dependent${field}">
                                 <option value="">Choose Dependent Field</option>
                                     ${lines.map((element) => {
            return `<option value='${element}'>${element.replaceAll('"', '')}</option>`;
        })}
                             </select>
                         </div>

                         <div class="input-field  col s4"
                          style="display:flex;border-radius: 7px;  background: transparent;width: 300px;margin-right: 7% ;margin-left:-39%;margin-top: 9%; height: 40px;padding: 1em;margin-bottom: 2em;border-left: 4px solid grey;border-right: 4px solid grey;border-top: 1px solid grey;backdrop-filter: blur(5px); box-shadow: 4px 4px 60px rgba(0,0,0,0.2);color: #fff;   font-family: Montserrat, sans-serif;font-weight: 500;transition: all 0.2s ease-in-out;     text-shadow: 2px 2px 4px rgba(0,0,0,0.2);flex-direction: row; justify-content: center; align-items: center">
                             <label for="dep-val">Dependent Value</label>
                             <input type="text" id="dep-val${field}" data-cy="dep-val">
                         </div>

                    </div>
                     <br> </br> <br>
                  </div>
                  </div>
                  
                   <div class="form-popup" id="popUp${field}" >
                                             <div class="form-container">
                                               <h1>Enter Values</h1>

                                               <textarea id="textArea${field}" placeholder="Enter Values"></textarea>
                                               <div id = "list"> 
                                               <ul style='margin-left: 55%; margin-top: -20%'>
                                                    <li> Please Enter the values in newline without any delimiters</li> 
                                                    <li> Example:</li>
                                                    <ul>
                                                        <li> Val1 </li>
                                                        <li> Val2 </li>
                                                        <li> Val3 </li>
                                                    </ul>

                                               </ul>
                                               </div>
                                               <div id="outer">
                                                 <div class="inner">
                                                    <button onclick="closeForm('popUp${field}','addConfig${field}')" type="button" class="btn" style='display:block;'>Submit</button>
                                                 </div>
                                                 <div class="inner">
                                                    <button type="button" class="btn cancel" onclick="closeForm('popUp${field}','addConfig${field}')">Close</button>
                                                 </div>
                                               </div>

                                             </div>
                                           </div>
                      <br>
                 `
        document.getElementById("myform").appendChild(row)
    }
}

function closeForm(popUp , addConfig, valueOption) {
    document.getElementById(popUp).style.display = "none";
    document.getElementById(addConfig).style.filter = "blur(0px)";
    document.getElementById(valueOption).value = "Choose";

}

function onChangeHandler(valueOption, fileInput, textAreaInput,addConfig){
    var uploadFile = document.getElementById(fileInput);
    console.log(uploadFile.files[0])
    var typeValues = document.getElementById(textAreaInput);
    var addConfig = document.getElementById(addConfig);
    if (valueOption === "Type Values"){
        console.log("Changing")
        uploadFile.style.display = "none";
        typeValues.style.display = "block";
        addConfig.style.filter = "blur(3px)";
    }
    else {
        uploadFile.style.display = "flex";
        typeValues.style.display = "none";
    }
}


function toggleYesOrNo(element) {
    let oldValue = document.getElementById(element).value
    if (oldValue === "Not Allowed") {
        document.getElementById(element).value = "Allowed"
        return
    }
    document.getElementById(element).value = "Not Allowed"
}

function showDateTimeOption(value, dateDivID, dateFormatId, dateId , timeDivID, timeFormatId,timeId, dateTimeDivID, dateTimeFormatId, dateTimeId ,lengthDivId, valueDivId){
    var dateDivIDElement = document.getElementById(dateDivID);
    var dateFormatElement = document.getElementById(dateFormatId);
    var dateIdFormatElement = document.getElementById(dateId);
    var timeDivIDElement = document.getElementById(timeDivID);
    var timeFormatElement = document.getElementById(timeFormatId);
    var timeIdFormatElement = document.getElementById(timeId);
    var lengthDivElement = document.getElementById(lengthDivId);
    var valueDivElement = document.getElementById(valueDivId);
    var dateTimeDivIDElement = document.getElementById(dateTimeDivID);
    var dateTimeFormatElement = document.getElementById(dateTimeFormatId);
    var dateTimeIdFormatElement = document.getElementById(dateTimeId);

    if(value === 'Date Time'){
        dateTimeDivIDElement.style.display='flex';
        dateTimeFormatElement.style.display='block';
        dateTimeIdFormatElement.style.display='block';
        dateDivIDElement.style.display='none';
        dateFormatElement.style.display='none';
        dateIdFormatElement.style.display='none';
        timeDivIDElement.style.display='none';
        timeFormatElement.style.display='none';
        timeIdFormatElement.style.display='none';
        valueDivElement.style.display='none';
        lengthDivElement.style.display='none';
    }

    else if(value === 'Date'){
        dateDivIDElement.style.display='flex';
        dateFormatElement.style.display='block';
        dateIdFormatElement.style.display='block';
        timeDivIDElement.style.display='none';
        timeFormatElement.style.display='none';
        timeIdFormatElement.style.display='none';
        dateTimeDivIDElement.style.display='none';
        dateTimeFormatElement.style.display='none';
        dateTimeIdFormatElement.style.display='none';
        valueDivElement.style.display='none';
        lengthDivElement.style.display='none';
    }
    else if(value === 'Time'){
        timeDivIDElement.style.display='flex';
        timeFormatElement.style.display='block';
        timeIdFormatElement.style.display='block';
        dateDivIDElement.style.display='none';
        dateFormatElement.style.display='none';
        dateIdFormatElement.style.display='none';
        dateTimeDivIDElement.style.display='none';
        dateTimeFormatElement.style.display='none';
        dateTimeIdFormatElement.style.display='none';
        valueDivElement.style.display='none';
        lengthDivElement.style.display='none';
    }
    else if(value === 'Date Time'){
        dateDivIDElement.style.display='none';
        dateFormatElement.style.display='none';
        dateIdFormatElement.style.display='none';
        timeDivIDElement.style.display='flex';
        timeFormatElement.style.display='block';
        timeIdFormatElement.style.display='block';
        dateTimeDivIDElement.style.display='none';
        dateTimeFormatElement.style.display='none';
        dateTimeIdFormatElement.style.display='none';
        valueDivElement.style.display='none';
        lengthDivElement.style.display='none';
    }
    else{
        dateDivIDElement.style.display='none';
        dateFormatElement.style.display='none';
        dateIdFormatElement.style.display='none';
        dateTimeDivIDElement.style.display='none';
        dateTimeFormatElement.style.display='none';
        dateTimeIdFormatElement.style.display='none';
        timeDivIDElement.style.display='none';
        timeFormatElement.style.display='none';
        timeIdFormatElement.style.display='none';
        dateTimeDivIDElement.style.display='none';
        dateTimeFormatElement.style.display='none';
        dateTimeIdFormatElement.style.display='none';
        valueDivElement.style.display='flex';
        lengthDivElement.style.display='block';
    }
}



function readFile(event, fieldName){
    var value = document.getElementById(`text_file_id${fieldName}`).files[0];
    if (value != null){
        let reader = new FileReader();
        reader.addEventListener('load', function(e) {
            let text = e.target.result
            console.log(JSON.stringify(text.split('\n')))


            localStorage.setItem(fieldName, JSON.stringify(text.split('\n')));

        });
        reader.readAsText(value)
    }
    return null;
}




function addDataToJson() {
    for (var i = 1, j = 0; i <= fieldCount; i++,j++){
        let jsonObj = {}
        var field = fields[0][j]
        var type = document.getElementById(`type${fields[0][j]}`.replaceAll('"', ''))
        var value = document.getElementById(`text_file_id${fields[0][j]}`.replaceAll('"', '')).files[0]
        var typedValues = document.getElementById(`textArea${fields[0][j]}`.replaceAll('"', ''))
        var fixed_len = document.getElementById(`fixed-len${fields[0][j]}`.replaceAll('"', ''))
        var dependentOn = document.getElementById(`dependent${fields[0][j]}`.replaceAll('"', ''))
        var dependentValue = document.getElementById(`dep-val${fields[0][j]}`.replaceAll('"', ''))
        var dateFormat = document.getElementById(`date${fields[0][j]}`.replaceAll('"', ''))
        var timeFormat = document.getElementById(`time${fields[0][j]}`.replaceAll('"', ''))
        var dateTimeFormat = document.getElementById(`dateTime${fields[0][j]}`.replaceAll('"', ''))
        var nullValues = document.getElementById(`allowNull${fields[0][j]}`.replaceAll('"', ''))
        jsonObj["csvName"] = document.getElementById("csv_id").files[0].name
        console.log(document.getElementById("csv_id").files[0].name)
        jsonObj["datetime"] = dateTimeFormat.value
        jsonObj["date"] = dateFormat.value
        jsonObj["time"] = timeFormat.value
        jsonObj["nullValue"] = nullValues.value
        console.log(nullValues.value)
        jsonObj["fieldName"] = field
        jsonObj["type"] = type.value
        if (value != null){
            jsonObj["values"] =JSON.parse(localStorage.getItem(field))
            console.log(localStorage.getItem(field))
        }
        if(typedValues.value != '' )
        {
            jsonObj["values"] = typedValues.value.split('\n')
        }
        jsonObj["length"] = fixed_len.value
        jsonObj["dependentOn"] = dependentOn.value
        jsonObj["dependentValue"] = dependentValue.value
        const typeValue = document.getElementById(`type${field}`).value
        if( typeValue !== "Date" && typeValue !== "Time" && typeValue !== "Date Time"){
                jsonObj["datetime"] = ''
                jsonObj["date"] = ''
                jsonObj["time"] = ''
        }else if(typeValue === "Date"){
            jsonObj["datetime"] = ''
            jsonObj["length"] = ''
            jsonObj["time"] = ''
        }else if(typeValue === "Time"){
            jsonObj["datetime"] = ''
            jsonObj["date"] = ''
            jsonObj["length"] = ''
        }else if(typeValue === "Date Time"){
            jsonObj["length"] = ''
            jsonObj["date"] = ''
            jsonObj["time"] = ''
        }

        payload.push(jsonObj)
    }
    console.log(payload)
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

async function displayErrors(){
    sendConfigData()
    const response = await fetch('csv', {
        method: 'POST',
        body: JSON.stringify(result)
    })

    if (response.status === 200) {
        var jsonData =  await response.json();
        loadingEffect();
        console.log(jsonData)
        traverse(jsonData)
    }
    var loader = document.getElementById("button-load")
    loader.style.visibility = "hidden";
    payload=[]
}

function traverse(object){
    errMap={}
    for(var i in object){
        console.log(object[i])
        console.log(object[i] != "")
        if(object[i] != ""){
            for( j in object[i]){
                pushErrToMaps(object[i][j])
            }
        }
    }
    emptyErrorList()
    console.log(errMap)
    showErrPage(1)
    createPagination(totNumPages(), 1)
//    showErr(errMap)
}

var errMap ={}
function pushErrToMaps(object){
    for (var i in object) {
        errMap[i] = errMap[i] || [];
        errMap[i].push(object[i]);
    }
}


var current_page = 1;
var obj_per_page = 5;
function totNumPages()
{
    return Math.ceil(Object.keys(errMap).length / obj_per_page);
}

function prevPage()
{   emptyErrorList()
    if (current_page > 1) {
        current_page--;
        showErrPage(current_page);
    }
    if(current_page == 1){
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        btn_prev.style.visibility = "hidden";
    }
}
function nextPage()
{        console.log(totNumPages())
    emptyErrorList()
    if (current_page < totNumPages()) {
        current_page++;
        //console.log(current_page)
        showErrPage(current_page);
    }
    if(current_page == totNumPages()){
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        btn_next.style.visibility = "hidden";
    }
}

function showErrPage(page){
    console.log(page)
    var map = errMap
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var errors = document.getElementById("error-msgs");
    //var page_span = document.getElementById("page");
    if (page < 1) page = 1;
    if (page > totNumPages()) page = totNumPages();
    value = Object.values(map)
    key = Object.keys(map)
    for (var i = (page-1) * obj_per_page ;(Object.keys(errMap).length != 0) && (key[i] != undefined) && i < (page * obj_per_page); i++) {
        //console.log(key[i] == undefined)
        var rowNo = parseInt(key[i])+1
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        row.innerHTML = `<br>
                        <div class="col s10 offset-s1">
                      <div class="card-panel" id="${key[i]}">
                          <h3>Errors at Row Number: ${rowNo}</h3>
                      </div>

                  </div>`;
        errors.appendChild(row)
        value[i].forEach(element => {
            let p = document.createElement("p")
            p.setAttribute("id", "error")
            p.innerText = `    -  ${element}`
            let parent = document.getElementById(`${key[i]}`)
            parent.appendChild(p)
        });

    }
    //page_span.innerHTML = page;
//    if (page == 1) {
//        btn_next.style.visibility = "hidden";
//    } else {
//        btn_prev.style.visibility = "visible";
//    }
//    if (page == totNumPages()) {
//        btn_next.style.visibility = "hidden";
//    } else {
//        btn_next.style.visibility = "visible";
//    }
    if(Object.keys(errMap).length === 0){
        errors.innerHTML = `<div class="success-msg">
                              <h1>No error in your uploaded CSV file</h1>
                            </div>`;
        btn_next.style.visibility = "hidden";
        document.getElementById("paginationUl").style.visibility = "hidden";
        btn_prev.style.visibility = "hidden";
    }

}


function emptyErrorList(){
    const el = document.getElementById("error-msgs");
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    };
}


function Buttontoggle()
{
    var t = document.getElementById("myButton");
    if(t.value=="YES"){
        t.value="NO";}
    else if(t.value=="NO"){
        t.value="YES";}
}


function resetForm(){
    document.getElementById("myform").reset()
}


function loadingEffect(){
    var loader = document.getElementById("button-load")
    loader.style.visibility = "visible";
}


// selecting required element
const UlElement = document.getElementById("paginationUl");
UlElement.style.visibility = "hidden";
let totalPages = 20;
let page = 1;

//calling function with passing parameters and adding inside element which is ul tag
function createPagination(totalPages, page){
UlElement.style.visibility = "visible";
console.log(totNumPages())
if(totNumPages() == 1){
UlElement.style.visibility = "hidden";
}
emptyErrorList()
totalPages = totNumPages()
showErrPage(page);
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if(page > 1){ //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1});"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if(page > 2){ //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1);"><span>1</span></li>`;
    if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) { //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if(page == plength){ //if page is equal to plength than assign active string in the active variable
      active = "active";
    }else{ //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength});"><span>${plength}</span></li>`;
  }

  if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
    if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages});"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1});"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  UlElement.innerHTML = liTag; //add li tag inside ul tag
  return liTag;
}


