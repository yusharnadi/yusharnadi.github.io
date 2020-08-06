var base_url = "https://api.football-data.org/v2/";

function status(response) {
	if (response.status !== 200) {
		console.log("Error : " + response.status);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

function json(response) {
	return response.json();
}

function error(error) {
	console.log("Error : " + error);
}

// GET STANDINGS
function getStandings() {
	// get cached api
	if ("caches" in window) {
		caches.match(base_url + "competitions/2021/standings").then(function (response) {
			if (response) {
				response.json().then(function (data) {
					let tableData = `
					<table class="highlight responsive-table" id="standing">
						<thead>
							<tr>
								<th>Pos</th>
								<th colspan="2">Club</th>
								<th>Played</th>
								<th>Won</th>
								<th>Draw</th>
								<th>Lost</th>
								<th>Points</th>
							</tr>
						</thead>

						<tbody id="row-standing"></tbody>
					</table>
					`;
					res = data.standings["0"].table;
					let standings = ``;
					res.map((std) => {
						standings += `
				<tr>
					<td>${std.position}</td>
					<td><img src="${std.team.crestUrl}" alt="teams" height="50px"></td>
					<td><b>${std.team.name}</b></td>
					<td>${std.playedGames}</td>
					<td>${std.won}</td>
					<td>${std.draw}</td>
					<td>${std.lost}</td>
					<td>${std.points}</td>
				</tr>
				`;
					});

					document.getElementById("content").innerHTML = tableData;
					document.getElementById("row-standing").innerHTML = standings;
					document.getElementById("loading").innerHTML = "";
				});
			}
		});
	}

	fetch(base_url + "competitions/2021/standings", {
		headers: {
			"X-Auth-Token": "b5642fe27aad40b889ce82bf55655f07",
		},
	})
		.then(status)
		.then(json)
		.then(function (data) {
			res = data.standings["0"].table;
			let tableData = `
					<table class="highlight responsive-table" id="standing">
						<thead>
							<tr>
								<th>Pos</th>
								<th colspan="2">Club</th>
								<th>Played</th>
								<th>Won</th>
								<th>Draw</th>
								<th>Lost</th>
								<th>Points</th>
							</tr>
						</thead>

						<tbody id="row-standing"></tbody>
					</table>
					`;
			let standings = ``;
			res.map((std) => {
				standings += `
				<tr>
					<td>${std.position}</td>
					<td><img src="${std.team.crestUrl}" alt="teams" height="50px"></td>
					<td><b>${std.team.name}</b></td>
					<td>${std.playedGames}</td>
					<td>${std.won}</td>
					<td>${std.draw}</td>
					<td>${std.lost}</td>
					<td>${std.points}</td>
				</tr>
				`;
			});

			document.getElementById("content").innerHTML = tableData;
			document.getElementById("row-standing").innerHTML = standings;
			document.getElementById("loading").innerHTML = "";
		})
		.catch(error);
}

// GET TEAMS
function getTeams() {
	// get cached api
	if ("caches" in window) {
		caches.match(base_url + "competitions/2021/teams").then(function (response) {
			if (response) {
				response.json().then(function (data) {
					res = data.teams;
					let teams = ``;
					res.map((std) => {
						teams += `
						<div class="col s12 m6">
					<div class="card">
						<div class="card-image">
							<img src="${std.crestUrl}" class="img-card" />

							<a id=${std.id} class="btn-floating halfway-fab waves-effect waves-light green"><i class="material-icons">add</i></a>
						</div>
						<div class="card-content">
							<span class="card-title">${std.name}</span>
							<ul>
								<li>Website : ${std.website}</li>
								<li>Stadium : ${std.venue}</li>
							</ul>
						</div>
					</div>
				</div>
				`;
					});

					document.getElementById("loading").innerHTML = "";

					document.getElementById("teams").innerHTML = teams;
					const Linkid = document.querySelectorAll(".card-image a");
					Linkid.forEach(function (e) {
						e.addEventListener("click", function (event) {
							addFav(e.getAttribute("id"));
						});
					});
				});
			}
		});
	}

	fetch(base_url + "competitions/2021/teams", {
		headers: {
			"X-Auth-Token": "b5642fe27aad40b889ce82bf55655f07",
		},
	})
		.then(status)
		.then(json)
		.then(function (data) {
			res = data.teams;
			let teams = ``;
			res.map((std) => {
				teams += `
				<div class="col s12 m6">
					<div class="card">
						<div class="card-image">
							<img src="${std.crestUrl}" class="img-card" />

							<a id=${std.id} class="btn-floating halfway-fab waves-effect waves-light green"><i class="material-icons">star_rate</i></a>
						</div>
						<div class="card-content">
							<span class="card-title">${std.name}</span>
							<ul>
								<li>Website : ${std.website}</li>
								<li>Stadium : ${std.venue}</li>
							</ul>
						</div>
					</div>
				</div>
				`;
			});

			document.getElementById("loading").innerHTML = "";

			document.getElementById("teams").innerHTML = teams;

			const Linkid = document.querySelectorAll(".card-image a");
			Linkid.forEach(function (e) {
				e.addEventListener("click", function (event) {
					addFav(e.getAttribute("id"));
				});
			});
		})
		.catch(error);
}

function addFav(id) {
	if ("caches" in window) {
		caches.match(base_url + "competitions/2021/teams").then(function (response) {
			if (response) {
				response.json().then(function (data) {
					res = data.teams;
					let teamDetail = res.filter(function (dt) {
						return dt.id == id;
					});
					saveForLater(teamDetail["0"]);
					let Btn = document.getElementById(id);
					Btn.remove();
				});
			}
		});
	}
}

function getFavorite() {
	getAll().then(function (record) {
		let fav = "";
		record.forEach(function (fv) {
			fav += `
			<tr>
				<td><img src="${fv.crestUrl}" height="100px" /></td>
				<td><b>${fv.name}</b></td>
				<td><b>${fv.venue}</b></td>
				<td><a class="waves-effect waves-light btn-small green" id="${fv.id}" onclick="deleteOne(${fv.id})"><i class="material-icons">delete_forever</i></a></td>
			</tr>
			`;
		});

		document.getElementById("content").innerHTML = fav;
		document.getElementById("loading").innerHTML = "";
	});
}
