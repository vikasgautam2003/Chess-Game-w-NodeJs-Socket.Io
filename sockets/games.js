// const Game = require('../models/game');
// const Player = require('../models/player');

// module.exports = function (io) {
//   io.on('connection', (socket) => {


//     socket.on('gameOver', async ({ fen, whiteUsername, blackUsername, result, moves }) => {
//       try {
//         const white = await Player.findOne({ username: whiteUsername }) || await new Player({ username: whiteUsername }).save();
//         const black = await Player.findOne({ username: blackUsername }) || await new Player({ username: blackUsername }).save();

//         const game = new Game({
//           fen,
//           whitePlayer: white._id,
//           blackPlayer: black._id,
//           result,
//           moves,
//         });
//         await game.save();

       
//         white.gamesPlayed += 1;
//         black.gamesPlayed += 1;
//         if (result === '1-0') {
//           white.wins += 1;
//           black.losses += 1;
//         } else if (result === '0-1') {
//           black.wins += 1;
//           white.losses += 1;
//         }
//         await white.save();
//         await black.save();

//         console.log('Game saved to DB');
//       } catch (err) {
//         console.error('Error saving game:', err);
//       }
//     });
//   });
// };
