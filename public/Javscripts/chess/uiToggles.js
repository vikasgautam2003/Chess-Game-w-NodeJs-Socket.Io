// public/Javscripts/Chess-Files/uiToggles.js
export function setupToggles() {
  document.getElementById('toggle-history').onclick = () =>
    document.getElementById('mobile-history').classList.toggle('hidden');
  document.getElementById('toggle-chat').onclick = () =>
    document.getElementById('mobile-chat').classList.toggle('hidden');
}
