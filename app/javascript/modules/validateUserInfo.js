const validateUserInfo = (password, confirmPassword, email) => {
  if(password.length < 5){
    alert("Password is too short");
    return false;
  } else if(password != confirmPassword){
    alert("Paswords do not match");
    return false;
  } else if(!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.exec(email)){
    alert("Please enter a proper email address");
    return false;
  } else{
    return true;
  }
}

export default validateUserInfo;
