export default function formValidation(values, responseCode, what) {
  let errors = {};
  console.log(`FEEDBACK ${values.image} ${responseCode} ${what}`);

  switch (what) {
    case "register":
      if (!values.email) {
        errors.email = "Email required";
      } else if (
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(
          values.email
        )
      ) {
        errors.email = "Invalid email";
      }

      if (!values.username.trim()) {
        errors.username = "Username required";
      } else if (values.username.length < 3) {
        errors.username =
          "Username must be at least 3 characters & less than 30 characters";
      } else if (values.username.length > 30) {
        errors.username = "Username is too long";
      }

      if (!values.password) {
        errors.password = "Password required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      break;

    case "login":
      if (responseCode != "200") {
        errors.error = "Email or password incorrect";
      }
      break;

    case "create post":
      if (!values.title.trim()) {
        errors.title = "Title required";
      } else if (values.title.length < 3) {
        errors.title = "Title must be at least 3 characters";
      } else if (values.title.length > 150) {
        errors.title = "Title is too long";
      }

      if (!values.description.trim()) {
        errors.description = "Please tell us about this cutie!";
      } else if (values.description.length < 8) {
        errors.description = "Description must be at least 8 characters";
      } else if (values.description.length > 1000) {
        errors.description = "Description too long";
      }

      if (values.image == "") {
        errors.image = "Image required";
      }
      break;
    default:
      break;
  }
  console.log(errors);
  return errors;
}