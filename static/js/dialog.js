const dialog = (dialogSelector, buttonSelector) => {
  const dialog = document.querySelector(dialogSelector);
  const buttons = [...document.querySelectorAll(buttonSelector)];
  const closeButton = dialog.querySelector('dialog button');
  buttons.forEach(b => {
    b && b.addEventListener('click', () => dialog.showModal());
  });
  closeButton.addEventListener('click', () => dialog.close());
}

export { dialog }