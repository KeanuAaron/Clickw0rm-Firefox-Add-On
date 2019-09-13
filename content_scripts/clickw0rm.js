(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;


  function glueToPage(el, elName, isId, isText) {
      var item = document.createElement( el );
      if (isId) {
          item.id = elName;
      } else { item.className = elName; }

      item.innerText += isText;
      document.body.appendChild( item );
      console.log("Created Item: [ "+el+" ]");
  }
  var elem = "";
  function ElementListener(event) {
    event.preventDefault();
    var t = (event.srcElement);
    //console.log(t.className);
    elem += t.className;
  }
  function getMovieLinks(event) {
    event.preventDefault();
    console.log(event.target);
    glueToPage("h1", "movieQueue", false, event.target);
  }
  function checkForElement() {
    if (elem === "") {
      setTimeout(checkForElement, 50);
    } else {
      alert("++ Element Found! You can now start collecting elements to gather. ++");
      console.log(elem);
      document.removeEventListener('click', ElementListener);

      var movieItems = document.getElementsByClassName(elem);
      for (var i=0; i < movieItems.length; i++) {
      x = i;
        movieItems[i].id = x;
        movieItems[i].addEventListener("click", getMovieLinks);
      }
    }
  }
  function activateClickw0rm() {
    alert("++ Initiated Clickw0rm Injection ++\n++ Click element you want to gather to set variable ++");
    document.addEventListener("click", ElementListener);
    //glueToPage("button", "stop-clickw0rm", true, "Stop Clickw0rm");
    checkForElement();
  }
  function stopClickw0rm() {
    alert("++ Clickw0rm Injection has been stopped! You can now continue browsing normally. ++")
    var movieItems = document.getElementsByClassName(elem);
    for (var i=0; i < movieItems.length; i++) {
    x = i;
      movieItems[i].id = x;
      movieItems[i].removeEventListener("click", getMovieLinks);
    }
  };


  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "clickw0rm") {
      activateClickw0rm();
      console.log(message.command);
    } else if (message.command === "stop-clickw0rm") {
      stopClickw0rm();
      console.log(message.command);
    } else { console.log(message.command); }
  });
})();
