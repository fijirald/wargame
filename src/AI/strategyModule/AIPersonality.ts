class AIPersonality {
  behaviour:string;
  setBehaviour() {
    let r = Math.random();
    if(r >= 0 && r < 0.1) {
      this.behaviour = 'domineering';
    }
    else if(r >= 0.1 && r < 0.2) {
      this.behaviour = 'aggressive';
    }
    else if(r >= 0.3 && r < 0.45) {
      this.behaviour = 'creative';
    }
    else if(r >= 0.45 && r < 0.8) {
      this.behaviour = 'neutral';
    }
    else if(r >= 0.7 && r < 0.8) {
      this.behaviour = 'cautious';
    }
    else {
      this.behaviour = 'passive';
    }
  }
}

export default AIPersonality;
