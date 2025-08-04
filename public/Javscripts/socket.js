// public/Javscripts/socket.js
export let socket;
export let playerRole;

export function initSocket({
  onWaiting,
  onRoleSet,
  onGameStart,
  onNamesUpdate,
  onBoardState,
  onMove,
  onInvalid,
  onGameOver,
  onChat,
  onOpponentLeft
} = {}) {
  console.log('[socket.js] initSocket called');

  const username = document.getElementById('player-username').value || 'Guest';
  socket = io();

  socket.on('waitingForOpponent', () => onWaiting && onWaiting());
  socket.on('playerRole', role => {
    playerRole = role;
    onRoleSet && onRoleSet(role);
    socket.emit('setName', { name: username, role });
  });
  socket.on('opponentFound', () => onGameStart && onGameStart());
  socket.on('updateNames', names => onNamesUpdate && onNamesUpdate(names));
  socket.on('boardState', fen => onBoardState && onBoardState(fen));
  socket.on('move', move => onMove && onMove(move));
  socket.on('invalidMove', msg => onInvalid && onInvalid(msg));
  socket.on('gameOver', data => onGameOver && onGameOver(data));
  socket.on('chatMessage', data => onChat && onChat(data));
  socket.on('opponentLeft', data => onOpponentLeft && onOpponentLeft(data));

  return socket;
}
