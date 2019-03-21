module.exports.normalize = sn => {
  const raw = sn.replace(/\D/g, "");
  if (raw.length == 9) {
    return raw.slice(0, 4) + "-" + raw.slice(4);
  }
  if (raw.length == 7) {
    return (
      (Number.parseInt(raw[0]) <= 1 ? "20" : "19") +
      raw.slice(0, 2) +
      "-" +
      raw.slice(2)
    );
  }

  return null;
};
