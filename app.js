/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people){
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
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;
  let multiplePeopleResponse = "";
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
  if (filteredPeople.length > 1) {
    for (i = 0; filteredPeople.length > i; i++) {
      multiplePeopleResponse += filteredPeople[i].firstName +  " " + filteredPeople[i].lastName + "\n"
    }
  alert("Multiple matches. Please choose from the list below and enter the name below: " + "\n" + multiplePeopleResponse + "\n");
  app(people);
  }
  else {
  let foundPerson = filteredPeople[0];
  mainMenu(foundPerson, people);
  }
}

let displayOption;
function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person in inches?");
  let person = people.filter(function (el) {    
     if (userInputHeight == el.height) {
        return true;   // return true if el.height matches userInputHeight
    }
    }); 
    return person;
}


function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");
  person = people.filter(function (el) {
    if (userInputWeight == el.weight) {
      return true;     // return true if el.weight matches userInputWeight
    }
    });
    return person;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What color eyes does the person have?");
  person = people.filter(function (el) {
    if (userInputEyeColor == el.eyeColor) {
      return true;     // return true if el.eyeColor matches userInputEyeColor
    }
    });
    return person;
}

function searchByGender(people) {
  let userInputGender = prompt("What gender is the person?");

  person = people.filter(function (el) {
    if (userInputGender == el.gender) {
      return true;     // return true if el.gender matches userInputGender
    }
    });
    return person;
}

function searchByAge(people) {
  let userInputAge = prompt("What is the persons age?");

  person = people.filter(function (el) {
    if (userInputAge == el.age) {
      return true;     // return true if el.age matches userInputAge
    }
    });
    return person;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the persons occupation?");

  person = people.filter(function (el) {
    if (userInputOccupation == el.occupation) {
      return true;     // return true if el.occupation matches userInputOccupation
    }
    });
    return person;
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
      return displayPerson(person);
    break;
    case "family":
      return displayFamily(person[0], people);
    break;
    case "descendants":
      return displayDescendants(person[0], people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
//let firstName;
//let lastName;


function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
      person = people.filter(function(el){
        if (firstName === el.firstName && lastName === el.lastName){
          return true;      
        }
      });
      displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
      if (displayOption === "info") {
        return displayPerson(person[0]);
      }
      else if (displayOption === "family") {
        return displayFamily(person[0], people);
      }
      else if (displayOption === "descendants") {
        return displayDescendants(person[0], people);
      }
      else {
        return false;
      }
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
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
//  personInfo += "Parents: " + person.parents + "\n";
//  personInfo += "Current Spouse: " + person.currentSpouse + "\n";
  alert(personInfo);
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
    let lastNameMatch = people.filter(function(el){
      if (person.lastName === el.lastName && person.firstName !== el.firstName || person.id === el.currentSpouse || person.id === el.parents[0] || person.id === el.parents[1]){
        return true;   
      }
    });
    let lastNameMatchArray = [];
    for (i = 0; i < lastNameMatch.length; i++) {
      lastNameMatchArray.push(lastNameMatch[i].firstName + " " + lastNameMatch[i].lastName);
    } console.log(lastNameMatchArray);
} 

function displayDescendants(person, people) {
  let findChildren = people.filter(function(el){
    if (person.id === el.parents[0] || person.id === el.parents[1]) {
      return true;   
    }
  });
    let findChildrenArray = [];
    for (i = 0; i < findChildren.length; i++){
      findChildrenArray.push(findChildren[i].firstName + " " + findChildren[i].lastName);
    }   if (findChildrenArray.length === 0) {
            console.log(person.firstName + " " + person.lastName + " has no children.");
        }
      
    // loop through findChildrenArray first, assign name back to person.id
    for (i = 0; i < findChildrenArray.length; i++) {
      let splitChildNameArray = findChildrenArray[i].split(" "); //i
      let childFirstName = splitChildNameArray[0];
      let childLastName = splitChildNameArray[1];

      person = people.filter(function(el){
        if (childFirstName === el.firstName && childLastName === el.lastName){
          return true;      
        }
      });
    }   
        let descendantArray = findChildrenArray.concat(displayDescendants(person[0], people));
        console.log(descendantArray);
  }   