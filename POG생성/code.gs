const MAX_VALUE=100;

var ss  = SpreadsheetApp.getActiveSpreadsheet();

function clearValue_Col( val, col, row)
{
  for(var i = 0; i < MAX_VALUE; i++ ) {
    val.getRange(col+i, row).setValue( [""] );
  }
}

function initResult( sheet )
{
  clearValue_Col( sheet, 5, 1);
  clearValue_Col( sheet, 5, 2);
  clearValue_Col( sheet, 5, 3);
  clearValue_Col( sheet, 5, 4);

  return;
}


function moveSheet( sheet, num )
{
  SpreadsheetApp.setActiveSheet(sheet.getSheets()[num]);
}

function addPOGData( sheet, sheet2 )
{
  sheet2.insertRows(sheet.getLastRow());
  var vl = sheet.getRange("A:B").getValues();
  for(var i = 0; i < sheet.getLastRow(); i++ ) {
    if ( vl[i][0] != "") {
      for (var j = 0; j < ss.getSheets()[2].getLastRow(); j++) {
        if (ss.getSheets()[2].getRange(1+j, 2).getValues() == vl[i][0]) {
          sheet2.getRange(5+i, 1).setValue( [ i+1 ] ).setHorizontalAlignment("center");
          sheet2.getRange(5+i, 2).setValue( ss.getSheets()[2].getRange(1+j, 1).getValues() );
          sheet2.getRange(5+i, 3).setValue( [ vl[i][0] ] );
        }
      }
    }
  }
  return 0;
}

//
function createPOG() 
{  
  moveSheet( ss, 1 );
  var st0 = ss.getSheets()[0];
  var st1 = ss.getSheets()[1];
  
  initResult( st1 );
  addPOGData( st0, st1 );
}
