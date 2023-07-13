const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
    .split('')
    .map((letter,idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
    .join('')
})

window.onload=profileData();

let stud = [];


function login(){
    fetch('./data/student.json')
    .then((response) => response.json())
    .then((json) => {
  

        stud = JSON.parse(JSON.stringify(json)).student;
        callLogin();
    });
} 



function callLogin(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let validUser = false;

    for (let i = 0; i<stud.length; i++){
        if (stud[i].username == user && stud[i].password == pass){
            validUser = true;

            sessionStorage.setItem('studId', stud[i].id);
            sessionStorage.setItem('username', stud[i].username);
            console.log(stud[0].id);
            
        }

        if (validUser){
            window.location.href= "welcome.html";
        }else{
            document.getElementById("loginError").style.display = "block";
        }
    }
}

document.getElementById("studentName").innerHTML = sessionStorage.getItem("username");

function logOut(){
    sessionStorage.clear()
    window.location.href='index.html'
}

function hideLoginError(){
    document.getElementById("loginError").style.display = "none";
}



//DISPLAYING MARKS IN EXAM RESULTS

function displayMarks(){

    fetch('./data/student.json')
    .then((response) => response.json())
    .then((json) => {
        stud = JSON.parse(JSON.stringify(json)).student;
        callDisplayMarks();

    });

    
    
}

function callDisplayMarks(){
    let subject = document.getElementById("subject").value;
    let marks = document.getElementById("marks");
    let grade = document.getElementById("grade");

    marks.value = "";
    grade.value = "";

    for (let i = 0; i < stud.length; i++){
        if (stud[i].id == sessionStorage.getItem("studId"))
        {
            for (const key in stud[i]){
                if (stud[i].hasOwnProperty(key)){
                    if(subject==key){
                        marks.value = stud[i][key]["marks"];
                        grade.value = stud[i][key]["grade"];
                    }
                }
            } 
        }
    }
}



function profileData(){
    fetch('./data/student.json')
    .then((response) => response.json())
    .then((json) => {
        stud = JSON.parse(JSON.stringify(json)).student;
        callProfileData();
    })
}

function callProfileData(){
    for (let i = 0; i < stud.length; i++){
        if (stud[i].id == sessionStorage.getItem("studId"))
        {
            for (let key in stud[i]){
                if (stud[i].hasOwnProperty(key)){
                    if (key == "name"){
                        document.getElementById("name").innerHTML = stud[i][key];
                    } 
                    else if (key == "std"){
                        document.getElementById("std").innerHTML = stud[i][key];
                    } 
                    else if (key == "studId"){
                        document.getElementById("studId").innerHTML = stud[i][key];
                    } 
                    else if (key == "dob"){
                        document.getElementById("dob").innerHTML = stud[i][key];
                    } 
                    else if (key == "bgroup"){
                        document.getElementById("bgroup").innerHTML = stud[i][key];
                    } 
                    else if (key == "contactno"){
                        document.getElementById("contactno").innerHTML = stud[i][key];
                    } 
                    else  if (key == "state"){
                        document.getElementById("state").innerHTML = stud[i][key];
                    } 
                    else if (key == "country"){
                        document.getElementById("country").innerHTML = stud[i][key];
                    } 
                    else if (key == "email"){
                        document.getElementById("email").innerHTML = stud[i][key];
                    } 
                    else if (key == "clsscheduled"){
                        document.getElementById("clsscheduled").innerHTML = stud[i][key];
                    } 
                    else if (key == "clsattended"){
                        document.getElementById("clsattended").innerHTML = stud[i][key];
                    } 
                    else if (key == "attendedper"){
                        document.getElementById("attendedper").innerHTML = stud[i][key];
                    } 

                }
            }
        }
    }
}





function addActivity(){
    let activityName = document.getElementById("actName").value;
    let activityDetails = document.getElementById("actDetail").value;
    sessionStorage.setItem(activityName, activityDetails);
    alert("Activity submitted");
}

function listActivity(){

    for (let i=0; i<sessionStorage.length; i++){
        let key =sessionStorage.key(i);
    }




    let listContainer = document.getElementById("activityList");
     if(sessionStorage.length < 3){
         document.getElementById("list").style.display = "none";
     } else {
         document.getElementById("list").style.display = "block";

        for (let i = 2; i < sessionStorage.length; i++) {
            let key = sessionStorage.key(i);

            if(key != "username" && key != "IsThisFirstTime_Log_From_LiveServer" && key != "AddressBarServiceCalled"){
                let activityName = document.createElement("dt");
                activityName.innerHTML = key;
                activityList.appendChild(activityName);

                let activityDetails = document.createElement("dd");
                activityDetails.innerHTML = sessionStorage.getItem(key);
                activityList.appendChild(activityDetails);
            }
        }
    }

}





//fetchStudentData();