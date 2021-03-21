// global quoteId counter
let count = 0;
// total number of objects in the object array
let totalCount = 0;

// global JSON object array
let myObj = [];

// id
let quoteId = 0;
// body
let quoteBody = "";
// source
let quoteSource = "";

/*
The function gets all quotes from the database and
sets the values for count and totalCount
*/
function check() {
  (async () => {
    let result = await fetch(
      "https://christinaraganit.live/comp4537/assignments/1/quotesapp/quotes"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        myObj = res;

        totalCount = Object.keys(myObj).length;
        count = myObj[totalCount - 1].quoteId;
      });
  })();
}

/*
The function removes all quotes from the reader page and
displays the latest quote on the reader page
*/
function individualQuote() {
  check();
  // removes all quotes from the reader page
  removeQuotes();

  // gets and displays latest quote on the reader page
  getQuote(count);
}

/*
The function removes all quotes from the reader page and
displays all quotes in the database on the reader page
*/
function entireQuotes() {
  // removes all quotes from the reader page
  removeQuotes();

  // gets and displays all quotes on the reader page
  getQuotes();
}

/*
The function removes all quotes from the reader page
*/
function removeQuotes() {
  // removes the div "quoteContainer"
  let container = document.getElementById("quotes-container");

  container.innerHTML = "";
}

/*
The function makes a GET request to get and
display latest quote from the database
*/
function getQuote(value) {
  console.log("Viewing most recent quote!");
  (async () => {
    let result = await fetch(
      "https://christinaraganit.live/comp4537/assignments/1/quotesapp/quotes/" +
        value
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(myObj);
        value = JSON.stringify(myObj[myObj.length - 1].quoteId);
        console.log(value);
        quoteBody = JSON.stringify(myObj[myObj.length - 1].text)
          .replace(/\\\"/g, '"')
          .replace(/\\\'/g, "'");
        quoteSource = JSON.stringify(myObj[myObj.length - 1].author)
          .replace(/(^\")|(\"$)/g, "")
          .replace(/\\\"/g, '"')
          .replace(/\\\'/g, "'");
      })
      .then((res) => {
        // displays latest quote on the reader page
        generateQuote(value, quoteBody, quoteSource);
      });
  })();
}

/*
The function makes a GET request to get and
display all quotes from the database
*/
function getQuotes() {
  console.log("Viewing all quotes!");
  (async () => {
    let result = await fetch(
      "https://christinaraganit.live/comp4537/assignments/1/quotesapp/quotes"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        myObj = res;
        totalCount = Object.keys(myObj).length;
        count = myObj[totalCount - 1].quoteId;
      })
      .then((res) => {
        // for all objects in the array
        for (let i = 0; i < totalCount; i++) {
          quoteId = myObj[i].quoteId;
          quoteBody = JSON.stringify(myObj[i].text)
            .replace(/\\\"/g, '"')
            .replace(/\\\'/g, "'");
          quoteSource = JSON.stringify(myObj[i].author)
            .replace(/(^\")|(\"$)/g, "")
            .replace(/\\\"/g, '"')
            .replace(/\\\'/g, "'");

          // displays all quotes on the reader page
          generateQuote(quoteId, quoteBody, quoteSource);
        }
      });
  })();
}

/*
The function creates a skeletal template for existing quote(s) which has:
body (textarea), source (textarea) [readOnly]
*/
function generateQuote(value, bodyText, sourceText) {
  // container is the div with id "quoteContainer"
  let container = document.getElementById("quotes-container");

  let quoteDiv = document.createElement("div");
  quoteDiv.setAttribute("class", "quote");
  quoteDiv.setAttribute("id", "quote" + value);
  console.log(container);
  container.appendChild(quoteDiv);

  let quoteText = document.createElement("textarea");
  quoteText.setAttribute("id", "quoteText" + value);
  quoteText.setAttribute("rows", 8);
  quoteText.setAttribute("cols", 26);
  quoteText.setAttribute("class", "quote");
  quoteDiv.appendChild(quoteText);
  document.getElementById("quoteText" + value).value = bodyText;
  quoteText.readOnly = true;

  let quoteAuthor = document.createElement("textarea");
  quoteAuthor.setAttribute("id", "quoteAuthor" + value);
  quoteAuthor.setAttribute("class", "quote");
  quoteAuthor.setAttribute("placeholder", "Who is the author of the quote?");
  quoteAuthor.setAttribute("rows", 8);
  quoteAuthor.setAttribute("cols", 26);
  quoteAuthor.value = sourceText;
  quoteAuthor.setAttribute("style", "margin-right: 8px; margin-left: 8px");
  quoteAuthor.readOnly = true;
  quoteDiv.appendChild(quoteAuthor);
}
