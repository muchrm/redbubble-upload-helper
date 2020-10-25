import * as React from "react";
import * as ReactDOM from "react-dom";
import UploadCsv from "./upload-csv/UploadCsv";

import "../styles/global.css";
import { configuredStore } from "./store";
import { Provider } from "react-redux";
import ShowCsv from "./table-csv/TableCsv";
import run from "./services/fastpost";

// chrome.runtime.sendMessage({}, (response) => {
//     var checkReady = setInterval(() => {
//         if (document.readyState === "complete") {
//             clearInterval(checkReady)
//             console.log("We're in the injected content script!")
//         }
//     })
// })

const store = configuredStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="popup-padded">
          {/* <h1>{ chrome.i18n.getMessage("l10nHello") }</h1> */}
          <UploadCsv />
          <ShowCsv />
        </div>
      </Provider>
    );
  }
}

// --------------

const injectedContent = document.createElement("div");
injectedContent.setAttribute("id", "root-content-ui");
document.body.appendChild(injectedContent);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.task){
    console.log('got task',message.task)
    run(message.task.imageOption)
  }
  sendResponse({})
})

chrome.runtime.sendMessage(
  {
    myTask: true,
  },
  (response) => {
    console.log("foreground got response", response);
  }
);

ReactDOM.render(<App />, document.getElementById("root-content-ui"));
