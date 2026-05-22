const menu = () => {
  const menuButton = document.querySelector('.c-menu-button');
  const menu = document.querySelector('.c-menu');

  menuButton.setAttribute('aria-expanded', false);
  menu.hidden = true;
  menuButton.addEventListener('click', () => {
    let currentState = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !currentState);
    menu.hidden = !!currentState;
  });
}

export { menu }

