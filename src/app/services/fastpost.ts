import { ImageOption } from "../upload-csv/importcsvSlice";

const setInputFiles = (selector, file: File) => {
  const inputFile = document.querySelector(selector) as HTMLInputElement;
  let list = new DataTransfer();
  list.items.add(file);
  inputFile.files = list.files;
  const eventTmp = new Event("change", { bubbles: true });
  inputFile.dispatchEvent(eventTmp);
};

const fill = (selector, value) => {
  const inputText = document.querySelector(selector) as HTMLInputElement;
  inputText.value = value;
  const eventTmp = new Event("change", { bubbles: true });
  inputText.dispatchEvent(eventTmp);
};

export const run = (newImageOption: ImageOption) => {
  // setInputFiles('input#select-image-base', newImageOption.imageFile)
  fill("#work_title_en", newImageOption.title);
  fill("#work_tag_field_en", newImageOption.tags);
  fill("#work_description_en", newImageOption.description);
};
export const addTask = (newImageOption: ImageOption) => {
  chrome.runtime.sendMessage(
    {
      addTask: true,
      task: {
        imageOption: newImageOption,
        duplicateUrl: window.location.href,
      },
    },
    (response) => {
      console.log("foreground got response", response);
    }
  );
};
export default run;
