module.exports = function calculateMacros(
  age,
  gender,
  height,
  weight,
  activity,
  bodyFatPc,
  caloricDeficit,
  carbs
) {
  /* User should input:
age in years
gender = M or F
height in inches
weight in lbs
bodyFatPc is a percentage but should be converted to decimals. 
caloricDeficit is a percentage but should be converted to decimals. This is the rate at which user wants to lose weight. Range is 10%-20%. Max is 30%.
carbs is the grams of carbs that are allowed in a keto diet. User has three options to choose from - 20gms, 25gms, 30gms. 
activity levels:
Light - 1.375
Moderate - 1.55
Hard - 1.725
*/

  //Calculate BMR (basal metabolic rate) based on gender

  if (gender === "M") {
    var BMR = 66 + 6.2 * weight + 12.7 * height - 6.76 * age;
  } else if (gender === "F") {
    var BMR = 65.1 + 4.35 * weight + 4.7 * height - 4.7 * age;
  }

  // Calculate TDEE (total daily energy expenditure in calories) using BMR and activity levels
  var TDEE = BMR * activity;

  // Calculate bodyFat in lbs using weight and body fat %
  var bodyFat = weight * bodyFatPc;

  // Calculate LBM (lean body mass) in lbs using weight and body fat calculated in the previous step
  var leanBodyMass = weight - bodyFat;

  // Calculate new calorie count based on TDEE and caloric deficit entered by the user
  var newCaloriesCount = TDEE - TDEE * caloricDeficit;

  // Calculate calories from carbs in gms and then calculate % of calories
  var carbsCalories = carbs * 4;
  var carbsCaloriesPc = carbsCalories / newCaloriesCount;

  // Calculate proteins in gms using lean body mass and a multiplier that is based on activity level
  var protein = leanBodyMass * 0.8;

  // Calculate calories that should be consumed from proteins
  var proteinCalories = protein * 4;

  // Calculate % of calories that should be consumed from proteins
  var proteinCaloriesPc = proteinCalories / newCaloriesCount;

  // Calculate % of calories that should be consumed from fat
  var fatCaloriesPc = 1 - (carbsCaloriesPc + proteinCaloriesPc);

  // Calculate fat in gms that should be consumed
  var fat = (fatCaloriesPc * newCaloriesCount) / 9;

  // Output of macros should be in gms
  var macros = {
    protein,
    fat,
    carbs
  };
  return macros;
};
