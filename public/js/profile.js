$(function() {
  $(".weight-unit:contains('lbs')").toggleClass("active focus");
  $(".height-unit:contains('in')").toggleClass("active focus");

  $(document).on("click", ".weight-unit", function(e) {
    e.preventDefault();
    $(".weight-unit")
      .not(this)
      .removeClass("active focus");
    $(this).toggleClass("active focus");
  });

  $(document).on("click", ".height-unit", function(e) {
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

    const gender = $("input[name=radio-gender]:checked").val();
    const age = $("#input-age").val();
    const weight_lb = $("#input-weight").val();
    const height_in = $("#input-height").val();
    const act_lvl = $("#input-activity").val();
    const fat_pct = $("#input-fat").val();
    const cal_deficit = $("#input-caloric-def").val() / 100;
    const net_carbs = $("#input-net-carbs").val();

    // * only send data if non-empty value
    const data = {
      ...(gender && { gender }),
      ...(age && { age }),
      ...(weight_lb && { weight_lb }),
      ...(height_in && { height_in }),
      ...(act_lvl && { act_lvl }),
      ...(fat_pct && { fat_pct }),
      ...(cal_deficit && { cal_deficit }),
      ...(net_carbs && { net_carbs })
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
