import Node from './Node.js'
class DoublyLinkedList {
	constructor(name){
		this.name = `${name}-tier`
		this.head = null
		this.tail = this.head // * this solves prepending when nodes > 0
		this._length = 0
	} 

	prepend(value) {
		const node = new Node(value)
		let pointer = this.head
		if (pointer === null) {
			this.head = node
		}
		node.next = pointer
		pointer.previous = node
		this.head = node // ? does this.tail point the new node ?

		this._length++
		return
	}

	append(value){
		const node = new Node(value)
		let pointer = this.tail

		node.previous = pointer
		pointer.next = node
		this.tail = node

		this._length++
		return
	}

	insert(index, value) {

	}

	remove(index) {

	}

}
export default DoublyLinkedList