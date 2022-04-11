//
// 
//
const MAXVALUE = 20; // 최대 20
const URL = "XXXXXXXXXXXXXXXX";

let getKeyValue = function(jsf, name){
  let ln = jsf.indexOf(name);
  let res = new String();
  let cnt = 0;
  for (var i = 0; i < jsf.length; i++ ) {
    if (jsf[ln+i] == '"') {
      if ( jsf[ln+i+2] == '"')
        cnt = ln+i+3;
      else
        cnt = ln+i+2;
      for (var j = 0; j < jsf.length; j++ ) {
        if (jsf[cnt+j] == '"' || jsf[cnt+j] == undefined) 
          break;
        res += jsf[cnt+j]; 
      }
      break;
    }
  }
  res = res.replace(",", "");
  return res;
}


let getKeywordList = function ( ) {
  let wcn = JSON.parse(UrlFetchApp.fetch(URL).getContentText());
  let wcnj = JSON.stringify(wcn);
  
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  let key_word = new String();
  let category = new String();
  let tSearch  = new String();
  let prodCnt  = new String();
  let compe    = new String();
  let rankd    = new String();


  let tm = new String();
  let tv = new String();

  let cur = 0;
  let ti = 0;

  for ( var j = 0; j < MAXVALUE; j++ ) {
    tm = "";
    for ( var i = ti; i < wcnj.length; i++ ) {
      if ( wcnj[i] == "}") {
        cur = i;
        ti = cur+1;
        break;
      }
      tm += wcnj[i];
    }
    tv[j] += tm;
  }

  for ( var k = 0; k < MAXVALUE; k++ ) {
    key_word[k]     = getKeyValue(tv[k], "keyword");
    category[k]     = getKeyValue(tv[k], "firstCategory");
    tSearch[k]      = getKeyValue(tv[k], "searchCount");
    prodCnt[k]      = getKeyValue(tv[k], "productCount");
    compe[k]        = getKeyValue(tv[k], "competitionIntensity");
    rankd[k]        = getKeyValue(tv[k], 'rank"');
  }

  dat = new Date();

  for (var i = 0; i < MAXVALUE; i++) {
    let count = sheet.getLastRow();
    sheet.appendRow([count, key_word[i], category[i], tSearch[i], prodCnt[i], compe[i], rankd[i], dat, tv[i]]);
  }
  Logger.log("수집 완료");
//  Logger.log(wcnj);
}
