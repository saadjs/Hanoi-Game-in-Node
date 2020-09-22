class HanoiGame {
  constructor(towers) {
    if (towers === undefined) {
      this.towers = [[3, 2, 1], [], []];
    } else {
      this.towers = towers;
    }
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    if (startTowerIdx === endTowerIdx) {
      return false;
    }
    let fromTower = this.towers[startTowerIdx];
    let toTower = this.towers[endTowerIdx];

    // console.log(fromTower, toTower);
    if (fromTower === undefined || toTower === undefined) {
      return false;
    }

    if (fromTower.length === 0) {
      return false;
    }
    if (toTower.length === 0) {
      return true;
    }

    if (fromTower[fromTower.length - 1] < toTower[toTower.length - 1]) {
      return true;
    } else {
      return false;
    }
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      let fromTower = this.towers[startTowerIdx];
      let toTower = this.towers[endTowerIdx];
      let moveDisk = fromTower.pop();
      if (moveDisk !== undefined) {
        let arrayLength = toTower.push(moveDisk);
        if (arrayLength > 0) {
          return true;
        }
      }
    }

    return false;
  }

  isWon() {
    if (
      (this.towers[0].length === 0 &&
        this.towers[this.towers.length - 1].length === 0) ||
      (this.towers[0].length === 0 &&
        this.towers[this.towers.length - 2].length === 0)
    ) {
      return true;
    }
    return false;
  }

  // the below methods are complete and do not need to be modified
  print() {
    // will print our board nicely to our user
    console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", (start) => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", (end) => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  run(reader, callback) {
    // we will prompt our user to provide a start and stop index using
    // a readline interface
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      // if the move is invalid we tell the user
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, callback);
      } else {
        this.print();
        console.log("You win!");
        callback();
      }
    });
  }
}

// game = new HanoiGame([[3], [1], [2]]);
// console.log("towers", game.towers);
// console.log(game.isValidMove(0, 1));

module.exports = HanoiGame;
