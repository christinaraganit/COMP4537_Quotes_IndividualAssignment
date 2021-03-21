numOfQuotes = 0;
let totalCount = 0;
let myObj = [];
let quoteId = 0;
let quoteTextText = "";
let quoteAuthorText = "";
let check = 0;
let idList = [];
let newPost = false;

// loads all the quotes from the database and displays them on the admin page
function loadAllQuotes() {
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

        if (totalCount > 0) {
          numOfQuotes = myObj[totalCount - 1].quoteId;
        }
      })
      .then((res) => {
        for (let i = 0; i < totalCount; i++) {
          quoteId = myObj[i].quoteId;
          idList.push(quoteId);
          quoteTextText = JSON.stringify(myObj[i].text)
            .replace(/\\\"/g, '"')
            .replace(/\\\'/g, "'");
          quoteAuthorText = JSON.stringify(myObj[i].author)
            .replace(/(^\")|(\"$)/g, "")
            .replace(/\\\"/g, '"')
            .replace(/\\\'/g, "'");

          generateQuote(quoteId, quoteTextText, quoteAuthorText);
        }
      });
  })();
}

// creates two textareas, one for the quote text and one for the author, and two buttons for updating and deleting
function generateQuote(quoteId, quoteText, quoteAuthor) {
  let container = document.getElementById("quotes-container");

  let quoteDiv = document.createElement("div");
  quoteDiv.setAttribute("class", "quote");
  quoteDiv.setAttribute("id", "quote" + quoteId);
  container.appendChild(quoteDiv);

  let generatedQuoteText = document.createElement("textarea");
  generatedQuoteText.setAttribute("id", "quoteText" + quoteId);
  generatedQuoteText.setAttribute("placeholder", "What is the quote?");
  generatedQuoteText.setAttribute("rows", 8);
  generatedQuoteText.setAttribute("cols", 26);
  generatedQuoteText.value = quoteText;
  quoteDiv.appendChild(generatedQuoteText);

  let generatedAuthorText = document.createElement("textarea");
  generatedAuthorText.setAttribute("id", "quoteAuthor" + quoteId);
  generatedAuthorText.setAttribute(
    "placeholder",
    "Who is the author of the quote?"
  );
  generatedAuthorText.setAttribute("rows", 8);
  generatedAuthorText.setAttribute("cols", 26);
  generatedAuthorText.setAttribute(
    "style",
    "margin-right: 8px; margin-left: 8px"
  );
  generatedAuthorText.value = quoteAuthor;
  quoteDiv.appendChild(generatedAuthorText);

  let buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("id", "button" + quoteId);
  buttonDiv.setAttribute("class", "quote");
  buttonDiv.setAttribute("style", "margin-bottom:8px");
  quoteDiv.append(buttonDiv);

  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "deleteButton" + quoteId);
  deleteButton.setAttribute("value", quoteId);
  deleteButton.setAttribute("onclick", "deleteQuote(this.id)");
  deleteButton.innerHTML = "Delete quote";
  deleteButton.setAttribute("style", "margin-right: 4px");
  buttonDiv.appendChild(deleteButton);

  let updateButton = document.createElement("button");
  updateButton.setAttribute("id", "updateButton" + quoteId);
  updateButton.setAttribute("value", quoteId);
  updateButton.setAttribute("onclick", "updateOrAddQuote(this.id)");
  updateButton.innerHTML = "Update quote";
  buttonDiv.appendChild(updateButton);
}

// creates two textareas, one for the quote text and one for the author, and two buttons for updating and deleting
function addQuote() {
  numOfQuotes++;
  idList.push(idList[idList.length - 1] + 1);
  newPost = true;
  let container = document.getElementById("quotes-container");

  let quoteDiv = document.createElement("div");
  quoteDiv.setAttribute("class", "quote");
  quoteDiv.setAttribute("id", "quote" + numOfQuotes);
  container.appendChild(quoteDiv);

  let quoteText = document.createElement("textarea");
  quoteText.setAttribute("id", "quoteText" + numOfQuotes);
  quoteText.setAttribute("placeholder", "What is the quote?");
  quoteText.setAttribute("rows", 8);
  quoteText.setAttribute("cols", 26);
  quoteDiv.appendChild(quoteText);

  let quoteAuthor = document.createElement("textarea");
  quoteAuthor.setAttribute("id", "quoteAuthor" + numOfQuotes);
  quoteAuthor.setAttribute("placeholder", "Who is the author of the quote?");
  quoteAuthor.setAttribute("rows", 8);
  quoteAuthor.setAttribute("cols", 26);
  quoteAuthor.setAttribute("style", "margin-right: 8px; margin-left: 8px");
  quoteDiv.appendChild(quoteAuthor);

  let buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("id", "button" + numOfQuotes);
  buttonDiv.setAttribute("class", "quote");
  buttonDiv.setAttribute("style", "margin-bottom:8px");
  quoteDiv.append(buttonDiv);

  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "deleteButton" + numOfQuotes);
  deleteButton.setAttribute("value", numOfQuotes);
  deleteButton.setAttribute("onclick", "deleteQuote(this.id)");
  deleteButton.innerHTML = "Delete quote";
  deleteButton.setAttribute("style", "margin-right: 4px");
  buttonDiv.appendChild(deleteButton);

  let updateButton = document.createElement("button");
  updateButton.setAttribute("id", "updateButton" + numOfQuotes);
  updateButton.setAttribute("value", numOfQuotes);
  updateButton.setAttribute("onclick", "updateOrAddQuote(this.id)");
  updateButton.innerHTML = "Update quote";
  buttonDiv.appendChild(updateButton);
}

function checkNullValues(value) {
  id = value.charAt(value.length - 1);
}

function updateOrAddQuote(value) {
  id = value.replace("updateButton", "");

  console.log(idList);
  console.log(id);
  console.log(idList[idList.length - 1]);
  console.log(id < idList[idList.length - 1]);
  if (id < idList[idList.length - 1] || !newPost) {
    updateQuote(value);
  } else {
    addNewQuote(value);
  }
}

function updateQuote(value) {
  id = value.replace("updateButton", "");
  formattedText = formatContent(
    document.getElementById("quoteText" + id).value
  );
  formattedAuthor = formatContent(
    document.getElementById("quoteAuthor" + id).value
  );

  if (formattedText.length > 0 && formattedAuthor.length > 0) {
    (async () => {
      let result = fetch(
        "https://christinaraganit.live/comp4537/assignments/1/quotesapp/quotes",
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quoteId: id,
            text: document.getElementById("quoteText" + id).value,
            author: document.getElementById("quoteAuthor" + id).value,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          alert("quote updated!");
          return res.json();
        }
      });
    })();
  } else {
    alert("update quote failed!");
  }
}

function addNewQuote(value) {
  id = value.replace("updateButton", "");
  console.log("print new quote" + id);

  formattedText = formatContent(
    document.getElementById("quoteText" + id).value
  );
  formattedAuthor = formatContent(
    document.getElementById("quoteAuthor" + id).value
  );

  if (formattedText.length > 0 && formattedAuthor.length > 0) {
    (async () => {
      let result = fetch(
        "https://christinaraganit.live/comp4537/assignments/1/quotesapp/quotes",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: formattedText,
            author: formattedAuthor,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          alert("Quote added successfully.");
          newPost = false;
          return res.json();
        }
      });
    })();
  } else {
    alert("Adding quote failed!");
  }
}

//quote is string
function formatContent(stuff) {
  return stuff.replace(/(^\")|(\"$)/g, "").replace(/'/g, "\\'");
}

function deleteQuote(value) {
  id = value.replace("deleteButton", "");
  delArray(idList, id);
  console.log(id);

  console.log(value);
  (async () => {
    let result = await fetch(
      "https://christinaraganit.live/comp4537/assignments/1/quotesapp/quotes",
      {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteId: id,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  })();
  document.getElementById("quote" + id).remove();
}

function updateQuoteObject(value) {}

function delArray(list, val) {
  i = list.indexOf(val);
  if (i > -1) {
    list.splice(i, 1);
  }
}
