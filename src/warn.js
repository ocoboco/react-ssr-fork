export default function warn(messsage) {
  if (typeof console !== 'undefined') {
    console.error(messsage);
  }
}