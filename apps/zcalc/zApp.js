class ZApp {
    constructor() {
        this.InstBlockStorage = []
    }



}

class AppStorage extends ZApp {
    constructor() {
        super()
    }

    addDataBlock(datablock = getInstanceData) {
        this.InstBlockStorage.push(datablock);
        console.log('Storage Size: ', this.InstBlockStorage.length)
    }


}