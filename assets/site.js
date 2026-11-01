const toggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
if (toggle && navigation) {
  const closeMenu = () => { navigation.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
}
