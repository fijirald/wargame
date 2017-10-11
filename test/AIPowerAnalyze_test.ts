import { expect, should, assert} from 'chai';
import {
  playerPower,
  analyzePlayerPower
} from '../src/AI/analyzeModule/powerAnalyze';


let units = [
  {
    name: 'allyUnit',
    health: 100,
    speed: 5,
    armour: 7,
    range: 34,
    meleeDamage: 10,
    missileDamage: 0,
    discipline: 71,
    morale: 78,
    condition: 100
  },
  {
    name: 'allyUnit',
    health: 70,
    speed: 15,
    armour: 3,
    range: 3,
    meleeDamage: 4,
    missileDamage: 2,
    discipline: 6,
    morale: 20,
    condition: 10
  },
  {
    name: 'allyUnit',
    health: 11,
    speed: 5,
    armour: 3,
    range: 3,
    meleeDamage: 2,
    missileDamage: 1,
    discipline: 2,
    morale: 34,
    condition: 80
  }
];

describe('AI: Power Analyze Test', function() {
  describe('analyzePlayerPower', function() {
    analyzePlayerPower(units);
    it('Total health should be equal to  181', function() {
      assert.equal(playerPower.totalHealth, 181);
    });
    it('Total speed should be equal to 181', function() {
      assert.equal(playerPower.totalSpeed, 25);
    });
    it('Total armour should be equal to 181', function() {
      assert.equal(playerPower.totalArmour, 13);
    });
    it('Total meleeDamage should be equal to 16', function() {
      assert.equal(playerPower.totalMeleeDamage, 16);
    });
    it('Total missileDamage should be equal to 3', function() {
      assert.equal(playerPower.totalMissileDamage, 3);
    });
    it('Total discipline should be equal to 79', function() {
      assert.equal(playerPower.totalDiscipline, 79);
    });
    it('Total morale should be equal to 132', function() {
      assert.equal(playerPower.totalMorale, 132);
    });
    it('Total condition should be equal to 190', function() {
      assert.equal(playerPower.totalCondition, 190);
    });
  });
});