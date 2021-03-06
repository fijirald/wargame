import {mainMenuCtx} from '../../config/context';
import {WIDTH, HEIGHT} from '../../config';
import {displayRoster} from '../../UI/mainMenu/layouts/rosterLayout';
import {displayChosenUnits} from '../../UI/mainMenu/layouts/armyLayout';
import {displayInfo} from '../../UI/mainMenu/layouts/infoLayout';
import {displayTitle} from '../../UI/mainMenu/layouts/upperLayout';
import {dragAndDrop} from '../../UI/mainMenu/main';
import {drawBottomLayout} from '../../UI/mainMenu/layouts/bottomLayout';

export const launchMainMenu = () => {
  mainMenuCtx.fillRect(0, 0, WIDTH, HEIGHT);
  displayRoster();
  displayChosenUnits();
  displayInfo();
  displayTitle();
  dragAndDrop();
  drawBottomLayout();
}
