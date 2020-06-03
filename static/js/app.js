
//Get data assigned to a variable before filter
var tdata = data;

//Select table and table body
var tbody = d3.select("#ufo-table").select("tbody");

//Set table load indicator
var blnPopulated  = false;

//Set Button event
var applyFilter = d3.select("#filter-btn");
var applyReset = d3.select("#reset-btn");

//Apply filter element events
var applyDate = d3.select("#datepicker");
var applyCity = d3.select("#city");
var applyState = d3.select("#state");
var applyCountry = d3.select("#country");
var applyShape = d3.select("#shape");

/**
 * @Function : resetFilter
 * @param: None
 * @Description :This function will reset values of all filter elements.
 * Call to setfilter that will enable original data load to html table.
 * 
 **/
function resetFilter(){
    //Use of DOM element ID
    document.getElementById("datepicker").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("country").checked = false;
    document.getElementById("shape").value = "";
    
    //populateData - with reset filter values
    setFilter();
}

/**
 * @Function : setFilter
 * @param: None
 * @Description :This function will get values of filter elements, set data to original data and call
 *  populateData function.
 **/
function setFilter(){
    //Get DOM element values to be used during table data load
    datepicker = document.getElementById("datepicker").value;
    city = document.getElementById("city").value.toLowerCase();
    state = document.getElementById("state").value;

    //Check if check-box is checked
    if (document.getElementById("country").checked == true){
        country = document.getElementById("country").value;
    }
    
    shape = document.getElementById("shape").value;

    //Reset data 
    tdata = data;
    
    //Polulate table data
    populateData();
}

/**
 * @Function : populateData
 * @param: None
 * @Description :This function will check the filter element length. If filter element length is greater than 1, 
    means, user has selected filter critera(s). Apply the filter function for each filter critera.
    Then populate the filtered data into table
 **/
function populateData()
{
    //Check filters one by one - take care of spaces by trim function for input values. 
    if (datepicker.trim().length > 0){
        tdata = tdata.filter(d => {
            datex = new Date(d.datetime);
            datey = new Date(datepicker.trim());
            return (datex).toString() === (datey).toString() ;});
    }
    if (city.trim().length > 0){
        tdata = tdata.filter(d => {return d.city.trim() === city.trim();});
    }
    if (state.length > 0){
        tdata = tdata.filter(d => {return d.state === state;});

    }
    //check county checkbox is checked
    if (document.getElementById("country").checked == true){
         tdata = tdata.filter(d=> {return d.country === country.trim();});
     }
    if (shape.length > 0){
        tdata = tdata.filter(d => {return d.shape === shape;});
    }

    //Check if data is loaded at least once - if yes, remove all table rows
    if (blnPopulated=== true){
        d3.select("#ufo-table").select("tbody").selectAll("tr").remove();
    }

    //Populate table data
    tdata.forEach((data)=>{var tableRow = tbody.append("tr");
         Object.entries(data).forEach(([key,value]) => {tableRow.append("td").text(value);})
         blnPopulated= true;
    });
}

//Set filter to populate data in to table
setFilter();

//apply button click events
applyFilter.on("click", setFilter);
applyReset.on("click", resetFilter);

//Apply events to a filter element
applyDate.on("mouseout", setFilter);
applyCity.on("mouseout", setFilter);
applyState.on("mouseout", setFilter);
applyCountry.on("click", setFilter);
applyShape.on("mouseout", setFilter);

