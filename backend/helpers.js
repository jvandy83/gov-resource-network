module.exports = getUser = (data) => {
  const { auth_0_user, mongo_user } = data;
  return !!auth_0_user ? auth_0_user : mongo_user;
};
