import {
  mainMenuCtx
} from '../../../../../config/context';
import {
  propertyStartX,
  propertyStartY,
  valueStartX,
  valueStartY
} from '../infoSettings/infoSettings';
import {
  changeY,
  setDefault
} from '../infoSettings/infoSettings';
import {
  armyLayoutWidth,
  unitRosterWidth,
  titleHeight
} from '../../../../../config/mainMenu';
import {hoveredUnit} from '../../../../../config/mainMenu/unit/hoveredUnit';
import {displayTitle} from '../title';

const propertyList = [
  'name', 'cost', 'type', 'health', 'speed', 'armour', 'range',
  'mobility', 'meleeDamage', 'missileDamage', 'charge', 'visibility'
]

export const unitInfo = () => {
  displayTitle();
  displayUnitInfo(hoveredUnit);
}

export const displayUnitInfo = (unit:any) => {
  setDefault();
  mainMenuCtx.fillStyle = '#000';
  mainMenuCtx.font = '24px serif';
  mainMenuCtx.textAlign = 'left';
  if(hoveredUnit) {
    for(let property of propertyList) {
      mainMenuCtx.fillText(property, propertyStartX, propertyStartY);
      mainMenuCtx.fillText(unit[property], valueStartX, valueStartY);
      changeY();
    }
  } else {
      mainMenuCtx.fillText('No unit selected', propertyStartX, propertyStartY);
  }
}
