const curDate = document.getElementById("date");
let weathercon = document.getElementById('weathercon');

const tempStatus= "{%tempstatus%}";

// The getDay() method returns the day of the week (0 to 6) of a date.
const getCurrentDay = function(){
    //creating an array and storing the days
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tues";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    
    //when we create a object of Date and call the fucntion .getDay(), .getDate() , .getMonth() , we acrually get the number ie, the index 
    //So if we want the value we ahve to create the Array of Days and Month to get the value from that array using the no , that the function returns
    let currentTime = new Date();
    // console.log(weekday[currentTime.getDay()]);
    return weekday[currentTime.getDay()];
};

const getCurrentTime = ()=>{

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var now = new Date();
    var month = months[now.getMonth()+1]; // + 1 bcz the indexing start from zero
    var date = now.getDate();
    let hours = now.getHours();
    let mins = now.getMinutes();

    let periods = "AM";
    if(hours > 11){
        periods = "PM";
        if(hours > 12){
            hours -= 12; //so as to convert the clock in formate of 12hr and not 24hr
        }
    }
    if(mins < 10){
        mins = "0"+mins // eg: 2:04
    }


    // console.log(months[month] + " " + date + "|" + hours+":"+mins + ' '+periods);
    return `${month} ${date} | ${hours}:${mins} ${periods}`
}

//we will Dynamically  update the value using the .innerHtml
 curDate.innerHTML = getCurrentDay() +" | "+ getCurrentTime();
