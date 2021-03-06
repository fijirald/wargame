/*
  Functions that works with unit's visibility
*/
import {ctx} from '../../config/context';
import {gridSize} from '../../config';
import {drawUnit} from '../draw';
import {
  addUnitIntoVisibleUnits,
  removeUnitFromVisibleUnits,
  addUnitToSpottedUnits,
} from '../../store';
import {spottedUnits} from '../../store/unit/spottedUnits';
import {
  addToRevealedUnits
} from '../../store/AI/enemies/revealedEnemies';
import {
  visibleForPlayerUnits,
  visibleForComputerUnits
} from '../../store/unit/visibleUnits';
import {
  playerUnits,
  computerUnits,
} from '../../store/unit/units';
import Unit from '../types/Unit';
import {
  isObjectInArray,
  deleteObjectFromArray,
  getNodeFromMap
} from '../../utils';
import {
  hidingEnemies,
  addToHidingEnemies,
  removeFromHidingEnemies
} from '../../store/AI/enemies/hidingEnemies';


/*
  spotEnemy: checks if enemies is in its visibility range
  if true, change property isVisible to true
*/
export const spotEnemy = (unit:Unit) => {
  let enemies:Unit[];
  if(unit.controlBy === 'player') { // if unit is control by player enemies will be computer's units
    enemies = Object.assign([], computerUnits);
  }
  if(unit.controlBy === 'computer') { //if unit is control by computer enemies will be player's units
    enemies = Object.assign([], playerUnits);
  }
  let visibility = unit.visibility;
  let visibilityRange = visibility * gridSize;
  let unitX:number = unit.currentNode.x;
  let unitY:number = unit.currentNode.y;
  let unitNode = getNodeFromMap(unitX, unitY);
  for(let enemy of enemies) {
    let enemyX:number = enemy.currentNode.x;
    let enemyY:number = enemy.currentNode.y;
    let enemyNode = getNodeFromMap(enemyX, enemyY);
    let dx = Math.abs(unitNode.x - enemyNode.x);
    let dy = Math.abs(unitNode.y - enemyNode.y);
    if(visibilityRange >= dx && visibilityRange >= dy) { // enemy has been spotted
      //console.error(enemy.name, 'has been spotted');
      if(unit.controlBy === 'computer' && enemy.isVisible === false) {
        removeFromHidingEnemies(enemy);
      }
      enemy.isVisible = true;
      drawUnit(enemy); // show enemy on the map
      addUnitIntoVisibleUnits(enemy);
      if(unit.controlBy === 'computer') { // for computer add enemy into spottedUnits
        addUnitToSpottedUnits(enemy);
        addToRevealedUnits(enemy);
      }
    }
  }
  // console.error('visibleForPlayerUnits', visibleForPlayerUnits);
  // console.error('visibleForComputerUnits', visibleForComputerUnits);
  // console.error('spottedUnits', spottedUnits);
}

/*
  Checks if unit has been spotted by enemies
  Switch isVisible to false if not spotted by all enemies
*/
export const isUnitSpottedByEnemy = (unit:Unit) => {
  let enemies:any[];
  if(unit.controlBy === 'player') { // if unit is control by player enemies will be computer's units
    enemies = Object.assign([], computerUnits);
  }
  if(unit.controlBy === 'computer') { //if unit is control by computer enemies will be player's units
    enemies = Object.assign([], playerUnits);
  }
  if(enemies.length === 0) {
    // no enemy to spot the unit
    return;
  }
  let unitX:number = unit.currentNode.x;
  let unitY:number = unit.currentNode.y;
  let unitNode = getNodeFromMap(unitX, unitY);
  let isSpotted = false;
  for(let enemy of enemies) {
    let visibility = enemy.visibility;
    let visibilityRange = visibility * gridSize;
    let enemyX:number = enemy.currentNode.x;
    let enemyY:number = enemy.currentNode.y;
    let enemyNode = getNodeFromMap(enemyX, enemyY);
    let dx = Math.abs(unitNode.x - enemyNode.x);
    let dy = Math.abs(unitNode.y - enemyNode.y);
    if(visibilityRange >= dx && visibilityRange >= dy) { // enemy has been spotted
      //console.error(unit.name, 'has been spotted by enemy', enemy.name);
      addUnitIntoVisibleUnits(unit);
      isSpotted = true;
      if(unit.isVisible === false && unit.controlBy === 'player') {
        removeFromHidingEnemies(unit);
      }
      unit.isVisible = true;
      if(unit.controlBy === 'computer') { // for computer add enemy into spottedUnits
        addUnitToSpottedUnits(enemy);
      }
      if(unit.controlBy === 'computer') {
        drawUnit(unit); // show computer unit on the map
      }
    }
  }
  if(!isSpotted) { // unit is not in range of any enemies
    removeUnitFromVisibleUnits(unit);
    if(unit.controlBy === 'player' && unit.isVisible === true) { // unit has been in the spottedUnits
      addToHidingEnemies(unit);
    }
    unit.isVisible = false;
    if(unit.controlBy === 'computer' && !unit.isMoving) { // if unit is computer's and not moving
      ctx.clearRect(unit.x, unit.y, gridSize, gridSize); // hide computer unit on the map
    }
  }
}

export const spotUnits = (units:Unit[]) => {
  if(units.length > 0) {
    for(let unit of units) {
      isUnitSpottedByEnemy(unit);
    }
  }
  // console.error('visibleForPlayerUnits', visibleForPlayerUnits);
  // console.error('visibleForComputerUnits', visibleForComputerUnits);
}
