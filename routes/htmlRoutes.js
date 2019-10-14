module.exports = function(app) {
  app.get("/", function (req, res) {
    res.render("home");
  });
};

// //Handlebars helper for rendering the Articles array passed as rows of three columns each.
// function renderRow ( articleArray ) {
//   let returnHTML = "";
//   returnHTML = ('<div class="row no-collapse-1"><section class="4u"> <a href="#" class="image featured"><img src="images/pic01.jpg" alt=""></a><div class="box">');
//   articleArray.forEach( function ( articleElement, elementIndex ) {
//     returnHTML =+ (`<p>${articleElement.title}</p><a href=${articleElement.link}></a></div></section>`);
//     if (elementIndex % 3 === 0) {
//       returnHTML =+ (`</div><div class="row no-collapse-1"><div class="row no-collapse-1">
//       <section class="4u"> <a href="#" class="image featured"><img src="images/pic01.jpg" alt=""></a><div class="box">`);
//     }
//   });
// }