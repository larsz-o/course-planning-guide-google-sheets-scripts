# course planner

This is a repository of some useful scripts that I'm creating to use in Google Sheets. 
We want faculty to be able to use Google Sheets to calculate how much time they are asking students to spend in various categories of activities in class over the course of a term.  These scripts will read various categories and count up the time commitments dynamically. 

## what it does

When a cell is edited, a script runs which gets all of the content in the column where that cell lives (within a predetermined range). The data is then searched for keywords. If the program finds one of the keywords that we ask it to look for, we increase our counter. Some keywords contribute to a broader category. We keep track of that information and then write our total into the correct cell in our calculcations table. If a user wants to refresh the entire table (say if there was an error running this script), they can push the blue button labeled "recalculate totals." This button runs a function that checks every cell within our table and updates all totals. 


## screenshots
View of the table:

![table view](https://github.com/larsz-o/course-planning-guide-google-sheets-scripts/blob/master/screenshots/table.png)

Some of the calculations we can do:

![calculations](https://github.com/larsz-o/course-planning-guide-google-sheets-scripts/blob/master/screenshots/calcs.png)

## built in
* google scripts 
