var tableDecimal = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '2000', '3000']

var tableRomanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', 'M', 'MM', 'MMM']

var tableConverted = []                                                       // stores the converted base-10 number
var digitCount = 0                                                            // stores the length (digits) of the base-10 number
var userInput = ''                                                            // initializes the variable that will store the user input

document.getElementById('getRN').addEventListener('click', checkValue)

function checkValue () {                                                      // checks if user input is valid
  userInput = document.getElementById('decimal-value').value

  if (userInput.length === 0) {                                               // is the user input is empty?
    window.alert('Unable to convert an empty value.')
  } else if (userInput.length > 4) {                                          // is the user input base-10 number > 4 digits long?
    window.alert('Unable to convert a number with more than 4-digits.')
    document.getElementById('decimal-value').value = ''
    return userInput
  }

  userInput = Number(userInput)                                               // converts user input string to number

  if (isNaN(userInput) === true) {                                            // is user input a number or not?
    window.alert('Please enter a valid number.')
    document.getElementById('decimal-value').value = ''
  } else {
    convertToRomanNumeral(userInput)
    document.getElementById('decimal-value').value = ''
  }
}

function convertToRomanNumeral (num) {                                        // convert base-10 user input to roman numeral
  digitCount = num.toString().split('')                                       // NOTE: unable to convert base-10 value beyond '3999'

  if (digitCount.length === 4) {
    digitCount[0] = digitCount[0] + '000'
    digitCount[1] = digitCount[1] + '00'
    digitCount[2] = digitCount[2] + '0'
    digitCount[3] = digitCount[3]
  } else if (digitCount.length === 3) {
    digitCount[0] = digitCount[0] + '00'
    digitCount[1] = digitCount[1] + '0'
    digitCount[2] = digitCount[2]
  } else if (digitCount.length === 2) {
    digitCount[0] = digitCount[0] + '0'
    digitCount[1] = digitCount[1]
  } else if (digitCount.length > 4) {
    window.alert('Sorry, unable to convert more than 4-digitCount decimal number.')
    return num
  } else if (digitCount.length === 0) {
    window.alert('Sorry, you have submitted an empty value.')
  }

  for (var itemCounter = 0; itemCounter < digitCount.length; itemCounter++) { // looks up table for correponding roman numeral symbols
    var holderValue = digitCount[itemCounter]
    var holderSymbol = tableDecimal.indexOf(holderValue)
    var holderRomanNumeral = tableRomanNumerals[holderSymbol]
    tableConverted.push(holderRomanNumeral)
  }

  num = tableConverted.join('')                                               // merge roman numeral symbols into a string

  var elementTarget = document.querySelector('.roman-numeral')                // delete previous conversion (if there was one)
  elementTarget.parentNode.removeChild(elementTarget)

  var parentElement = document.querySelector('.column-center')                // create a new DOM element & display result
  var div = document.createElement('div')
  div.classList.add('roman-numeral')

  var span = document.createElement('span')
  var h1 = document.createElement('h1')
  h1.innerHTML = num
  span.appendChild(h1)
  div.appendChild(span)
  parentElement.appendChild(div)

  tableConverted = []                                                         // clean up arrays for the next conversion
  num = []
}
