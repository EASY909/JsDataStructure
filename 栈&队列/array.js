class myArray {
    /**
     * @param {数组长度，默认10} capacity 
     * @param {元素个数} size 
     */
    constructor(capacity = 10) {
        this.data = new Array(capacity);
        this.size = 0;
    }

    getSize() {

        return this.size;
    }

    getCapacity() {
        return this.data.length
    }

    isEmpty() {
        return this.size === 0
    }
    /**
     * 
     * 向最后添加元素
     */
    addLast(e) {
        // if (size === this.data.length) {
        //     throw new Error("addlast失败，数组满了")
        // }
        // this.data[size] = e;
        // size++;
        /**
         * 直接调用add()方法
         */

        this.add(this.size, e)
    }


    addfirst(e) {
        /**
         * 直接调用add()方法
         */
        this.add(0, e)
    }

    add(index, e) {
        if (index < 0 || index > this.size) {
            throw new Error("下标>=0")
        }

        if (this.size === this.data.length) {
            this._resize(2 * this.data.length)
        }


        for (let i = this.size - 1; i >= index; i--) {
            this.data[i + 1] = this.data[i];

        }
        this.data[index] = e;
        this.size++;
    }

    _resize(newCapacity) {
        let newData = new Array(newCapacity);
        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[i]
        }

        this.data = newData


    }
    /**
     * 获取index位置元素
     **/
    get(index) {
        if (index < 0 || index >= this.size) {
            throw new Error("get失败，下标不对")
        }
        return this.data[index]
    }

    getLast() {
        return this.get(this.size - 1)
    }

    getFirst() {
        return this.get(0)
    }
    set(index, e) {
        if (index < 0 || index >= this.size) {
            throw new Error("set失败，下标不对")
        }
        this.data[index] = e;
    }

    contains(e) {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] === e) {
                return true;
            }
        }

        return false
    }

    find(e) {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] === e) {
                return i;
            }
        }

        return -1
    }

    remove(index) {
        if (index < 0 || index >= this.size) {
            throw new Error("remove失败，下标不对")
        }

        let temp = this.data[index];
        for (let i = index + 1; i < this.size; i++) {
            this.data[i - 1] = this.data[i]
        }
        this.size--;

        if (this.size === parseInt(this.data.length / 4) && this.data.length / 2 != 0) { //laze

            this._resize(this.data.length / 2)
        }
        return temp;
    }


    removeFirst() {
        this.remove(0)
    }

    removeLast() {
        this.remove(this.size - 1)
    }


    removeElement(e) {
        let index = this.find(e)
        if (index != -1) {
            this.remove(e)
        }
    }
    toString() {
        let res = "数组有" + this.size + "个元素，容量为" + this.data.length;
        res += "\n"
        for (let i = 0; i < this.size; i++) {
            res += this.data[i];
            if (i != this.size - 1) {
                res += ", "
            }
        }
        console.log(res)
    }

}