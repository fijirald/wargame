import {mainMenuCtx} from './mainMenuSettings';
import {WIDTH, HEIGHT} from '../../map/mapSettings';
import {titleHeight} from './title';
import {
  rosterWidth,
  rosterHeight
} from './unitRoster';

export const chosenUnitsWidth = Math.round(WIDTH / 3);
export const chosenUnitsHeight = HEIGHT - 100;

export const displayChosenUnits = () => {
  mainMenuCtx.fillStyle = '#cdd1d6';
  mainMenuCtx.fillRect(rosterWidth, 0, chosenUnitsWidth, chosenUnitsHeight);
  mainMenuCtx.strokeRect(rosterWidth, 0, chosenUnitsWidth, chosenUnitsHeight);
  displayChosenUnitsTitle();
  displayEmptySpaces();
}

const displayChosenUnitsTitle = () => {
  mainMenuCtx.fillStyle =  '#000';
  mainMenuCtx.font = '24px serif';
  mainMenuCtx.textAlign = 'left';
  mainMenuCtx.fillText('Units', rosterWidth + 150, titleHeight + 20);
}

const displayEmptySpaces = () => {
  let i:number = 1;
  let imgWidth:number = 70;
  let imgHeight:number = 70;
  let x = rosterWidth + 20;
  let y = titleHeight + 60;
  while(i <= 20) {
    console.log('i:', i);
    console.log('x:', x, 'y:', y);
    mainMenuCtx.fillStyle = '#fff';
    mainMenuCtx.fillRect(x, y, imgWidth, imgHeight);
    mainMenuCtx.fillStyle = '#000';
    mainMenuCtx.strokeRect(x, y, imgWidth, imgHeight);
    x += imgWidth + 10;
    if(i % 5 === 0) {
      y += imgHeight + 15;
      x = rosterWidth + 20;
    }
    i++;
  }
}