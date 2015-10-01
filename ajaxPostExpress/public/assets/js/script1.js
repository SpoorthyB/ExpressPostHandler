var fetch = function(x) {return(document.getElementById(x));}
var httpRequest;

/*Password validation*/
function verify(){
	var pwd = fetch("password");
		var pwdconfm = fetch("password_confm");
		var displayString ='';
		if(pwd !='' && pwdconfm != ''){
			if (pwd.value.length < 8) {
				displayString = "Password should be minimum of 8 characters";

			}
			else
			if (pwdconfm.value.indexOf(' ') >= 0 || pwd.value.indexOf(' ') >= 0) {
				displayString = "Password cannot contain space/s";
			}
			else if (pwd.value == fetch("userid").value) {
				displayString = "Password cannot be the same as user ID";
			}
			else if(pwdconfm.value != pwd.value){
				displayString = "Passwords do not match"; 
			}
		}
		fetch("descone").innerHTML = displayString;
		if (displayString!='') {pwdconfm.value='';}
}

//Password strength calculation and display
function show(){
		var passwd = fetch("password").value;
		var score;
		var strength = fetch("strength");
	    var numEx = /\d/;
	    var lcEx = /[a-z]/;
	    var ucEx = /[A-Z]/;
	    var symEx = /\W/;
	    var num = {};
	    num.Lower = 0;
		num.Upper = 0;
		num.Numbers = 0;
		num.Symbols = 0;

		for (var i = 0; i < passwd.length; i++) {
	        var pchar = passwd.charAt(i);
	        if(numEx.test(pchar)){
	            num.Numbers += 1;	            
	        }
	    
	        if(ucEx.test(pchar)){
	            num.Upper += 1;
	        }
	    
	        if(lcEx.test(pchar)){
	            num.Lower += 1;
	        }
	        if(symEx.test(pchar)){
	            num.Symbols += 1.5;
	        }

	    }
	    score = num.Numbers + num.Upper + num.Lower + num.Symbols;
	    var fullStrength = 15;
	    fetch("meter").style.width = ((Math.min(fullStrength, score)/fullStrength )*100) + "px";

	    if(passwd.length >= 13 || (num.Symbols >= 3 && num.Numbers >=3)) {
        fetch("strength").innerHTML = "Strong";
	    }
	    else if((num.Symbols >= 1 && num.Numbers >=2) || passwd.length >= 9) {
	        fetch("strength").innerHTML = "Medium";
	    }
	    else {
	        fetch("strength").innerHTML = "Weak";
	    }
	}
//Storage of input values in Browser's Session Storage	
function submitForm(e){
	
	var data = new Object();	
		data.userid = fetch("userid").value;
		data.password = fetch("password").value;
		data.email = fetch("email").value;
		var indx = fetch("sec_question1").selectedIndex;
		data.q1 = fetch("sec_question1").options[indx].text;
		data.a1 = fetch("sec_answer1").value;
		indx = fetch("sec_question2").selectedIndex;
		data.q2 = fetch("sec_question2").options[indx].text;
		data.a2 = fetch("secanswer2").value;
		data.tel = fetch("telephone").value;
		data.address = fetch("address").value;
		data.area = fetch("areas").value;
	try{
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = handleResponse;
		httpRequest.open(e.method,e.action, true);
		httpRequest.setRequestHeader("Content-type", "application/json");
		httpRequest.send (JSON.stringify(data));

	} catch(err)
	{
		console.log(err);
	}
	function handleResponse(e) {    
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
        fetch("succ_msg").innerHTML="Your registration details are saved, Thank you !!!";
    }
}

	

}	