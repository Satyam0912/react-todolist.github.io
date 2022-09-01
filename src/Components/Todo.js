import React, { Component } from 'react';
import {
    Container,
    Form,
    Col,
    InputGroup,
    Button,
    ListGroup,
    Row,
    Card
} from 'react-bootstrap';
import './Todo.css';
import { BiEdit, BiListCheck } from 'react-icons/bi';
import { MdDeleteForever, MdOutlinePlaylistAdd } from 'react-icons/md';
import { TbChecks } from 'react-icons/tb'

export class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todoInput: '',
            todoItems: [],
            isEditing: false,
            editingIndex: '',
        }
    }

    // checkLocalStorage() {
    //     console.log(localStorage)
    // }

    addOrUpdateTodo = () => {
        const { todoInput, isEditing, editingIndex } = this.state;
        if (todoInput) {
            if (isEditing) {
                this.setState(prevState => ({
                    todoItems: prevState.todoItems.map((singleTodoItem, index) => {
                        if (index === editingIndex) {
                            singleTodoItem.text = todoInput;
                        }
                        return singleTodoItem
                    }),
                    todoInput: '',
                    isEditing: false,
                    editingIndex: '',
                }))
            }
            else {
                this.setState(prevState => ({
                    todoItems: [...prevState.todoItems, { text: todoInput, completed: false }],
                    todoInput: '',
                }))
            }
        }
    }

    edidTodoItem = (arrivalIndex) => {
        this.setState(prevState => ({
            todoInput: prevState.todoItems[arrivalIndex].text,
            isEditing: true,
            editingIndex: arrivalIndex,
        }))
    }

    removeTodoItem = (arrivalIndex) => {
        this.setState(prevState => ({
            todoItems: prevState.todoItems.filter((singleTodoItem, index) => index !== arrivalIndex)
        }))
    }

    completedTodo = (arrivalIndex) => {
        this.setState(prevState => ({
            todoItems: prevState.todoItems.map((singleTodoItem, index) => {
                if (index === arrivalIndex) {
                    singleTodoItem.completed = true;
                }
                return singleTodoItem
            })
        }))
    }

    render() {
        const { todoInput, todoItems, isEditing } = this.state
        return (
            <Container style={{ margin: '20px auto' }} className="main-container">
                <Card.Header
                    style={{ margin: '10px', backgroundColor: 'darkblue', color: 'white' }}
                >
                    ToDo List
                </Card.Header>
                <Col md={{ span: 6, offset: 3 }}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            className='todo-input'
                            size='lg'
                            type="text"
                            placeholder="Enter todo..."
                            value={todoInput}
                            onChange={(e) => this.setState({ todoInput: e.target.value })}
                        />
                        <Button
                            variant="primary"
                            id="button-addon2"
                            onClick={() => { this.addOrUpdateTodo() }}
                        >
                            {isEditing ? <BiListCheck /> : <MdOutlinePlaylistAdd />}
                        </Button>
                    </InputGroup>
                    <ListGroup className='to-do-items'>
                        {todoItems.map((todoItem, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col xs={9} className={todoItem.completed && "completed"}>{todoItem.text}</Col>
                                    <Col xs={3} className='actions-btns'>
                                        <Button
                                            variant="warning"
                                            size='sm'
                                            onClick={() => this.edidTodoItem(index)}
                                            disabled={todoItem.completed}
                                        >
                                            {" "}<BiEdit />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size='sm'
                                            onClick={() => this.removeTodoItem(index)}
                                        >
                                            {" "}<MdDeleteForever />
                                        </Button>
                                        <Button
                                            variant="success"
                                            size='sm'
                                            onClick={() => this.completedTodo(index)}
                                            disabled={todoItem.completed}
                                        >
                                            {" "}<TbChecks />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Container >
        )
    }
}

export default Todo
