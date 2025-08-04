// public/Javscripts/Chess-Files/popups.js

export function showPopup(msg) {
  const container = document.getElementById('popup-container');
  const p = document.createElement('div');
  p.className = [
    'fixed','top-6','left-1/2','transform','-translate-x-1/2',
    'z-50','bg-white','border-l-4','border-blue-500',
    'text-blue-800','p-4','rounded','shadow-lg',
    'min-w-[280px]','max-w-sm'
  ].join(' ');
  p.innerHTML = `
    <div>${msg}</div>
    <button class="absolute top-1 right-2 text-xl leading-none">&times;</button>
  `;
  p.querySelector('button').onclick = () => p.remove();
  container.appendChild(p);
  setTimeout(() => p.remove(), 2000);
}

export function showPopupWithButton(msg, btnText, callback) {
  const container = document.getElementById('popup-container');
  const p = document.createElement('div');
  p.className = [
    'fixed','top-6','left-1/2','transform','-translate-x-1/2',
    'z-[9999]','bg-white','border-l-4','border-red-500',
    'text-gray-800','p-4','rounded','shadow-xl',
    'flex','flex-col','items-center','max-w-sm','w-full'
  ].join(' ');
  p.innerHTML = `
    <div class="mb-3">${msg}</div>
    <button class="bg-red-500 text-white px-4 py-2 rounded">${btnText}</button>
  `;
  p.querySelector('button').onclick = () => {
    p.remove();
    callback();
  };
  container.appendChild(p);
}
