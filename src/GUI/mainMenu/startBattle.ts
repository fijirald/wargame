import {
  mainMenuCtx,
  startBattleStartY,
  startBattleWidth,
  startBattleHeight,
  startBattleAvailable,
  totalGold,
  playerSpendedGold,
  computerSpendedGold,
  disableStartBattleButton,
  enableStartBattleButton
} from './mainMenuSettings';
import {
  playerArmy,
  computerArmy
} from './units';

let startBattleButtonX:number = Math.round(startBattleWidth / 3) + 120;
let startBattleButtonY:number = startBattleStartY + 15;
let startBattleButtonWidth:number = 200;
let startBattleButtonHeight:number = 40;
let startBattleTextX:number = startBattleButtonX + 30;
let startBattleTextY:number = startBattleButtonY + 30;

export const startBattle = () => {
  fillLayout();
  showStartBattleButton();
  showText();
}

const fillLayout = () => {
  mainMenuCtx.clearRect(0, startBattleStartY, startBattleWidth, startBattleHeight);
  mainMenuCtx.fillStyle = '#2c2f33';
  mainMenuCtx.fillRect(0, startBattleStartY, startBattleWidth, startBattleHeight);
}

export const showStartBattleButton = () => {
  let color:string;
  if(isStartBattleAvailable) {
    color = '#fff';
  } else {
    color = '#ccc';
  }
  mainMenuCtx.fillStyle = color;
  mainMenuCtx.fillRect(startBattleButtonX, startBattleButtonY, startBattleButtonWidth, startBattleButtonHeight);
}

export const showText = () => {
  mainMenuCtx.fillStyle = '#000';
  mainMenuCtx.font = '32px serif';
  mainMenuCtx.textAlign = 'left';
  mainMenuCtx.fillText('Start Battle', startBattleTextX, startBattleTextY);
}

export const isStartBattleButtonSelected = (mouseX:number, mouseY:number):boolean => {
  let x0 = startBattleButtonX;
  let x1 = x0 + startBattleWidth;
  let y0 = startBattleButtonY;
  let y1 = y0 + startBattleButtonHeight;
  if(mouseX >= x0 && mouseX < x1 && mouseY >= y0 && mouseY < y1) {
    return true;
  }
  return false;
}

/*
  Checks total player and computer units and spended gold
  and decide if battle can start or not
*/
export const isStartBattleAvailable = () => {
  let computerUnitsNumber:number = computerArmy.length;
  let playerUnitsNumber:number = playerArmy.length;
  let computerRemainGold:number = totalGold - computerSpendedGold;
  let playerRemainGold:number = totalGold - playerSpendedGold;
  if(computerUnitsNumber < 1 || playerUnitsNumber < 1) {
    // computer or(and) player don't have units
    disableStartBattleButton();
  }
  else if(computerRemainGold < 0 || playerRemainGold < 0) {
    // computer or(and player) exceed total available gold
    disableStartBattleButton();
  }
  else {
    enableStartBattleButton();
  }
}
