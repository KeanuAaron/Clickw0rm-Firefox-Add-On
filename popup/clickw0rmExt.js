function listenForClicks() {
  document.addEventListener("click", (e) => {

    function clickception(tabs) {
      console.log(tabs[0].id);
      console.log(tabs[0]);
      console.log(tabs);
      browser.tabs.sendMessage(tabs[0].id, {
        command: "clickw0rm"
      });
    }

    function stopProcess(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "stop-clickw0rm",
      });
    }

    function reportError(err) {
      console.error(`Could not inject clickw0rm: ${err}`);
    }

    if (e.target.classList.contains("clickw0rm")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(clickception)
        .catch(reportError);
    } else if (e.target.classList.contains("clickw0rm-stop")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(stopProcess)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute clickw0rm content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/clickw0rm.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
