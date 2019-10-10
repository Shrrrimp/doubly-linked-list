const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
    }

    append(data) {
        if(this.isEmpty()){
            this._head = new Node;
            this._head.data = data;
            this._head.prev = null;
            this._head.next = null;
            this._tail = this._head;
        }
        else{
            let node = new Node;
            this._tail.next = node;
            node.prev = this._tail;
            node.next = null;
            this._tail = node;
            this._tail.data = data;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        if(index < 0 || index >= this.length)
            return null;
        
        let current = this._head;
        for(let i = 0; i< index; ++i) {
            current = current.next;
        }
        return current.data;
    }

    insertAt(index, data) {
        if(index < 0 || index >= this.length)
            return null;

        let current = this._head;
        //ищем узел прдшествующий узлу с этим индексом
        for(let i = 0; i< index-1; ++i) {
            current = current.next;
        }
        let  node = new Node;
        node.data =data;
        node.prev = current;
        node.next = current.next;
        current.next.prev = node;
        node.prev.next = node;
        this.length++;
        return this;
    }

    isEmpty() {
        if(this.length==0)
            return true;
        return false;
    }

    clear() {
        while(this.length)
            this.deleteAt(0);
        return this;
    }

    deleteAt(index) {
        if(index < 0 || index >= this.length)
            return null; 

        if(this.length==1){
            this._head.data=null;
            this._tail.data=null;
            this.length--;
            return this;
        }
        let current = this._head;
        for(let i = 0; i< index; ++i) {
            current = current.next;
        }
        //если удаляем голову
        if(current == this._head) {
            this._head=current.next;
            this._head.prev = null;
            this.length--;
            return this;
        }
        //eсли удаляем хвост
        if(current == this._tail){
            this._tail = current.prev;
            this._tail.next = null;
            this.length--;
            return this;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.length--;
        return this;
    }

    reverse() {
        let current = this._tail;
        for(let i=0; i<this.length; ++i){
            let buf = current.next;
            current.next = current.prev;
            current.prev = buf;
            current = current.next;
        }
        let buf = this._head;
        this._head =this._tail;
        this._tail =  buf;
        return this;
    }

    indexOf(data) {
        if(this.isEmpty())
            return -1;

        let current = this._head;
        for(let i=0; i<this.length; ++i){
            if(current.data == data)
                return i;
            current = current.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
