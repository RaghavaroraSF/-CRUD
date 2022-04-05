var loadBtn = document.getElementById("loadBtn");
loadBtn.classList.remove("hidden");
var jsonData;
var column = [];
const cr = document.querySelector(".crud");
cr.classList.add("hidden");
fetch("data.json")
  .then((res) => res.json())
  .then((data) => (jsonData = data));

loadBtn.addEventListener("click", function () {
  cr.classList.remove("hidden");
  loadBtn.classList.add("hidden");
  for (var i = 0; i < jsonData.length; i++) {
    for (var key in jsonData[i]) {
      if (column.indexOf(key) === -1) {
        column.push(key);
      }
    }
  }
  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");
  table.classList.add("table");
  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
  var tr = table.insertRow(-1); // TABLE ROW.
  for (var i = 0; i <= column.length; i++) {
    var th = document.createElement("th");
    if (column[i] !== undefined) {
      th.innerHTML = column[i];
      tr.appendChild(th);
    } else {
      th.innerHTML = "Options";
      tr.appendChild(th);
    }
  }
  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < jsonData.length; i++) {
    tr = table.insertRow(-1);
    for (var j = 0; j <= column.length; j++) {
      var tabCell = tr.insertCell(-1);
      if (column[j] === undefined) {
        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        tabCell.appendChild(editBtn);
        editBtn.classList.add("edit-Btn");
        editBtn.addEventListener("click", function (event) {
          return editRow(event);
        });
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        tabCell.appendChild(deleteBtn);
        deleteBtn.classList.add("delete-Btn");
        deleteBtn.addEventListener("click", function (event) {
          return deleteRow(event);
        });
      } else {
        tabCell.innerHTML = jsonData[i][column[j]];
      }
    }
  }
  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
});
function editRow(e) {}
function deleteRow(e) {
  var row = e.target.parentElement.parentElement;
  if (e.target.innerHTML === "Delete") {
    var index = row.rowIndex;
    row.parentElement.removeChild(row);
    jsonData.splice(index - 1, 1);
  }
}
