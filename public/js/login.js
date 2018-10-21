$(function() {
  $("#btn-login").on("click", function(e) {
    e.preventDefault();

    const email = $("#input-email")
      .val()
      .trim();
    const password = $("#input-password")
      .val()
      .trim();

    if (!email || !password) {
      console.log("Please fill in email and password.");
    } else {
      $.post("/login", { email, password })
        .done(function(data, status, jqXHR) {
          window.location = "/profile";
        })
        .fail(function(jqXHR, status, error) {
          console.log(JSON.parse(jqXHR.responseText).error);
        });
    }
  });
});
