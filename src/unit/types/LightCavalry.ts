import Unit from './Unit';

class LightCavalry extends Unit {
  // general
  description: string = 'Light and fast cavalry';
  cost: number = 90;
  advantageOver: string[] = [
    'Archers', 'Peltasts'
  ];
  vulnerableAgainst: string[] = [
    'Hoplites', 'Pikemen'
  ];
  // Characteristics
  name: string = 'LightCavalry';
  type: string = 'cavalry';
  imgSrc:string = './src/img/units/pikemen.jpg';
  health: number = 80;
  speed: number = 40;
  armour: number = 2;
  range: number = 0;
  mobility: number = 7;
  meleeDamage: number = 8;
  missileDamage: number = 0;
  charge: number = 6;
  discipline: number = 40;
  weight: number = 80;

  constructor(id:number, x:number, y:number, controlBy:string='player') {
    super(id, x, y, controlBy);
  }
}

export default LightCavalry;
