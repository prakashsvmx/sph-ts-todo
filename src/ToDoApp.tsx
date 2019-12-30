import React, {useState} from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface IToDo {
    id: number,
    text: string,
    complete: boolean
}

const ToDoApp: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [todos, setTodos] = useState<IToDo[]>([]);
    const addTodo = (text: string):void => {
        const newToDos: IToDo[] = [...todos, {text,
            complete: false,
            id: Date.now()
        }];
        setTodos(newToDos);
    };

    const completeToDo = (id: number): void => {
        const newToDos: IToDo[] = todos.map((todo: IToDo) => {
            if (todo.id === id) {
                todo.complete = !todo.complete ;
                return todo;
            }
            return todo
        });
        setTodos(newToDos);
    };

    const removeToDo =(id:number):void=>{
        const itemIndex: number = todos.findIndex((toDoItem:IToDo)=>{
            return toDoItem.id ===id;
        });

        const copyOfToDos:IToDo[]= [...todos];
        copyOfToDos.splice(itemIndex, 1);
        setTodos(copyOfToDos);
    };

    const handleSubmit = (e: FormElement): void => {
        e.preventDefault();
        addTodo(value);
        setValue('');
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="text"
                       required
                       value={value}
                       onChange={(e: ChangeEvent): void => {
                           setValue(e.target.value);
                       }}
                />
                <button type="submit"> Add</button>
            </form>

            <section>
                {todos.map((item: IToDo) => {
                    return <div key={item.id}>
                        <input type="checkbox"
                               value={item.id}
                               checked={item.complete}
                               onChange={() => {
                                   completeToDo(item.id);
                               }}
                        /> &nbsp;
                        {item.text}
                        {' '}
                        <button type="button" onClick={()=>{
                                removeToDo(item.id)
                        }
                        }> Remove </button>
                    </div>
                })}
            </section>
        </div>
    );
};

export default ToDoApp;
