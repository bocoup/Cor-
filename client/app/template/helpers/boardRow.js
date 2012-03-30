define('template/helpers/boardRow', ['Handlebars',"underscore", "hbs!template/boardCell"], function ( Handlebars, _, cell ) {
  function boardRow ( row, columns ) {
    console.log(columns);
    return ["<tr>",
      "<td>",row,"</td>",
      (function() {
        _.map(columns, function(c) {
          console.log(cell({row: row, column: c}))
          return cell({row: row, column: c});
        }).join("");
      })(),
    "</tr>"].join("");
  }
  Handlebars.registerHelper( 'boardRow', boardRow );
  return boardRow;
});
