export let formatNumber = text => {
  if (text.length === 10) {
    if (text.substring(4, 5) === '-') {
      return '';
    } else {
      return `${text.substring(0, 4)}-${text.substring(4, 10)}`;
    }
  } else {
    return text;
  }
};
