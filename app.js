/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
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
    app(people); // restart app
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
  mainMenu(foundPerson, people);
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
    //let ageArray;
    for (i = 0; i < dobArray.length; i++) {
      let birthDate = new Date(dobArray[i]);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      people[i].age = age;
      }
      //for(let i = 0; i<  people.length; i++){
        //people[i].age = ageArray[i];
      //}

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
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }
  displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase();
  let findChildrenArray = [];
  switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
      displayFamily(person, people);
    break;
    case "descendants":
      displayDescendants(person, people, findChildrenArray);
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
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();
        let person = people.filter(function(el){
        if (firstName === el.firstName.toLowerCase() && lastName === el.lastName.toLowerCase()){
          return true;      
        }
      });
     mainMenu(person[0], people);
  }   
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";
  console.log(personInfo);
  return personInfo;
}
// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}
// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
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
      if(person.id === people[i].parents[0] || person.id === people[i].parents[1]) { //people[i] ?
        findChildrenArray.push(people[i]);
        displayDescendants(people[i], people, findChildrenArray);
      }
    }
}




