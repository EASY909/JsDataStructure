class Node {
    constructor(e, next) {
        this.e = e;
        this.next = next;
    }

    toString() {
        return this.e.toString()
    }
}

class LinkList {
    constructor() {
        this.size = 0;
        this.dummyHead = new Node(null, null);
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }



    //中间插入
    add(index, e) {
        if (index < 0 || index > this.size) {
            throw new Error("索引越界")
        }


        let prev = this.dummyHead;
        for (let i = 0; i < index; i++)
            prev = prev.next;

        prev.next = new Node(e, prev.next);
        this.size++;

    }

    //链表头添加元素
    addFirst(e) {
        // this.head = new Node(e, this.head);
        // this.size++;
        this.add(0, e)
    }

    addLast(e) {
        this.add(this.size, e)
    }

    get(index) {
        if (index < 0 || index > this.size) {
            throw new Error("索引越界")
        }

        let cur = this.dummyHead.next;
        for (let i = 0; i < index; i++)
            cur = cur.next;

        return cur.e;

    }

    getFirst() {
        return this.get(0)
    }

    getLast() {
        return this.get(this.size - 1)
    }

    //修改链表index元素
    set(index, e) {
        if (index < 0 || index > this.size) {
            throw new Error("索引越界")
        }

        let cur = this.dummyHead.next;

        for (let i = 0; i < index; i++)
            cur = cur.next;

        cur.e = e;
    }

    cotains(e) {
        let cur = this.dummyHead.next;

        while (cur != null) {
            if (cur.e == e) {
                return true;
            }

            cur = cur.next;
        }

        return false
    }

    remove(index) {
        if (index < 0 || index > this.size) {
            throw new Error("索引越界")
        }
        let prev = this.dummyHead;
        for (let i = 0; i < index; i++)
            prev = prev.next;

        let retNode = prev.next;
        prev.next = retNode.next;
        retNode.next = null;
        this.size--;

        return retNode.e;
    }

    removeFirst() {
        this.remove(0)
    }
    removeLast() {
        this.remove(this.size - 1)
    }
    
    removeElement(e){
        let prev=this.dummyHead;
        while(prev.next!=null){
            if(prev.next.e==e){
                break;
            }
            prev=prev.next;
        }

        if(prev.next!=null){
            let delNode=prev.next;
            prev.next=delNode.next;
            delNode.next=null;
            this.size--;
        }
       
    }
    toString() {
        
        let res = "";

        let cur = this.dummyHead.next;
        while (cur != null) {
            res += cur + "->"
            cur = cur.next;
        }
        res += " null"
        console.log(res)
        return res
       
    }
}