import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;



  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
     title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });



    this.todos.push(new Todo(1, 'Passear com o dog', false));
    this.todos.push(new Todo(2, 'Ir ao mercado', false));
    this.todos.push(new Todo(3, 'Aparar a juba', true));
    this.todos.push(new Todo(4, 'Comprar almofada', false));
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo){
    todo.done = true;

  }

  markAsUndone(todo: Todo){
    todo.done = false;
  }
}
