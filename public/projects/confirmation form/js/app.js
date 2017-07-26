//Problem: hints are shonw even when form is valid
//Solution: hide and show them at appropriate time
var $password = $("#password");
var $confirmPassword = $("#confirm_password");
//Hide hints
$("form span").hide();

function isPasswordValid() {
  return $password.val().length > 8;
}

function arePasswordMatching(){
  return $password.val() === $confirmPassword.val();
}

function canSubmit () {
   return isPasswordValid() && arePasswordMatching();
}

function passwordEvent() {
  //Find out if password is valid
  if(isPasswordValid()) {
//Hide hint if valid
$password.next().hide();
    } else {
  //else show hint
      $password.next().show();
  }
}


function confirmPasswordEvent() {
  //find out if password and confirmation match
  if(arePasswordMatching()) {
  //Hide hint if match
    $confirmPassword.next().hide();
  } else {
    //Else show hint
    $confirmPassword.next().show();
  }

}


function enableSubmitEvent() {
  
   $("#submit").prop("disabled", !canSubmit());
}
//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

//When event happens on confirmation
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);


enableSubmitEvent();












