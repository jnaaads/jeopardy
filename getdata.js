var getData = function(url) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', function() {
			if (xhr.status==200) {
				resolve(JSON.parse(xhr.response))
			}
		})
		xhr.addEventListener('error', function() {
			reject(console.log("Network Error"));
		})
		xhr.open("GET", url);
		xhr.send();
	})
}

getData("http://jservice.io/api/categories?count=5&offset=10")
.then(result => {
	var categories = "";
	var values = "";
	var n = 0;

	for (var i=0; i<result.length; i++) {
		categories += "<div class='category'>" + result[i].title + "</div>";

		var catLink = "http://jservice.io/api/category?id=" + result[i].id;
		getData(catLink).then(result => {
			for (var j=0; j<=4; j++) {
				values += "<div class=";
				if (j==0) {
					values += "'first' ";
				} else if (j==1) {
					values += "'second' ";
				} else if (j==2) {
					values += "'third' ";
				} else if (j==3) {
					values += "'fourth' "
				} else {
					values += "'fifth' "
				}

				values += "id='" + n + j + "'";
				values += " onClick='clickHandler(" + result.id + ", " + j + ", this.id)'>" + result.clues[j].value + "</div>";
			}
			n++;
			document.getElementById("grid-answers").innerHTML = values;
		})
	}
	document.getElementById("grid-category").innerHTML = categories;
})

var clickHandler = function(id, clueNum, div) {
	var url = "http://jservice.io/api/category?id=" + id;
	getData(url).then(result => {
		document.getElementById(div).innerHTML = result.clues[clueNum].question;
		console.log(result.clues[clueNum].answer);
		document.getElementById(div).style.lineHeight = "normal";
	})
}