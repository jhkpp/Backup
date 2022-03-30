//
function doGet( e ) {
  return HtmlService.createTemplateFromFile("index").evaluate()
                                                    .setTitle("마진계산기");
}
