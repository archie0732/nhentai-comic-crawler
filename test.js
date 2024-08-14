function getToday() {
  const date = new Date();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return m.toString() + d.toString();
}

console.log(getToday());
