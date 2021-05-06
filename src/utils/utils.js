function strip(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
function divideEntriesByDate(res) {
  var dates = [];
  res.forEach((entry) => dates.push(entry.date));
  var dateSet = new Set(dates);
  // var entriesByDate = [{ date: "", entries: [{}] }];
  var entriesByDate = [];
  for (let date of dateSet) {
    entriesByDate.push({ date, entries: [] });
  }
  entriesByDate.forEach((obj) => {
    res.forEach((entry) => {
      if (obj.date === entry.date) {
        obj.entries.push(entry);
      }
    });
    obj.date = new Date(obj.date);
  });
  return entriesByDate;
}
export { divideEntriesByDate, strip };
