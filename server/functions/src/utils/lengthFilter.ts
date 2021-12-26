const lengthFilter = (length:20|40|80) => {
  switch(length) {
    case 20:
      return '1';
    case 40:
      return '2';
    case 80:
      return '3';
    default:
      return '3';
  }
}

export default lengthFilter;
