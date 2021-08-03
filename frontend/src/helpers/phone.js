export const getFormattedPhone = (str) => {
  let arr = str.split("")
  arr.splice(10, 0, "-")
  arr.splice(8, 0, "-")
  arr.splice(5, 0, " ")
  arr.splice(5, 0, ")")
  arr.splice(2, 0, "(")
  arr.splice(2, 0, " ")
  return arr.join("")
}

export const getFormattedPrice = (int) => {
  return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const isNotEmptyObject = (obj) => {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      return true;
    }
  }
  return false;
}