import {assert} from 'chai';
import {createUnit} from '../../../../src/unit/create';
import {
  removeUnit,
  removeAllUnits
} from '../../../../src/store/unit/units';
import {
  computerUnits,
  playerUnits
} from '../../../../src/store/unit/units';
import Unit from '../../../../src/unit/types/Unit';
import {isUnitInArray} from '../../../../src/utils/unit/utils';
import {
  getBestUnitsByProperty,
  getClosestNodeToUnit,
  findClosestUnitsToTheNodeCenter,
  getUnitById
} from '../../../../src/utils/unit/actions';

describe('unitActionsUtils test', () => {

  describe('getClosestNodeToUnit test', () => {
    let unit:Unit;

    before(() => {
      removeAllUnits();
      unit = createUnit('scouts', 560, 120, 5, 'computer');
    });

    let node:any = {x: 400, y: 160};

    // remove units after test completed
    after(() => {
      removeUnit(unit);
    });
    let nodes = [
      {x: 280, y: 200},
      {x: 640, y: 80},
      {x: 200, y: 40},
      {x: 280, y: 280},
      {x: 960, y: 280},
      {x: 800, y: 360},
      {x: 560, y: 280},
    ];

    it('closestNode to unit should be {x: 640, y: 80}', () => {
      let closestNode:any = getClosestNodeToUnit(unit, nodes);
      assert.equal(closestNode.x, 640);
      assert.equal(closestNode.y, 80);
    });
  });

  describe('getBestUnitsByProperty test', () => {
    let unit1:Unit, unit2:Unit, unit3:Unit;
    let enemy1:Unit, enemy2:Unit, enemy3:Unit;

    before(() => {
      removeAllUnits();
      unit1 = createUnit('HeavyCavalry', 560, 120, 5, 'player');
      unit2 = createUnit('LightCavalry', 560, 120, 5, 'player');
      unit3 = createUnit('Pikemen', 560, 120, 5, 'player');
      enemy1 = createUnit('HeavyInfantry', 560, 120, 5, 'computer');
      enemy2 = createUnit('HeavyCavalry', 560, 120, 5, 'computer');
      enemy3 = createUnit('Militia', 560, 120, 5, 'computer');
    });

    // remove units after test completed
    after(() => {
      removeUnit(unit1);
      removeUnit(unit2);
      removeUnit(unit3);
      removeUnit(enemy1);
      removeUnit(enemy2);
      removeUnit(enemy3);
    });

    it('best player units by speed should be unit2', () => {
      let fastestUnits:Unit[] = getBestUnitsByProperty(playerUnits, 'speed');
      let pass:boolean = true;
      for(let unit of fastestUnits) {
        if(unit.id === unit2.id) {
          // pass
        } else {
          pass = false;
          break;
        }
      }

      assert.equal(pass, true);
    });

    it('best computer units by meleeDamage should be enemy1 and enemy2', () => {
      let units:Unit[] = getBestUnitsByProperty(computerUnits, 'meleeDamage');
      let pass:boolean = true;
      for(let unit of units) {
        if(unit.id === enemy1.id) {
          // pass
        }
        else if(unit.id === enemy2.id) {
          // pass
        } else {
          pass = false;
          break;
        }
      }

      assert.equal(pass, true);
    });
  });


  describe('getUnitById test', () => {
    let unit1:Unit;
    let enemy1:Unit;

    before(() => {
      removeAllUnits();
      unit1 = createUnit('HeavyCavalry', 560, 120, 5, 'player');
      enemy1 = createUnit('HeavyInfantry', 560, 120, 5, 'computer');
    });

    // remove units after test completed
    after(() => {
      removeUnit(unit1);
      removeUnit(enemy1);
    });

    it('fetchedUnit should be unit1', () => {
      let fetchedUnit:Unit = getUnitById(unit1.id);
      assert.equal(fetchedUnit.id, unit1.id);
    });

    it('fetchedEnemy should be enemy1', () => {
      let fetchedEnemy:Unit = getUnitById(enemy1.id);
      assert.equal(fetchedEnemy.id, enemy1.id);
    });
  });

  describe('findClosestUnitsToTheNodeCenter test', () => {
    let unit1:Unit, unit2:Unit, unit3:Unit, unit4:Unit, unit5:Unit;
    const node = {x:440, y:280};
    let units:Unit[] = [];
    let updatedUnits:Unit[] = [];
    before(() => {
      removeAllUnits();
      unit1 = createUnit('HeavyCavalry', 440, 240, 5, 'player');
      unit2 = createUnit('Scouts', 400, 320, 5, 'computer');
      unit3 = createUnit('Pikemen', 480, 320, 5, 'computer');
      unit4 = createUnit('Militia', 440, 320, 5, 'computer');
      unit5 = createUnit('LightCavalry', 440, 280, 5, 'computer');
      unit1.setX(450);
      unit1.setY(250);
      unit3.setX(470);
      unit3.setY(305);
      unit4.setY(315);
      unit5.setX(470);
      unit5.setY(305);
      units.push(unit1);
      units.push(unit2);
      units.push(unit3);
      units.push(unit4);
      updatedUnits.push(unit1);
      updatedUnits.push(unit2);
      updatedUnits.push(unit3);
      updatedUnits.push(unit4);
      updatedUnits.push(unit5);
    });

    // remove units after test completed
    after(() => {
      removeUnit(unit1);
      removeUnit(unit2);
      removeUnit(unit3);
      removeUnit(unit4);
    });

    it('closestUnits to the nodeCenter should only consist of unit3', () => {
      let closestUnits:Unit[] = findClosestUnitsToTheNodeCenter(node, units);
      assert.equal(closestUnits.length, 1);
      assert.equal(isUnitInArray(unit3, closestUnits), true);
      assert.equal(isUnitInArray(unit1, closestUnits), false);
      assert.equal(isUnitInArray(unit2, closestUnits), false);
      assert.equal(isUnitInArray(unit4, closestUnits), false);
    });

    it('closestUnits to the nodeCenter should be unit3 and unit5', () => {
      let closestUnits:Unit[] = findClosestUnitsToTheNodeCenter(node, updatedUnits);
      assert.equal(closestUnits.length, 2);
      assert.equal(isUnitInArray(unit3, closestUnits), true);
      assert.equal(isUnitInArray(unit1, closestUnits), false);
      assert.equal(isUnitInArray(unit2, closestUnits), false);
      assert.equal(isUnitInArray(unit4, closestUnits), false);
      assert.equal(isUnitInArray(unit5, closestUnits), true);
    });
  });

});