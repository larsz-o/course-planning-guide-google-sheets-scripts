function containsCategory(input, category) {
    var text = SpreadsheetApp.getActiveSheet().getRange(input).getValues();
    Logger.log(category);
    var allText = [];
      for(var i = 0; i < text.length; i++){
      allText.push(text[i]);
    }
    Logger.log('all text: ' + allText);
    Logger.log('category: ' + category);
    
    var count = 0; 
      for(var j = 0; j < allText.length; j++){
        //iterating through the keys because the range is an object
        for(value in allText[j]){
          if(allText[j][value].search(category) !== -1.0){
            count++;
          } 
        }}
        Logger.log('count:' + count);
        // to do: add in ways to count portions of an hour
        if (category === 'READ') {
           SpreadsheetApp.getActiveSheet().getRange(input[0] + '26').setValue(count); 
       }
         if (category === 'DISCUSS') {
           SpreadsheetApp.getActiveSheet().getRange(input[0] + '27').setValue(count); 
       }
         if (category === 'PRACTICE') {
           SpreadsheetApp.getActiveSheet().getRange(input[0] + '28').setValue(count); 
       }
         if (category === 'ASSIGNMENT') {
           SpreadsheetApp.getActiveSheet().getRange(input[0] + '29').setValue(count); 
       }
     }
  
  
  function onOpen(e){
    containsCategory("F5:F20", "PRACTICE");
    containsCategory("F5:F20", "READ");
    containsCategory("F5:F20", "SUBMIT");
      containsCategory("F5:F20", "DISCUSS");
  }
  
  function onEdit(e){
     containsCategory("F5:F20", "PRACTICE");
     containsCategory("F5:F20", "READ");
     containsCategory("F5:F20", "SUBMIT");
      containsCategory("F5:F20", "DISCUSS");
  }