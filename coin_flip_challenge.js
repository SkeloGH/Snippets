function flip() {
  return Math.random() >= 0.5;
}

/**
  * {Function} randomNumber
  * @param num, {Number} any integer between 1 and 1,000,000
  * @return {Number} a random number, lower than the input value
  * @reference Convert decimal to binary {Link} https://www.w3schools.com/js/js_bitwise.asp
  * 
  * @sequence
  * - converts the input number to binary
  * - splits the binary into an array
  * - walks the array and flips the coin
  * - if false, ignores the value
  * - if true, pushes the value into a new binary string
  * - converts back the binary into decimal
*/
function randomNumber(num) {
  var new_num, binary_string, char_list, new_binary;

  if (num < 1 || num > 1000000){
    throw "provided number is less than 1 or greater than 1,000,000";
  }
  
  new_num       = num !== 1 ? num - 1 : 0;
  binary_string = (new_num >>> 0).toString(2);
  char_list     = binary_string.split('');
  new_binary    = '';

  for(var i=0; i < char_list.length; i++){
    if(!i || flip()){
      new_binary += item;
    }
  }
  return parseInt(new_binary, 2)
}

// Test
function testAll(){
  var testPassed = true;
  var totalTests = 1000000;
  var easy_hits = 0;

  for(var i=1; i<1000000;i++){
    var randomized = randomNumber(i);
    if(randomized >= i){
      testPassed = false;
    }
    if(randomized === i-1){
      easy_hits++;
    }
  }


  if(!testPassed){
    console.warn('Test did not pass')
  }else{
    console.log('Test ran successfully')
    console.log(easy_hits+' out of '+totalTests+' where the input value, minus 1')
  }
}
