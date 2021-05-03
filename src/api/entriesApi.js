import serverUrl from "./config";

// if (process.env.NODE_ENV === "development")
//   serverUrl = process.env.REACT_APP_LOCAL_SERVER_URL;
// else if (process.env.NODE_ENV === "production")
//   serverUrl = process.env.REACT_APP_HEROKU_SERVER_URL;
async function saveEntry(data, date, title, username) {
  const entryData = { data, date, title, username };
  console.log("saving: ", data);
  console.log(data);
  const response = await fetch(`${serverUrl}entries`, {
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

  const response = await fetch(`${serverUrl}entries/${id}`, {
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
async function getNumberOfEntries(username) {
  console.log("getting number of entries for " + username);
  const response = await fetch(
    `${serverUrl}entries/count?username=${username}`,
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

async function getEntries(username, date, amount, order) {
  console.log("getting entries for " + username + " on " + date);
  const encodedDate = encodeURIComponent(date);
  console.log(encodedDate);

  const response = await fetch(
    `${serverUrl}entries?date=${encodedDate}&username=${username}&amount=${amount}&order=${order}`,
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
  const response = await fetch(`${serverUrl}entries/${entryId}`, {
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
  const res = await fetch(`${serverUrl}entries/${entryId}`, {
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

export {
  saveEntry,
  getEntries,
  updateEntry,
  getEntry,
  deleteEntry,
  getNumberOfEntries,
};
