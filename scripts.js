
var read = 0; 
var discuss = 0; 
var practice = 0; 
var assignment = 0; 
var watch = 0; 
var collab = 0; 
var learningTotal = 0;
var discussCollabTotal = 0;

function containsCategory(input, category) {
    // the text variable holds the value of cells in our current spreadsheet. the input argument represents one full column in A1 notation
    var text = SpreadsheetApp.getActiveSheet().getRange(input).getValues();
    // we store text in an array so that we can manipulate it more easily
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
    Logger.log('count:' + count);
    // depending on what the keyword is, we should put our count in a certain row. we take the first character of our input argument (the letter of the column) to figure out which column we should add our count to
    if (category === 'READ') {
        read = count; 
        learningTotal = read + watch; 
        SpreadsheetApp.getActiveSheet().getRange(input[0] + '26').setValue(learningTotal);
    }
    if (category === 'WATCH') {
        watch = count/4; 
        learningTotal = read + watch; 
        // reading and watching are going to end up in the same category, but they use different keywords and different units of time. 
        // add them together using the global scope variables so that we can get an accurate number for this combined category.
        SpreadsheetApp.getActiveSheet().getRange(input[0] + '26').setValue(learningTotal);
    }
    if (category === 'DISCUSS') {
        discuss = count; 
        discussCollabTotal = discuss + collab; 
        SpreadsheetApp.getActiveSheet().getRange(input[0] + '27').setValue(discussCollabTotal);
    }
    if (category === 'COLLABORATE') {
        collab = count; 
        discussCollabTotal = discuss + collab; 
        SpreadsheetApp.getActiveSheet().getRange(input[0] + '27').setValue(discussCollabTotal);
    }
    if (category === 'PRACTICE') {
        SpreadsheetApp.getActiveSheet().getRange(input[0] + '28').setValue(count);
        practice = count; 
    }
    if (category === 'ASSIGNMENT') {
        SpreadsheetApp.getActiveSheet().getRange(input[0] + '29').setValue(count);
        assignment = count; 
    }
}

// when someone makes an edit to the spreadsheet, we should update our counts
function onEdit(e) {
    checkAll();
}

// we need to run containsCategory for each available keyword and each letter for columns B-K
function checkAll() {
    var alph = "BCDEFGHIJK";
    for (var i = 0; i < alph.length; i++) {
        containsCategory(alph[i] + '5:' + alph[i] + '24', 'READ');
        containsCategory(alph[i] + '5:' + alph[i] + '24', 'DISCUSS');
        containsCategory(alph[i] + '5:' + alph[i] + '24', 'COLLABORATE');
        containsCategory(alph[i] + '5:' + alph[i] + '24', 'PRACTICE');
        containsCategory(alph[i] + '5:' + alph[i] + '24', 'ASSIGNMENT');
    }
}

