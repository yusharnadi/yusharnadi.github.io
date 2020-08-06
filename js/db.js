var dbPromised = idb.open("epl-app", 1, function (upgradeDb) {
	let teamObjectStore = upgradeDb.createObjectStore("favorite");
	// teamObjectStore.createIndex("id", "id", { unique: false });
});

function saveForLater(team) {
	dbPromised
		.then(function (db) {
			let tx = db.transaction("favorite", "readwrite");
			let store = tx.objectStore("favorite");
			const item = {
				id: team.id,
				name: team.name,
				crestUrl: team.crestUrl,
				venue: team.venue,
			};
			store.put(item, item.id);
			return tx.complete;
		})
		.then(function () {
			console.log("favorite team berhasil di simpan.");
		})
		.catch(function (e) {
			console.log("error db : " + e);
		});
}

function getAll() {
	return new Promise(function (resolve, reject) {
		dbPromised
			.then(function (db) {
				let tx = db.transaction("favorite", "readonly");
				let store = tx.objectStore("favorite");
				return store.getAll();
			})
			.then(function (record) {
				resolve(record);
			});
	});
}

function deleteOne(id) {
	dbPromised
		.then(function (db) {
			let tx = db.transaction("favorite", "readwrite");
			let store = tx.objectStore("favorite");
			store.delete(id);
			getFavorite();
			return tx.complete;
		})
		.then(function () {
			console.log("Item deleted");
		});
}
