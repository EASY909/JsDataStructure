import myArray from "./array.js";
let MaxHeap = class MaxHeap {
    constructor(capacity) {
        //将任意数组转换成堆
        if (Object.prototype.toString.call(capacity) === "[object Array]") {
            this.data = new myArray(capacity);
            for (let i = this.parent(capacity.length - 1); i >= 0; i--) {
                this.siftDown(i)
            }
        } else {
            this.data = new myArray(capacity);
        }

    }
    size() {
        return this.data.getSize();
    }

    isEmpty() {
        return this.data.isEmpty();
    }

    parent(index) {
        if (index == 0) {
            throw new Error("index=0没有父节点")
        }
        return parseInt((index - 1) / 2)
    }

    leftChild(index) {
        return index * 2 + 1
    }

    rightChild(index) {
        return index * 2 + 2
    }

    add(e) {
        this.data.addLast(e);
        this.siftUp(this.data.getSize() - 1)
    }

    siftUp(k) {

        while (k > 0 && this.data.get(k) > this.data.get(this.parent(k))) {
            this.data.swap(k, this.parent(k));
            k = this.parent(k)
        }

    }

    findMax() {
        if (this.data.getSize() == 0) {
            throw new Error("堆为空")
        }
        return this.data.get(0);
    }

    //取出堆中最大的元素
    extractMax() {
        let e = this.findMax();
        this.data.swap(0, this.data.getSize() - 1)
        this.data.removeLast();

        this.siftDown(0)

        return e;
    }

    //数据下沉
    siftDown(k) {
        while (this.leftChild(k) < this.data.getSize()) {
            let j = this.leftChild(k); //左孩子
            if (j + 1 < this.data.getSize() && this.data.get(j + 1) > this.data.get(j)) { //右孩子值大于左孩子
                j++; //此时j为右孩子
            }

            if (this.data.get(k) >= this.data.get(j)) {
                break;
            }

            this.data.swap(k, j);
            k = j;
        }
    }

    //取出最大元素，替换成e
    replace(e) {
        let ret = this.findMax();
        this.data.set(0, e);
        this.siftDown(0);
        return ret;
    }


}
export default MaxHeap