(function() {
	var tableBody = document.querySelector("tbody");
	function createRow(alias, query) {
		var row = document.createElement("tr");
		var aliasCell = document.createElement("td");
		var queryCell = document.createElement("td");
		aliasCell.appendChild(document.createTextNode(alias));
		queryCell.appendChild(document.createTextNode(query));
		row.appendChild(aliasCell);
		row.appendChild(queryCell);
		tableBody.appendChild(row);
	}
	Object.keys(mqa.queries).forEach(function(key) {
		createRow(key, mqa.queries[key]);
	});
	mqa.on("devicewidth", function evtHandler(enabled) {
		console.log("devicewidth", enabled);
	});
}());