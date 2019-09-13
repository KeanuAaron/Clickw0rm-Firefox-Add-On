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
        saveTextAsFile();
      }

      function saveTextAsFile() {
        var movieList = [];
        var reqMovies = document.getElementsByClassName("movieQueue");

        for (var i=0; i < reqMovies.length; i++) {
          movieList.push(reqMovies[i].innerText + '\n');
        }
        var textFileAsBlob = new Blob([movieList.toString()], {type:'text/plain'});
          var downloadLink = document.createElement("a");
        downloadLink.download = "requestedMovies" +(Math.floor(Date.now() / 1000))+".txt";
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    }


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
