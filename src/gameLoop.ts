import {
  computerUnits,
  playerUnits
} from './store/unit/units';
import {finishBattle} from './config';
import {drawMessage} from './UI/messages/drawMessage';

export const isBattleEnd = () => {
  let computerNumber = computerUnits.length;
  let playerNumber = playerUnits.length;
  if(computerNumber === 0 || playerNumber === 0) {
    finishBattle();
    checkWinner();
  }
}

export const checkWinner = () => {
  let computerNumber = computerUnits.length;
  let playerNumber = playerUnits.length;
  if(computerNumber === 0) {
    console.error('victory');
    drawMessage('Victory');
  }
  else if(playerNumber === 0) {
    finishBattle();
    console.error('defeat');
    drawMessage('Defeat');
  }
}
