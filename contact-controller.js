//App is defined in contact-directive.js
/*Current User Controller*/
app.controller("parserController",function($scope,$http){
	//Current contact;
	$currContactIndex = 0;
	//Contact URL Array
	$contactData = new Array();
	//City States Array
	$cityStates = new Array();
	//Displaying form to implement C-U in the CRUD methodology
	$scope.show = false;
	//Create and Update states
	$scope.create = false;
	$scope.update = false;
	//update states
	$nameChange = false;
	$emailChange = false;
	$urlChange = false;
	$zipChange = false;
	$cityChange = false;
	$stateChange = false;
	
	//Storing Contacts when page is loading
	$http({
		method: "GET",
		url: "load-table.php",
		}).then(function(res){
			$scope.contacts = res.data;
			$storeData();
			$logContacts();
			$scope.currName = $scope.contacts[$currContactIndex].Name;
			$scope.currEmail = $scope.contacts[$currContactIndex].Email;
			$scope.currURL = $scope.contacts[$currContactIndex].ContactURL;
	});
	
	$storeData = function() {
		for(var i=0; i<$scope.contacts.length; i++){
			$http({
				method: "GET",
				url: $scope.contacts[i].ContactURL
			}).then(function(res) {
				$contactData.push(res.data);
			});
		};
	};
	
	//Store Zip to City State 
	$http({
		method:"GET",
		url:"https://zip-to-cittystate.azurewebsites.net/zip-to-state.json"
	}).then(function(response) {
		//forEach takes in one required parameter:current value
		//Additional values are index and array object reference
		response.data.forEach(function(res){
			$cityStates.push(angular.fromJson(res));//Angular.fromJson() is AngularJS's form of JSON.parse()
		});
	});
	
	/************************/
	/*			Logs		*/
	/************************/
	//Print Contacts to console
	$logContacts = function() {
		for (var i=0; i<$scope.contacts.length; i++){
			console.log($scope.contacts[i]);
		}
	};
	
	//Print current contact to console
	$logCurrentData = function() {
		console.log($scope.contacts[$currContactIndex]);
		console.log($contactData[$currContactIndex]);
	}
	
	/*		Current Contact		*/
	$loadCurrContactInfo = function() {
		$curr = $scope.contacts[$currContactIndex];
		$scope.currName = $curr.Name;
		$scope.currEmail = $curr.Email;
		$scope.currURL = $curr.ContactURL;
	};
	
	/**********************/
	/*		Left View	  */
	/**********************/
	//Goes to the previous contact given that it is not the first contact
	$scope.prevContact = function() {
		if($currContactIndex > 0) 
			$currContactIndex--;
		
		$loadCurrContactInfo();
	};
	
	//Goes to the next contact given that it is not the last contact
	$scope.nextContact = function() {
		$len = $scope.contacts.length;
		if($currContactIndex < ($len-1))
			$currContactIndex++;
		
		$loadCurrContactInfo();
	};
	
	//Add a new contact to the given view
	$scope.createContact = function() {
		$scope.show = true;
		//Make sure the Update button is hidden
		$scope.update = false;
		$scope.create = true;
		
		$scope.contactName = "";
		$scope.contactEmail = "";
		$scope.contactURL = "";
		$scope.zipCode = "";
		$scope.city = "";
		$scope.state = "";
	};
	
	$scope.addContact = function() {
		//Add string
		$str = "";
		
		//New contact values
		$newContactName = document.contactInput.Name.value;
		$newContactEmail = document.contactInput.Email.value;
		$newContactURL = document.contactInput.URL.value;
		
		$str += $newContactName + "\n" + $newContactEmail + "\n" + $newContactURL + "\n";
		
		$conf = confirm("Are you sure you want to add the following contact: \n" + $str);
		
		if($conf) {
			var contactObj = {
				"Name":$newContactName,
				"Email":$newContactEmail,
				"ContactURL":$newContactURL
			};
			$scope.contacts.push(contactObj);
			$scope.changeFilter("Name");
		};
		$resetForms();	
	};
	
	//Edit the current contact
	$scope.editContact = function() {
		$scope.show = true;
		//Make sure the Add button is hidden
		$scope.create = false;
		$scope.update = true;
		//Contact data
		$cont = $contactData[$currContactIndex];
		
		$scope.contactName = $cont.firstName;
		$scope.contactEmail = $cont.email;
		$scope.contactURL = $scope.currURL;
		$scope.zipCode = parseInt($cont.zip);
		$scope.city = $cont.city;
		$scope.state = $cont.state;
	};
	
	//Determine whether each field has been touched/editted 
	$scope.updateName = function() {$nameChange = true;}
	$scope.updateEmail = function() {$emailChange = true;}
	$scope.updateURL = function() {$urlChange = true;}
	$scope.updateZip = function() {$zipChange = true;}
	$scope.updateCity = function() {$cityChange = true;}
	$scope.updateState = function() {$stateChange = true;}
	
	//Update the current view
	$scope.updateContact = function() {
		//update string
		$str = "";
		
		//updated values
		$nameUpdate = document.contactInput.Name.value;
		$emailUpdate = document.contactInput.Email.value;
		$urlUpdate = document.contactInput.URL.value;
		$zipUpdate = document.contactInput.Zip.value;
		$cityUpdate = document.contactInput.City.value;
		$stateUpdate = document.contactInput.State.value;
		
		//current contact
		$currentName = $scope.currName;
		$currentEmail = $scope.currEmail;
		$currentURL = $scope.currURL;
		$currentZip = parseInt($contactData[$currContactIndex].zip);
		$currentCity = $contactData[$currContactIndex].city;
		$currentState = $contactData[$currContactIndex].state;
		
		if($nameChange)
			$str += $currentName + " => " + $nameUpdate + "\n";
		if($emailChange)
			$str += $currentEmail + " => " + $emailUpdate + "\n";
		if($urlChange)
			$str += $currentURL + " => " + $urlUpdate + "\n";
		if($zipChange)
			$str += $currentZip + " => " + $zipUpdate + "\n";
		if($cityChange)
			$str += $currentCity + " => " + $cityUpdate + "\n";
		if($stateChange)
			$str += $currentState + " => " + $stateUpdate + "\n";
		
		//user confimation
		$conf = confirm("Are you sure you want to update the following contact information: \n" + $str + "in Contacts?");
		
		if($conf) {
			//Contact
			$cont = $scope.contacts[$currContactIndex];
			//Contact URL Data
			$contData = $contactData[$currContactIndex];
			
			//Update contact table
			$cont.Name = $nameUpdate;
			$cont.Email = $emailUpdate;
			$cont.ContactURL = $urlUpdate;
			//Update contact info
			$contData.zip = $zipUpdate;
			$contData.city = $cityUpdate;
			$contData.state = $stateUpdate;
			
			//Refresh Current Contact
			$logCurrentData();
			$loadCurrContactInfo();
		};
		
		$nameChange = false;
		$emailChange = false;
		$urlChange = false;
		$zipChange = false;
		$zipChange = false;
		$cityChange = false;
		$resetForms();
	};
	//Delete the current contact
	//Confirm Deletion
	$scope.deleteContact = function() {
		$curr = $scope.contacts[$currContactIndex];
		$conf = confirm("Are you sure you want to delete the contact:\n" +
		"Name: " + $curr.Name + "\nEmail: " + $curr.Email + "\nURL: " + $curr.ContactURL + "\nfrom Contacts?");
		if($conf)
			$removeContact();
	};
	//Remove contact from view
	$removeContact = function() {
		$len = $scope.contacts.length-1;
		
		for(var r=$currContactIndex; r<$len; r++) {
			$scope.contacts[r].Name = $scope.contacts[r+1].Name;
			$scope.contacts[r].Email = $scope.contacts[r+1].Email;
			$scope.contacts[r].ContactURL = $scope.contacts[r+1].ContactURL;
		};
		$scope.contacts[$len].Name = null;
		$scope.contacts[$len].Email = null;
		$scope.contacts[$len].ContactURL = null;
		$scope.contacts.length = $len;
		
		//update current contact field
		$scope.prevContact();
	};
	$resetForms = function() {
		$scope.show = false;
		$scope.update = false;
		$scope.create = false;
	};
	$scope.autoComplete = function() {	
		for (var i=0; i<$scope.cityStates.length; i++){
			console.log(typeof $scope.zipCode);
			if($scope.cityStates[i].Address == ($scope.zipCode)) {
				alert("FOUND");
				continue;
			};
		};
	};
	/************************/
	/*		Right View		*/
	/************************/
	$scope.changeFilter = ($val) => {
		$scope.userChoice = $val;
	};
	//Saving files to server
	$scope.saveContacts = function() {
		$contacttJSON = angular.toJson($scope.contacts);
		$http({
			method:"POST",
			url:"save-table.php",
			data:{contacts: $contacttJSON},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	}
});