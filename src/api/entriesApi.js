async function saveEntry(data, date, title, username) {
  const entryData = { data, date, title, username };
  console.log("saving: " + data);
  const response = await fetch("http://localhost:3001/entries", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify(entryData), // body data type must match "Content-Type" header
  });
  return response;
}
async function updateEntry(id, title, data) {
  const entryData = { title, data };

  const response = await fetch(`http://localhost:3001/entries/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify(entryData), // body data type must match "Content-Type" header
  });
  return response;
}

async function getEntries(username, date) {
  console.log("getting entries for " + username + " on " + date);
  const response = await fetch(
    `http://localhost:3001/entries?date=${date}&username=${username}`,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      // body data type must match "Content-Type" header
    }
  );
  const entries = await response.json();
  return entries;
}
async function getEntry(entryId) {
  console.log("id " + entryId);
  const response = await fetch(`http://localhost:3001/entries/${entryId}`, {
    method: "get", // *GET, POST, PUT, DELETE, etc.
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const entries = await response.json();
  return entries;
}
async function deleteEntry(entryId) {
  const res = await fetch(`http://localhost:3001/entries/${entryId}`, {
    method: "DELETE",
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return res;
}

export { saveEntry, getEntries, updateEntry, getEntry, deleteEntry };
