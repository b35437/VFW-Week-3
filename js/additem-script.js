//Name: Nathan Byarley
//Project: VFW Week 3
//Term: 1306


//wait until the DOM has loaded
window.addEventListener("DOMContentLoaded", function() { 


	//getElementById Function
	function byId(b) {
		var elementBy = document.getElementById(b);
		return elementBy;
	}
	
	//get the selected radio button function
	function getSelectedRadio(){
		var radioBtn = document.forms[0].rarity;
		
		//loop check which button has been selected
		for(var i = 0; i < radioBtn.length; i++) {
			if(radioBtn[i].checked) {
				rareValue = radioBtn[i].value;
			}
		}
	}
	
	//get the value of the checkbox
	function getCheckboxValue() {
		//if conditional if the checkbox is checked or not
		if(byId("savegear").checked) {
			saveGearValue = byId('savegear').value;
		} else {
			saveGearValue = "Not saved to your list"
		}
	} 
	//create selection field element
	function listItems(){
		//local variables
		var formTag = document.getElementsByTagName("form");
		var targetList = byId('select');
		var createSelect = document.createElement('select');
		
		//give the select element the attribute of id="ilist"
		createSelect.setAttribute("id", "ilist");
		
		//for loop to run through the itemSlot array
		for(var i=0, j=itemSlot.length; i<j; i++) {
			//local variables
			var createOption = document.createElement('option');
			var optText = itemSlot[i];
			
			createOption.setAttribute("value", optText);
			createOption.innerHTML = optText;
			createSelect.appendChild(createOption);
		}
		targetList.appendChild(createSelect);
		
	} 
	
	//alter CSS within JS by changing atributes.
	function newDisplay(t) {
		switch(t){
			case "on":
			byId("equipmentForm").style.display = "none";
			byId("cleardata").style.display = "inline";
			byId("showdata").style.display = "none";
			byId("additem").style.display = "inline";
				break;
			case "off":
			byId("equipmentForm").style.display = "block";
			byId("cleardata").style.display = "inline";
			byId("showdata").style.display = "inline";
			byId("additem").style.display = "none";
			byId("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//save data function
	function saveData() {
		//local variables
		var randomID = Math.floor(Math.random()*10000001);
		
		getSelectedRadio(); //calls the radio function
		getCheckboxValue(); //calls the checkbox function
		
		//get form information and store within an object
		var equipment = {};
			equipment.ename = ["Equipment Name:", byId('ename').value];
			equipment.ilist = ["Item Slot:", byId('ilist').value];
			equipment.rarity = ["Rarity:", rareValue];
			equipment.islide = ["Item Level:", byId('islide').value];
			equipment.date = ["Date:", byId('date').value];
			equipment.savegear = ["Save to List:", saveGearValue];
			equipment.note = ["Notes:", byId('note').value];
			
			//convert object to string
			localStorage.setItem(randomID, JSON.stringify(equipment));
			
			//notify the user, equipment has been added
			alert("Equipment has been Added");
	}
	//Get data function
	function getData() {
	
	if(localStorage.length === 0) {
		alert("There is no equipment to view");
	}else {
		//put toggle controll here so if there is no data to display
		//you do not get taken to data screen.
		newDisplay("on");
		//write data from local storage to the browser
		var createDiv = document.createElement('div');
		createDiv.setAttribute("id", "items");
		
		document.body.appendChild(createDiv);
		byId("items").style.display = "block";
		
		var createList = document.createElement('ul');
		createDiv.appendChild(createList);	
		
		//for loop create the external ul/li tags for the data within localstorage
		for(var i = 0, l = localStorage.length; i < l; i++){
			var createListItem = document.createElement('li');
			createList.appendChild(createListItem);
			
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			//convert string back to object
			var objectString = JSON.parse(value);
			
			var createSubList = document.createElement('ul');
			createListItem.appendChild(createSubList);
			
			//in loop also creates the li tages for the actual data within localstorage
			for(var y in objectString) {
				var createSubListItem = document.createElement('li');
				createSubList.appendChild(createSubListItem);
				var optSubText = objectString[y][0]+" "+objectString[y][1];
				
				createSubListItem.innerHTML = optSubText;
				}
			}
		}
	}
	
	//clears all data within localstorage as long as teh condtion is false
	//if condition is true here is no data to remove
	function clearLocalStorage() {
		if(localStorage.length === 0){
			alert("There is no data to clear");
			
		}else {
			localStorage.clear();
			alert("All Equipment has been removed");
			window.location.reload();
			return false;
			
		}
	}
	
	
	//global variables
	var itemSlot = ["--Select A Slot--", "Belt", "Chest", "Feet", "Gloves", "Helmet", "Pants", "Shoulders", "Back", "Main Hand", "Off Hand", "Two Handed", "Neck", "Left Ring", "Right Ring"];
	var rareValue;
	var saveGearValue = "No";
	
	//call the list items function
	listItems();
	
	
	//showdata event
	var displayLink = byId('showdata');
	displayLink.addEventListener("click", getData);

	//cleardata event
	var removeDataLink = byId('cleardata');
	removeDataLink.addEventListener("click", clearLocalStorage);
	
	//save event
	var save = byId('button');
	save.addEventListener("click", saveData);


	
});

