$(function() {
  document.getElementById("input-date").valueAsDate = new Date();

  $(document).on("click", "#btn-logout", function(e) {
    e.preventDefault();
    $.get("/logout")
      .done(function(data, status, jqXHR) {
        window.location = "/";
      })
      .fail(function(jqXHR, status, error) {
        console.log(jqXHR);
      });
  });

  function renderCharts() {
    $.get("/api/users")
      .done(function(dbUser, status, jqXHR) {
        const dates = dbUser.Logs.map(log => new Date(log.entry_date));
        const weights = dbUser.Logs.map(log => log.weight_lb);

        const chartWeight = document
          .getElementById("chart-weight")
          .getContext("2d");
        const chart1 = new Chart(chartWeight, {
          // The type of chart we want to create
          type: "line",

          // The data for our dataset
          data: {
            labels: dates,
            datasets: [
              {
                label: "Weight (lbs)",
                backgroundColor: "transparent",
                borderColor: "rgb(51, 153, 255)",
                lineTension: 0.01,
                data: weights
              }
            ]
          },

          // Configuration options go here
          options: {
            legend: { display: false },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Weight (lbs)"
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: "Days"
                  },
                  type: "time",
                  time: {
                    displayFormats: { day: "MMM DD" },
                    tooltipFormat: "DD-MMM-YY",
                    unit: "day"
                  }
                }
              ]
            }
          }
        });

        const lastLog = dbUser.Logs[dbUser.Logs.length - 1];
        const net_carbs = lastLog.net_carbs;
        const net_protein = lastLog.net_protein;
        const net_fat = lastLog.net_fat;
        const chartMacros = document
          .getElementById("chart-macros")
          .getContext("2d");
        const chart2 = new Chart(chartMacros, {
          type: "bar",
          data: {
            labels: ["Carbs", "Protein", "Fat"],
            datasets: [
              {
                label: "grams",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
                data: [net_carbs, net_protein, net_fat]
              }
            ]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: `Your Macros for ${lastLog.entry_date}`
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Amount (g)"
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      })
      .fail(function(jqXHR, status, error) {
        console.log(jqXHR);
      });
  }

  // * trigger form submit (necessary because button is not within form div)
  $(document).on("click", "#btn-new-entry", function(e) {
    e.preventDefault();
    $("#form-add-entry").submit();
  });

  $(document).on("submit", "#form-add-entry", function(e) {
    e.preventDefault();

    const entry_date = $("#input-date").val();
    const weight_lb = $("#input-weight").val();
    const act_lvl = $("#input-activity").val();
    const fat_pct = $("#input-fat").val() / 100;
    const cal_deficit = $("#input-caloric-def").val() / 100;
    const net_carbs = $("#input-net-carbs").val();

    if (weight_lb) {
      // * only send data if non-empty value
      const data = {
        ...(entry_date && { entry_date }),
        ...(weight_lb && { weight_lb }),
        ...(act_lvl && { act_lvl }),
        ...(fat_pct && { fat_pct }),
        ...(cal_deficit && { cal_deficit }),
        ...(net_carbs && { net_carbs })
      };

      $.post("/api/logs", data)
        .done(function(data, status, jqXHR) {
          location.reload();
        })
        .fail(function(jqXHR, status, error) {
          console.log(jqXHR);
        });
    } else {
      console.log("Weight must be entered.");
    }
  });

  // * initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // * render charts
  renderCharts();

  // ------------------------  NOT IMPLEMENTED YET  -----------------------
  // async function getData() {
  //   let result;

  //   try {
  //     result = await $.get("/api/users");

  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // getData().then(data => console.log(data));
});
