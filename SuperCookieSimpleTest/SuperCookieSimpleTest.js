	// Generate creates a new unique ID based on a series of random binary values.
	function generate() {

		var random = []

		for (i = 0; i < 4; i++) {
			random.push(Math.random() < .5 ? 1 : 0)
		}

		return random;
	}

	// Prettify generates a verbose ID by reversing id and concatenating an
	// alternating sequence of both id and its reverse, finally returning a
	// Base-36 interpretation that is more legible to human readers.
	function prettifyID(id) {
		var reverseID = id.split("").reverse().join("");
		var rawID = id.concat(reverseID, id, reverseID);
		return parseInt(rawID, 2).toString(36);
	}

	// Read traverses each binary value associated with a list of HSTS-manipulated
	// endpoints and compiles a unique key based on the returned values. The key is
	// displayed as a text-based value in elementID.
	function readAndDisplay(blurbElement, idElement) {

		var flags = {};
		var numCallsLeft = 4;

		for (var i = 1; i < numCallsLeft + 1; i++) {
			var xhttp = new XMLHttpRequest();
			var url = "http://" + i + "-supercookies.azurewebsites.net/api/hsts/read";

			xhttp.open("GET", url, true);
			xhttp.setRequestHeader("Accept", "application/json");

			xhttp.onreadystatechange = (function(xhttp, index) {
				return function() {
					if (xhttp.readyState == 4 && xhttp.status == 200) {

						var response = JSON.parse(xhttp.responseText);
						flags[index] = response.IsSet == true ? 1 : 0;

						numCallsLeft = numCallsLeft - 1;
						if (numCallsLeft == 0) {
							var result = flags["1"].toString()
								.concat(flags["2"],
									flags["3"],
									flags["4"]);

							if (result === "0000") {
								$("#" + blurbElement).text("ID not found. Creating...");

								// No ID has been set. Create and set a new ID.

								var id = generate();

								for (j = 0; j < id.length; j++) {
									if (id[j] === 1) {
										var request = new XMLHttpRequest();
										var prefix = j + 1;
										var writer = "http://" + prefix +
											"-supercookies.azurewebsites.net/api/hsts/write";

										request.open("GET", writer, true);
										request.send();
									}
								}
								result = id.join("");
							}

							$("#" + blurbElement).text("Your ID is");
							$("#" + idElement).text(prettifyID(result));
						}
					}
				}
			})(xhttp, i);

			xhttp.send();
		}
	}