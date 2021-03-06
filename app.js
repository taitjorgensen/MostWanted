
function app(people){
  getDateOfBirth(people);
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      return searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people);
    break;
    }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.").toLowerCase();
  let filteredPeople;
  let multiplePeopleMatchList = "";
  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;      
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }
    let additionalTraitSearch = promptFor("Would you like to search by additional traits? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(additionalTraitSearch === "yes") {
        filteredPeople = searchByTraits(filteredPeople);
        return filteredPeople;
    }
          if (filteredPeople.length > 1) {
            for (i = 0; filteredPeople.length > i; i++) {
              multiplePeopleMatchList += filteredPeople[i].firstName +  " " + filteredPeople[i].lastName + "\n"
            }
            alert("Multiple matches. Please choose from the list below and enter the name below: " + "\n" + multiplePeopleMatchList + "\n");
            app(people);
          }
          else {
              let foundPerson = filteredPeople[0];
              mainMenu(foundPerson, data);
          } 
}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person in inches?");
  let person = people.filter(function (el) {    
     if (userInputHeight == el.height) {
        return true;   
    }
    }); 
    return person;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");
  person = people.filter(function (el) {
    if (userInputWeight == el.weight) {
      return true;    
    }
    });
    return person;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What color eyes does the person have?").toLowerCase();
  person = people.filter(function (el) {
    if (userInputEyeColor == el.eyeColor) {
      return true;
    }
    });
    return person;
}

function searchByGender(people) {
  let userInputGender = prompt("What gender is the person?").toLowerCase();
  person = people.filter(function (el) {
    if (userInputGender == el.gender) {
      return true; 
    }
    });
    return person;
}

function getDateOfBirth(people) {    
  let dobArray = people.map(function (el) {  
    return el.dob;
  });
  determineAge(dobArray, people);
}

function determineAge(dobArray, people) {
  let today = new Date();
    for (i = 0; i < dobArray.length; i++) {
      let birthDate = new Date(dobArray[i]);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      people[i].age = age;
      }
  }

function searchByAge(people) {
  let userInputAge = prompt("What is the persons age?");
  person = people.filter(function (el) {
    if (userInputAge == el.age) {
      return true;     
    }
    });
    return person;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the persons occupation?").toLowerCase();
  person = people.filter(function (el) {
    if (userInputOccupation == el.occupation) {
      return true;   
    }
    });
    return person;
}

let displayOption;
function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }
  displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase();
  let findChildrenArray = [];
  switch(displayOption){
    case "info":
    document.getElementById("personInfo").innerHTML = displayPerson(person);
    break;
    case "family":
    displayFamily(person, people);
    document.getElementById("personInfo").innerHTML = "For client privacy <br> Please see console log";
    break;
    case "descendants":
    displayDescendants(person, people, findChildrenArray);
    document.getElementById("personInfo").innerHTML = "For client privacy <br> Please see console log";
      if(findChildrenArray.length === 0)
      {
        alert("No descendants found.");
      }
        for (j = 0; j < findChildrenArray.length; j++) {
          console.log(findChildrenArray[j].firstName + " " + findChildrenArray[j].lastName);
        }  
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
      let firstNameEsists = people.filter(function(el){
        if (firstName === el.firstName.toLowerCase()){
          return true;      
        }
      });
        if (firstNameEsists.length === 0) {
          alert("First name not found. Please type carefully and try again.");
          return searchByName(people);
        }
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();
        person = people.filter(function(el){
        if (firstName === el.firstName.toLowerCase() && lastName === el.lastName.toLowerCase()){
          return true;      
        }
      });
        
     mainMenu(person[0], people);
  }   

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPerson(person){

  let personInfo = "First Name: " + person.firstName + "<br>";
  personInfo += "Last Name: " + person.lastName + "<br>";
  personInfo += "Gender: " + person.gender + "<br>";
  personInfo += "Date of Birth: " + person.dob + "<br>";
  personInfo += "Age: " + person.age + "<br>";
  personInfo += "Height: " + person.height + "<br>";
  personInfo += "Weight: " + person.weight + "<br>";
  personInfo += "Eye Color: " + person.eyeColor + "<br>";
  personInfo += "Occupation: " + person.occupation + "<br>";
  personInfo += "Parents: " + person.parents + "<br>";
  personInfo += "Current Spouse: " + person.currentSpouse + "<br>";
  return personInfo;
}

function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true;
}

function displayFamily(person, people) {
    let familyMatch = people.filter(function(el){
      if (person.lastName === el.lastName && person.firstName !== el.firstName || person.id === el.currentSpouse || person.id === el.parents[0] || person.id === el.parents[1]){
        return true;   
      }
    });
    for (i = 0; i < familyMatch.length; i++) {
      console.log(familyMatch[i].firstName + " " + familyMatch[i].lastName);
    }
} 

function displayDescendants(person, people, findChildrenArray) {

    for(let i = 0; i < people.length; i++) {
      if(person.id === people[i].parents[0] || person.id === people[i].parents[1]) {
        findChildrenArray.push(people[i]);
        displayDescendants(people[i], people, findChildrenArray);
      }
    }
}




