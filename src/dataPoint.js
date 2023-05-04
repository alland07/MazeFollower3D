class DataPoint {
  constructor() {
    this.dataX = [];
    this.dataY = [];
    this.dataZ = [];
    this.dataFilter = {x: 0, y: 0, z: 0};
    this.maxValue = 10;
  }

  pushValue(x, y, z) {
    //X
    if (this.dataX.length <= this.maxValue) {
      this.addElementToArray(this.dataX, x, 'x');
    } else {
      this.dataX.pop();
      this.addElementToArray(this.dataX, x, 'x');
    }
    //Y
    if (this.dataY.length <= this.maxValue) {
      this.addElementToArray(this.dataY, y, 'y');
    } else {
      this.dataY.pop();
      this.addElementToArray(this.dataY, y, 'y');
    }
    //Z
    if (this.dataZ.length <= this.maxValue) {
      this.addElementToArray(this.dataZ, z, 'z');
    } else {
      this.dataZ.pop();
      this.addElementToArray(this.dataZ, z, 'z');
    }
  }

  addElementToArray(arr, value, axis){
    arr.unshift(value);
    this.filterData(arr, axis);
  }

  filterData(arr, value) {
    const dataLength = arr.length;
    let total = 0;
    if (dataLength > 0) {
      for (let i = 0; i < dataLength; i++) {
        total += arr[i];
      }
      const moyenne = total/dataLength;
      switch (value) {
        case 'x':
          this.dataFilter.x = moyenne;
          break;
        case 'y':
          this.dataFilter.y = moyenne;
          break;
        case 'z':
        this.dataFilter.z = moyenne;
        break;
      }
    }
  }

  getDataFilter(){
    return this.dataFilter;
  }
}

export default DataPoint;
