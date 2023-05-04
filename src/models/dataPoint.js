class DataPoint {
  constructor() {
    this.dataX = [];
    this.dataY = [];
    this.dataZ = [];
    this.dataFilter = {x: 0, y: 0, z: 0};
    this.maxValue = 10;
    this.time = Date.now();
    this.oldData = 0;
    this.deltaTimeSensor = 10;
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

  derivate() {
    const {x, y ,z} = this.dataFilter;
    const norm = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    const derivate = (10 * Math.abs(norm - this.oldData) / this.deltaTimeSensor);
    this.oldData = norm;
  }
}

export default DataPoint;
