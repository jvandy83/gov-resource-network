export const getTime = () => {
  var d = new Date();
  var time = d.getHours();

  if (time < 12) {
    return 'Good morning';
  }
  if (time > 12 && time <= 17) {
    return 'Good afternoon';
  }
  if (time > 17 && time < 24) {
    return 'Good evening';
  }
};
