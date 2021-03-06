var StartChapter = 15, EndChapter = 650, CurrentChapter=StartChapter;
async function loadChapter() {
    var elmnt, xhttp;
    //Set Title
    document.getElementById("page-title").innerHTML = "Chapter "+ CurrentChapter;
    document.getElementById("header-title").innerHTML = "Chapter "+ CurrentChapter;
    // Set all Select Labels
    var elmnt = document.getElementsByClassName("lstChapter");
      for (const key in elmnt) {
          if (Object.hasOwnProperty.call(elmnt, key)) {
              const element = elmnt[key];
              element.value=CurrentChapter;
          }
      }
    // Fetch The Chapter
    elmnt = document.getElementById("content");
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {elmnt.innerHTML = this.responseText;}
        if (this.status == 404) {elmnt.innerHTML = "Not Translated.";}
      }
    }
    xhttp.open("GET", "cb/" + CurrentChapter + ".txt", true);
    xhttp.send();
        return;
  }

  function fillChapterList(){
      var elmnt = document.getElementsByClassName("lstChapter");
      for (const key in elmnt) {
          if (Object.hasOwnProperty.call(elmnt, key)) {
              const element = elmnt[key];
              for (let index = StartChapter; index <= EndChapter; index++)element.innerHTML += "<option value='"+ index +"'>Chapter "+index+"</option>";              
          }
      }
  }

  function init(){
      fillChapterList();
      var lastPart = parseInt(location.href.split("#").pop());
      if(lastPart == NaN)CurrentChapter = StartChapter;
      else if(lastPart >= StartChapter && lastPart <= EndChapter)CurrentChapter = lastPart;
      else{
        CurrentChapter = EndChapter;
      }
      
      loadChapter();
  }

  function moveTo(amt){
    window.scrollTo(0,0);
    var toChap = parseInt(CurrentChapter) + parseInt(amt);
      if(toChap >= StartChapter && toChap <= EndChapter){
        CurrentChapter = toChap;
        location.href = location.href.split("#")[0]+"#"+CurrentChapter;
        loadChapter();
      }
  }

  function changeChap(txtTo)
  {
    CurrentChapter=txtTo;
    location.href = location.href.split("#")[0]+"#"+CurrentChapter;
    loadChapter();
  }