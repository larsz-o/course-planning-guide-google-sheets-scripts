var read = 0; 
var discuss = 0; 
var watch = 0; 
var collab = 0; 
var review = 0;
var work = 0;
var submit = 0;
var learningTotal = 0;
var discussCollabTotal = 0;
var assignmentTotal = 0; 
var columnsArray = [{id: 2, letter: 'b'}, {id: 3, letter: 'c'}, {id: 4, letter: 'd'}, {id: 5, letter: 'e'}, {id: 6, letter: 'f'}, {id: 7, letter: 'g'}, {id: 8, letter: 'h'}, {id: 9, letter: 'i'}, {id: 10, letter: 'j'}, {id: 11, letter: 'k'}]
var currentColumn = null; 
var categories = ['READ', 'WATCH', 'DISCUSS', 'COLLABORATE', 'PRACTICE', 'REVIEW', 'WORK', 'SUBMIT'];


//gets the current column's numerical value and then finds its letter value by searching through columnsArray which contains objects that match the column number with its letter value
function getColumn(category){
  Logger.log('values: current column: ' + currentColumn + 'read:' + read + 'watch: ' + watch + 'discuss: ' + discuss + 'practice: ' + practice + 'collab: ' + collab + 'review: ' + review + 'work: ' + work + 'submit: ' + submit); 
  var column = SpreadsheetApp.getActiveSheet().getActiveCell();
  column = column.getColumn()
  for (var i = 0; i < columnsArray.length; i++){
    if(columnsArray[i].id === column){
      currentColumn = columnsArray[i].letter;
    }
  }// end for loop
   // once we know what column letter we're in, run the getValues function to get all of the text we need to analyze
  getValues(category);
}
function getValues(category){
  // if we have a currentColumn, use that value to get the whole range of text so we can analyze it
  if(currentColumn !== null){
    var input = currentColumn + '5:' + currentColumn + '24';
   var text = SpreadsheetApp.getActiveSheet().getRange(input).getValues();
  }

   var allText = [];
    for (var i = 0; i < text.length; i++) {
        allText.push(text[i]);
    }
    // next we need to search through the contents of each object to see if it contains a keyword that matches our category argument
    var count = 0;
    for (var j = 0; j < allText.length; j++) {
        //iterating through the keys because the range is an object
        for (value in allText[j]) {
            // if the word isn't present, it will return a -1 (or -1.0 in Google Scripts)
            if (allText[j][value].search(category) !== -1.0) {
                // if we don't get a -1.0, increase our counter so we know how many of these items we have 
                count++;
            }
        }
    }
 // depending on what the keyword is, we should put our count in a certain row. 
 switch (category){
    case 'READ':
        read = count; 
        learningTotal = read + watch; 
        SpreadsheetApp.getActiveSheet().getRange(currentColumn + '27').setValue(learningTotal);
        break;
    case 'WATCH':
         //watch is a 15 minute unit, so let's divide the 1 hour standard unit by 4 to get our accurate count for the watch category
         watch = count/4; 
         learningTotal = read + watch; 
         // reading and watching are going to end up in the same category, but they use different keywords and different units of time. 
         // add them together using the global scope variables so that we can get an accurate number for this combined category.
         SpreadsheetApp.getActiveSheet().getRange(currentColumn + '27').setValue(learningTotal);
         break;
    case 'DISCUSS':
        discuss = count; 
        discussCollabTotal = discuss + collab; 
        SpreadsheetApp.getActiveSheet().getRange(currentColumn + '28').setValue(discussCollabTotal);
        break;
    case 'COLLABORATE':
        collab = count; 
        // discussing and collaborating are going to end up in the same category, but they use different keywords. 
        // add them together using the global scope variables so that we can get an accurate number for this combined category.            
        discussCollabTotal = discuss + collab; 
        SpreadsheetApp.getActiveSheet().getRange(currentColumn + '28').setValue(discussCollabTotal);
        break;
    case 'PRACTICE': 
        SpreadsheetApp.getActiveSheet().getRange(currentColumn + '29').setValue(count);
        break;
    case 'REVIEW': 
        // reviewing, working, and submitting are going to end up in the same category, but they use different keywords. 
        // add them together using the global scope variables so that we can get an accurate number for this combined category.
        review = count/4; 
        assignmentTotal = review + work + submit; 
        SpreadsheetApp.getActiveSheet().getRange(currentColumn + '30').setValue(assignmentTotal);
        break;
    case 'WORK': 
        // reviewing, working, and submitting are going to end up in the same category, but they use different keywords. 
        // add them together using the global scope variables so that we can get an accurate number for this combined category.
        work = count; 
        assignmentTotal = review + work + submit; 
        SpreadsheetApp.getActiveSheet().getRange(currentColumn + '30').setValue(assignmentTotal);
        break;
    case 'SUBMIT':
        // reviewing, working, and submitting are going to end up in the same category, but they use different keywords. 
        // add them together using the global scope variables so that we can get an accurate number for this combined category.
        submit = count/4; 
        assignmentTotal = review + work + submit; 
        SpreadsheetApp.getActiveSheet().getRange(currentColumn + '30').setValue(assignmentTotal);
        break;
 }  

}

// when someone makes an edit to the spreadsheet, we should check the active column for updates
function onEdit(e) {
   checkCurrentColumn();
}

function checkCurrentColumn(){
  for (var i = 0; i < categories.length; i++) {
    getColumn(categories[i]);
  }
}

// if someone wants to force a recalculation of all cells in our table, we should run this function which iterates through each column
function checkAll(){
  var alphabet = 'BCDEFGHIJK';
  for (var j = 0; j < alphabet.length; j++) {
    currentColumn = alphabet[j]; 
   for (var i = 0; i < categories.length; i++) {
   getValues(categories[i]);
  }
  }
 
}