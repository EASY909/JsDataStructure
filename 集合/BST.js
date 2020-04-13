class Node {
    constructor(e) {
        this.e = e;
        this.left = null;
        this.right = null;
    }
}
class BST {
    constructor() {
        this.root = null;
        this.size = 0
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0
    }

    add(e) {
        if (this.root == null) {
            this.root = new Node(e);
            this.size++;
        } else {
            this._add(e, this.root)
        }
    }
    _add(e, node) {
        if (node == null) {
            this.size++;
            return new Node(e)
        }

        if (e < node.e) {
            node.left = this._add(e, node.left)
        } else if (e > node.e) {
            node.right = this._add(e, node.right)
        }
        return node;
        // if(e==node.e){
        //     return
        // }else if(e<node.e&&node.left==null){
        //     node.left=new Node(e);
        //     this.size++;
        //     return
        // }else if(e>node.e&&node.right==null){
        //     node.right=new Node(e);
        //     this.size++;
        //     return
        // }

        // if(e<node.e){
        //     padd(e,node.left)
        // }else{
        //     padd(e,node.right)
        // }
    }

    contains(e) {
        _contains(this.root, e)
    }
    _contains(node, e) {
        if (node == null) {
            return false
        }

        if (node.e == e) {
            return true;
        } else if (node.e > e) {
            _contains(node.left, e)
        } else {
            _contains(node.right, e)
        }
    }
    preOrder() { //前序遍历
        this._preOrder(this.root)
    }
    _preOrder(node) {
        if (node == null) {
            return null
        }

        console.log(node.e);
        this._preOrder(node.left)
        this._preOrder(node.right)
    }

    inOrder() { //中序遍历
        this._inOrder(this.root)
    }
    _inOrder(node) {
        if (node == null) {
            return null
        }
        this._inOrder(node.left)
        console.log(node.e);
        this._inOrder(node.right)
    }

    postOrder() { //后序遍历
        this._postOrder(this.root)
    }

    _postOrder(node) {
        if (node == null) {
            return null
        }
        this._postOrder(node.left)

        this._postOrder(node.right)

        console.log(node.e);
    }
    levelOrder() {
        let queue = []; //每次出队时，判断其左右孩子是不是为空

        queue.push(this.root)
        while (queue.length != 0) {
            let delet = queue.shift();
            console.log(delet.e);

            if (delet.left != null) {
                queue.push(delet.left)
            }
            if (delet.right != null) {
                queue.push(delet.right)
            }
        }
    }

    minmum() {
        if (this.size == 0) {
            throw new Error("二叉树节点为0")
        }

        return this._minmum(this.root).e
    }
    _minmum(node) {
        let cur = node;

        while (cur.left != null) {
            cur = cur.left;
        }

        return cur;
    }

    maxmum() {
        if (this.size == 0) {
            throw new Error("二叉树节点为0")
        }

        return this._maxmum(this.root).e
    }
    _maxmum(node) {
        let cur = node;

        while (cur.right != null) {
            cur = cur.right;
        }

        return cur;
    }

    removeMin() {
        let min = this.minmum();


        this.root = this._removeMin(this.root);


        return min;
    }

    _removeMin(node) {
        if (node.left == null) {
            let rightNode = node.right;
            node.right = null;
            this.size--;
            return rightNode;
        }
        node.left = this._removeMin(node.left);

        return node;

    }

    removeMax() {
        let max = this.maxmum();

        this.root = this._removeMax(this.root);
        return max;
    }

    _removeMax(node) {
        if (node.right == null) {
            let leftNode = node.left;
            node.left = null;
            this.size--;
            return leftNode;
        }
        node.right = this._removeMax(node.right);

        return node;

    }

    remove(e) {
        this.root = (this.root, e)
    }
    _remove(node, e) {

        if (node == null) {
            return null;
        }

        if (e < node.e) {
            node.left = _remove(node.left, e);

            return node;
        } else if (e > node.e) {
            node.right = _remove(node.right, e);

            return node;
        } else { //e==node.e
            //待删除节点左子树为空
            if (node.left == null) {
                let rightNode = node.right;
                node.right = null;
                this.size--;
                return rightNode;
            }
            //待删除节点右子树为空
            if (node.right == null) {
                let leftNode = node.left;
                node.left = null;
                this.size--;
                return leftNode;
            }

            //待删除节点左右子树都不空，找到待删除节点的右子树中的最小节点，用这个节点顶替待删除节点
            //或者找到待删除节点的左子树中的最大节点，用这个节点顶替待删除节点
            let successor = this.minmum(node.right);

            successor.right = this._removeMin(node.right);
            successor.left = node.left;

            node.left = null;
            node.right = null;

            return successor;
        }
    }

}