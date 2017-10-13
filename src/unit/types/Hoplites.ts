import Unit from '../Unit';

class Hoplites extends Unit {
  // general
  description: string = 'Infantry armed with spears and shields';
  cost: number = 80;
  advantageOver: string[];

  // Characteristics
  type: string = 'spearmen';
  health: number = 90;
  speed: number = 10;
  armour: number = 7;
  range: number = 0;
  mobility: number = 1;
  meleeDamage: number = 16;
  missileDamage: number = 0;
  charge: number = 1;
  discipline: number = 90;

  constructor(name:string, x:number, y:number, radius:number, controlBy:string='player') {
    super(name, x, y, radius, controlBy);
  }
}

export default Hoplites;
