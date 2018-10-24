$(function() {
  $("#form-register").on("submit", function(e) {
    e.preventDefault();

    const first_name = $("#input-first-name")
      .val()
      .trim();
    const last_name = $("#input-last-name")
      .val()
      .trim();
    const email = $("#input-email")
      .val()
      .trim();
    const password = $("#input-password")
      .val()
      .trim();
    const gender = $("input[name=radio-gender]:checked").val();
    const dob = $("#input-dob")
      .val()
      .trim();
    const height_in = $("#input-height").val();

    if (
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !gender ||
      !dob ||
      !height_in
    ) {
      console.log("Please fill in all fields."); // TODO: replace with onscreen error
    } else {
      $.post("/register", {
        first_name,
        last_name,
        email,
        password,
        gender,
        dob,
        height_in
      })
        .done(function(data, status, jqXHR) {
          window.location = "/dashboard";
        })
        .fail(function(jqXHR, status, error) {
          console.log(JSON.parse(jqXHR.responseText).error); // TODO: replace with onscreen error
        });
    }
  });
});
