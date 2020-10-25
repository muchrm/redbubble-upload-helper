const workers = {};

const tasks = [];

let managementProcess: number = null;

const isRegisteredWorker = (tabId) => workers[tabId];

const isProcessingWorker = (tabId) =>
  isRegisteredWorker(tabId) && workers[tabId].status == "process";

const isAvailableTask = () => tasks.find((task) => task.status == "waiting");
const isAvailableWorker = () => {
    const workerKeyAvailable = Object.keys(workers).find((workerKey) => workers[workerKey].status == "waiting");
    if(workerKeyAvailable){
        return workers[workerKeyAvailable]
    }
    return workerKeyAvailable;
}

const sendProcessingTask = (tabId) => {
  console.log("sendingMessage", { tabId, task: workers[tabId].task });
  chrome.tabs.sendMessage(tabId, { task: workers[tabId].task }, (response) => {
    console.log(response);
  });
};

const registerAvailableWorker = (tabId) => {
  workers[tabId] = { status: "waiting",tabId };
  const availableTask = isAvailableTask();
  console.log(workers[tabId],availableTask)
  if (availableTask) {
    availableTask.status = "process";
    workers[tabId].task = availableTask;
    workers[tabId].status = "process";
    sendProcessingTask(tabId);
  }
};

const addTask = (task) => {
    task.status = 'waiting';
    tasks.push(task);
    const availableWorker = isAvailableWorker()
    if(availableWorker){
        task.status = "process";
        availableWorker.task = task;
        availableWorker.status = "process";
        sendProcessingTask(availableWorker.tabId);
    }
  };

const handleWorker = (tabId: number) => {
  if (!managementProcess) {
    managementProcess = tabId;
    chrome.tabs.sendMessage(tabId, { management: true }, (response) => {
        console.log(response);
      });
  } else if (isProcessingWorker(tabId)) {
    sendProcessingTask(tabId);
  } else if (!isRegisteredWorker(tabId)) {
    registerAvailableWorker(tabId);
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background got a message!", { sender, message });
  const tabId = sender.tab.id;
  if (message.myTask) {
    handleWorker(tabId);
  }
  if (message.addTask) {
    addTask(message.task);
  }
  sendResponse({ status: "success" });
});
