function Journal() {
    this.entries = [];

    // adds an Entry with the given info
    this.addEntry = function addIt(title, content, author, tags) {
        // create the Entry object
        var entry = new Entry(title, content, author, tags);
        // add it to the array
        this.entries.push(entry);
    }

    // Displays an Entry object
    this.displayEntry = function showEntry(entry) {
        console.log("------------------------------");
        console.log("\t" + entry.title + "\n");
        console.log("\t" + "By: " + entry.author);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(entry.content);

        // log the tags
        for (var i = 0; i < entry.tags.length; i++) {
            console.log("#" + entry.tags[i] + " ");
        }
        console.log("------------------------------");
    }

    // Displays an array of Entry objects
    this.displayEntries = function showEntries(entryArray) {
        for (var i = 0; i < entryArray.length; i++) {
            this.displayEntry(entryArray[i]); // display the entry
            console.log(); // adds a new line
        }
    }

    // Displays all entries in the Journal
    this.displayAllEntries = function showAllEntries() {
        this.displayEntries(this.entries);
    }

    // Finds all Entry objects with the given tag, and returns them in an array
    this.findAllEntriesWithTag = function searchForTag(tag) {

        var foundEntries = [];

        // look at each entry
        for (var i = 0; i < this.entries.length; i++) {
            var currentEntry = this.entries[i];

            // add it to the array if it has the tag	
            if (currentEntry.hasTag(tag)) {
                foundEntries.push(currentEntry);
            }
        }
        // return all the entries with the tag
        return foundEntries;
    }

 
}
function Entry(title, content, author, tags) {
    this.title = title;
    this.content = content;
    this.author = author;

    this.tags = tags;

    // returns whether or not the Entry has a given tag
    this.hasTag = function(tag) {
        for (var i = 0; i < this.tags.length; i++) {
            if (this.tags[i] === tag) {
                return true;
            }
        }
        return false;
    }
}

formatEntriesToHtml = function formatHtml(entries){
    var htmlOutput = "";
    for (var i = 0; i < entries.length; i++){
        htmlOutput += '<li class="entry">';
        htmlOutput += '<div>' + entries[i].title + '</div>';
        htmlOutput += '<div>By: ' + entries[i].author + '</div>';
        htmlOutput += '<div>' + entries[i].content + '</div>';
        htmlOutput += '<div>';
        for(var k = 0; k < entries[i].tags.length; k++){
            htmlOutput += '#' + entries[i].tags[k];
        }
        htmlOutput += '</div>';
        htmlOutput += '</li>';
     }
return htmlOutput;     
}


// TESTING CODE
var myJournal = new Journal();
myJournal.addEntry("First Entry", "Everything is great!", "Ben", ["Friday", "Boring"]);
myJournal.addEntry("Second Entry", "What happened? Everything is terrible", "Ben", ["Monday", "Boring"]);
myJournal.addEntry("Think About It", "Real Eyes Realize Real Lies", "Jaden", ["Deep", "Eyes", "Swag"]);
myJournal.addEntry("Huh?", "Who gave my journal to Jaden?", "Ben", ["Confused"]);
//End of Test code

$('#formSubmit').submit(function() {
    console.log('Form Submitted');
    event.preventDefault();
    var arrEntry = $('#formSubmit').serializeFormToObject();
    myJournal.addEntry(arrEntry.title,arrEntry.author,arrEntry.content,[arrEntry.tags]);

    var errorMessage = "<p>Error! Missing input field!</p>";
    var isInputValid = true;
    if (arrEntry.title == "" || arrEntry.author == "" || arrEntry.content == "" || arrEntry.tags == "" ){
    	isInputValid = false;
    }
    if (isInputValid){
    	$('.articles-list').html(formatEntriesToHtml(myJournal.entries));
        myJournal.displayAllEntries();
	}else{
		$('#formSubmit').append(errorMessage);
	}

});

$('#searchTags').submit(function(){
    event.preventDefault();
   var tagQuery = $('#searchTags').serializeFormToObject();
   $('.articles-list').html(formatEntriesToHtml(myJournal.findAllEntriesWithTag(tagQuery.searchTags)));
});
$('#searchTags').submit(function(){
    event.preventDefault();
   var tagQuery = $('#searchTags').serializeFormToObject();
   $('.articles-list').html(formatEntriesToHtml(myJournal.findAllEntriesWithTag(tagQuery.searchTags)));
});





