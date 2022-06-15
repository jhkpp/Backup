function createPOG() 
{
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var st = ss.getSheets()[0].getRange("A:B");
  var vl = st.getValues();

  var st2 = ss.getSheets()[1];
  for(var i = 0; i < 100; i++ ) {
    st2.getRange(5+i, 1).setValue( [""] );
    st2.getRange(5+i, 3).setValue( [""] );
  }

  for(var i = 0; i < st.getLastRow(); i++ ) {
    if ( vl[i][0] != "") {
      st2.getRange(5+i, 1).setValue( [ i+1 ] );
      st2.getRange(5+i, 3).setValue( [ vl[i][0] ] );
    }
  }

  SpreadsheetApp.setActiveSheet(ss.getSheets()[1]);

  return
}
