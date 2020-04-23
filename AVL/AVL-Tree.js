class Node {
    constructor(key = null, value = null, left = null, right = null) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}
export default class AVLTree {
    constructor() {
        this.root = null;
        this.size = 0
    }

    getSize() {
        return this.size;
    }

    _getHeight(node) {
        if (node == null) {
            return 0;
        }
        return node.height;
    }

    _getBalanceFactor(node) {
        if (node == null) return 0;

        return this._getHeight(node.left) - this._getHeight(node.right);
    }
    isEmpty() {
        return this.size === 0
    }

    add(key, value) {
        if (this.root == null) {
            this.root = new Node(key, value);
            this.size++;
        } else {

            this._add(key, value, this.root)
        }

    }
    _add(key, value, node) {

        if (node == null) {
            this.size++;

            return new Node(key, value)
        }


        if (key < node.key) {
            node.left = this._add(key, value, node.left)
        } else if (key > node.key) {
            node.right = this._add(key, value, node.right)
        } else {
            node.value = value;
        }

        //更新height
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))

        //平衡因子
        let balancefactor = this._getBalanceFactor(node);
        if (Math.abs(balancefactor) > 1) {
            console.log("平衡因子：" + balancefactor);
        }


        //维护平衡
        //LL
        if (balancefactor > 1 && this._getBalanceFactor(node.left) >= 0) {
            return this.rightRotate(node);
        }
        //RR
        if (balancefactor < -1 && this._getBalanceFactor(node.right) <= 0) {
            return this.leftRotate(node);
        }
        //LR
        if (balancefactor > 1 && this._getBalanceFactor(node.left) < 0) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        //RL
        if (balancefactor < -1 && this._getBalanceFactor(node.right) > 0) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;


    }

    isBST() {
        let keys = [];
        this._inOrder(this.root, keys);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] > keys[i + 1]) {
                return false
            }
        }
        return true
    }
    _inOrder(node, keys) {
        if (node == null) {
            return null
        }

        this._inOrder(node.left, keys)
        keys.push(node.key)
        this._inOrder(node.right, keys);
    }

    isBalanced() {
        return this._isBalanced(this.root);
    }
    _isBalanced(node) {
        if (node == null) {
            return true;
        }

        let balancefactor = this._getBalanceFactor(node);
        if (Math.abs(balancefactor) > 1) {
            return false;
        }

        return this._isBalanced(node.left) && this._isBalanced(node.right)
    }
    /**     右旋转
            // 对节点y进行向右旋转操作，返回旋转后新的根节点x
            //        y                              x
            //       / \                           /   \
            //      x   T4     向右旋转 (y)        z     y
            //     / \       - - - - - - - ->    / \   / \
            //    z   T3                       T1  T2 T3 T4
            //   / \
            // T1   T2
    **/
    rightRotate(y) {
        let x = y.left;
        let T3 = x.right;
        x.right = y;
        y.left = T3;

        //更新高度
        y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
        x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
        return x;
    }

    // 对节点y进行向左旋转操作，返回旋转后新的根节点x
    //    y                             x
    //  /  \                          /   \
    // T1   x      向左旋转 (y)       y     z
    //     / \   - - - - - - - ->   / \   / \
    //   T2  z                     T1 T2 T3 T4
    //      / \
    //     T3 T4

    leftRotate(y) {
        let x = y.right;
        let T2 = x.left;
        x.left = y;
        y.right = T2;

        //更新高度
        y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
        x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
        return x;
    }
    _getNode(node, key) {
        if (node == null) {
            return null;
        }

        if (node.key == key) {
            return node
        } else if (key < node.key) {
            return this._getNode(node.left, key)
        } else {
            return this._getNode(node.right, key)
        }
    }
    remove(key) {
        let node = this._getNode(this.root, key);
        if (node != null) {
            this.root = this._remove(this.root, key)
            return node.value;
        }
        return null;
    }
    _remove(node, key) {

        if (node == null) {
            return null;
        }

        let retNode;
        if (key < node.key) {
            node.left = _remove(node.left, key);
            retNode = node

        } else if (key > node.key) {
            node.right = _remove(node.right, key);
            retNode = node

        } else { //key==node.key
            //待删除节点左子树为空
            if (node.left == null) {
                let rightNode = node.right;
                node.right = null;
                this.size--;
                retNode = rightNode;
            }
            //待删除节点右子树为空
            else if (node.right == null) {
                let leftNode = node.left;
                node.left = null;
                this.size--;
                retNode = leftNode;
            } else {

                //待删除节点左右子树都不空，找到待删除节点的右子树中的最小节点，用这个节点顶替待删除节点
                //或者找到待删除节点的左子树中的最大节点，用这个节点顶替待删除节点
                let successor = this.minmum(node.right);

                successor.right = this.remove(node.right, successor.key);
                successor.left = node.left;

                node.left = null;
                node.right = null;

                retNode = successor;
            }
        }
         
        if(retNode ==null){
            return null;
        }
        retNode.height = 1 + Math.max(this._getHeight(retNode.left), this._getHeight(retNode.right))

        //平衡因子
        let balancefactor = this._getBalanceFactor(retNode);
        if (Math.abs(balancefactor) > 1) {
            console.log("平衡因子：" + balancefactor);
        }


        //维护平衡
        //LL
        if (balancefactor > 1 && this._getBalanceFactor(retNode.left) >= 0) {
            return this.rightRotate(retNode);
        }
        //RR
        if (balancefactor < -1 && this._getBalanceFactor(retNode.right) <= 0) {
            return this.leftRotate(retNode);
        }
        //LR
        if (balancefactor > 1 && this._getBalanceFactor(retNode.left) < 0) {
            retNode.left = this.leftRotate(retNode.left);
            return this.rightRotate(retNode);
        }
        //RL
        if (balancefactor < -1 && this._getBalanceFactor(retNode.right) > 0) {
            retNode.right = this.rightRotate(retNode.right);
            return this.leftRotate(retNode);
        }
        return retNode;
    }




}
