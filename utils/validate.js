const validate = {
  name(name) {
    const regex = /^[a-z ,.'-]+$/i;
    return regex.test(name);
  },

  email(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },

  password(password) {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return regex.test(password);
  },

  dob(dob) {
    const today = new Date();
    return new Date(dob) <= today;
  }
};
module.exports = validate;
