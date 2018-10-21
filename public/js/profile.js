$(function() {
  $(".weight-unit:contains('lbs')").toggleClass("active focus");
  $(".height-unit:contains('in')").toggleClass("active focus");

  $(document).on("click", ".weight-unit",function(e) {
    e.preventDefault();
    $(".weight-unit")
      .not(this)
      .removeClass("active focus");
    $(this).toggleClass("active focus");
  });

  $(document).on("click", ".height-unit",function(e) {
    e.preventDefault();
    $(".height-unit")
      .not(this)
      .removeClass("active focus");
    $(this).toggleClass("active focus");
  });

  // * trigger form submit (necessary because button is not within form div)
  $(document).on("click", "#btn-new-entry", function(e) {
    e.preventDefault();
    $("#form-add-entry").submit();
  });

  $(document).on("submit", "#form-add-entry", function(e) {
    e.preventDefault();
    const data = {
      entry_date: new Date(),
      gender: $("input[name=radio-gender]:checked").val(),
      age: $("#input-age").val(),
      weight_lb: $("#input-weight").val(),
      height_in: $("#input-height").val(),
      act_lvl: $("#input-activity").val(),
      fat_pct: $("#input-fat").val(),
      cal_deficit: $("#input-caloric-def").val() / 100,
      net_carbs: $("#input-net-carbs").val()
    };

    $.post("/profile", data)
      .done(function(data, status, jqXHR) {
        // TODO maybe update page here?
        window.location = "/profile";
      })
      .fail(function(jqXHR, status, error) {
        console.log(jqXHR);
      });
  });
});
