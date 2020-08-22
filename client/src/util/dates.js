export function convertPlaceholderDateInput() {
  const d = new Date();
  const toLocalDate = d.toLocaleDateString();
  const replaceSlash = toLocalDate.replace(/\//g, '-');
  const reverseDate = replaceSlash.split('-').reverse();
  return reverseDate.join('-');
}
