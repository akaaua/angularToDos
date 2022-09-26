import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public mode: String = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;




  constructor(private fb: FormBuilder, public translateService: TranslocoService) {
    this.form = this.fb.group({
     title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

 setEn(){
  this.translateService.setActiveLang('en')
 }

 setEs(){
  this.translateService.setActiveLang('es')
 }

 setPt(){
  this.translateService.setActiveLang('pt')
 }

 add (){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset()
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo){
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo){
    todo.done = false;
    this.save();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data)
    this.mode='list'
  }

  load(){

    this.todos = JSON.parse(localStorage.getItem('todos') || '[]')
    // const  data = localStorage.getItem('todos');
    // this.todos = JSON.parse(data);
  }

  changeMode(mode:string){
    this.mode = mode;
  }


}
