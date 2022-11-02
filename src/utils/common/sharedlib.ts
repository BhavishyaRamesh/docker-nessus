import crypto from 'crypto'


export const cryptoText = (data: any, type: any) => {
  try {
    if (type === "generate") {
      const hash = crypto.createHash("sha512");
      hash.update(data);
      return hash.digest("hex");
    }
  } catch (error) {
    return false;
  }
};



exports.pad = function(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
};

exports.DataInterval = function(interval) {
  let date = new Date(); // Now
  date.setDate(date.getDate() + interval); // Set now + 30 days as the new date
  return (
    (date.getFullYear() < 10
      ? "0" + date.getFullYear().toString()
      : date.getFullYear().toString()) +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1).toString()
      : (date.getMonth() + 1).toString()) +
    "-" +
    (date.getDate() < 10
      ? "0" + date.getDate().toString()
      : date.getDate().toString())
  );
};

exports.ValidateEmail = function(data) {
  let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return mailformat.test(data);
};

exports.getBeforeAt = function(str) {
  return (str.charAt(0).toUpperCase() + str.slice(1))
    .split("@")[0]
    .replace(/\d/g, "");
};


exports.separator = function(str, sep) {
  let output = "";
  for (let i = str.length; i > 0; i -= 4) {
    if (output) {
      output =
        str.charAt(i - 4) +
        str.charAt(i - 3) +
        str.charAt(i - 2) +
        str.charAt(i - 1) +
        sep +
        output;
    } else {
      output =
        str.charAt(i - 4) +
        str.charAt(i - 3) +
        str.charAt(i - 2) +
        str.charAt(i - 1);
    }
  }
  return output;
};
