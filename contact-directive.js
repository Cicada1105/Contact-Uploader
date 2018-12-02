var app = angular.module("parser",[]);
/*Previous Contact*/
app.directive("previousContact",function() {
	return {
		restrict:"E",
		template:"<input type='button' ng-click='prevContact()' value='Previous' name='pContact' />"
	};
});
/*Next Contact*/
app.directive("nextContact",function() {
	return {
		restrict:"E",
		template:"<input type='button' ng-click='nextContact()' value='Next' name='nContact' />"
	};
});
/*Create Contact*/
app.directive("createContact",function() {
	return {
		restrict: "E",
		template: "<input type='button' ng-click='createContact()' value='Create' name='cContact' />"
	};
});
/*Add Contact to table*/
app.directive("addContact",function() {
	return {
		restrict: "E",
		template: "<input type='button' ng-click='addContact()' value='Add' />"
	}
});
/*Edit Contact*/
app.directive("editContact",function() {
	return {
		restrict: "E",
		template: "<input type='button' ng-click='editContact()' value='Edit' name='eContact' />"
	};
});
/*Update Contact to table*/
app.directive("updateContact",function() {
	return {
		restrict: "E",
		template: "<input type='button' ng-click='updateContact()' value='Update' />"
	}
});
/*Delete Contact*/
app.directive("deleteContact",function() {
	return {
		restrict: "E",
		template: "<input type='button' ng-click='deleteContact()' value='Delete' name='dContact' />"
	};
});
/*Name*/
app.directive("nameInput",function(){
	return {
		restrict:"E",
		template:"<span style='font-size:1.25em'>Name:</span> <input type='text' name='Name' ng-model='contactName' ng-keypress='updateName()'/>"
	};
});
/*Email*/
app.directive("emailInput",function(){
	return {
		restrict:"E",
		template:"<span style='font-size:1.25em'>Email:</span> <input type='text' name='Email' ng-model='contactEmail' ng-keypress='updateEmail()'/>"
	};
});
/*Zip*/
app.directive("zip",function() {
	return {
		restrict: "A",
		template: "<span style='font-size:1.25em'>Zip: </span><input type='number' min='10000' max='20000' name='Zip' ng-model='zipCode' ng-keypress='updateZip()' ng-blur='autoComplete()'/>"
	}
});
/*City*/
app.directive("city",function() {
	return {
		restrict: "A",
		template: "<span style='font-size:1.25em'>City: </span><input type='text' maxlength='100' name='City' ng-model='city' ng-keypress='updateCity()'/>"
	}
});
/*State*/
app.directive("state",function() {
	return {
		restrict: "A",
		template: "<span style='font-size:1.25em'>State:</span> <input type='text' maxlength='100' name='State' ng-model='state' ng-keypress='updateState()'/>"
	}
});
/*URL*/
app.directive("urlInput",function(){
	return {
		restrict:"E",
		template:"<span style='font-size:1.25em'>URL:</span>  &nbsp;<input type='text' name='URL' ng-model='contactURL' ng-keypress='updateURL()'/>"
	}
});
/*Google AutoComplete*/
app.directive("contactSearch",function() {
	return {
		restrict: "E",
		template:"<input type='text' name='contactSearchInput' ng-model='contactInput' />"
	}
});
/*Upload contacts*/
app.directive("uploadContacts",function() {
	return {
		restrict: "E",
		template: "<input type='button' ng-click='saveContacts()' value='Upload' name='uContact' />"
	}
});