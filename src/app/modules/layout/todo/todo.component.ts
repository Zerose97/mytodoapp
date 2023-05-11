import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTodo, editTodo, loadTodo, removeTodo } from 'src/app/@core/states/todo/todo.actions';
import { Observable } from 'rxjs';
import { TodoItem } from 'src/app/@core/models/todo.model';
import { selectAllTodo } from 'src/app/@core/states/todo/todo.selector';
import { AuthenService } from 'src/app/@core/services/authen.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public allTodo$: Observable<TodoItem[]> = this.store.select(selectAllTodo);
  public inputText = '';
  public inputTextEdit = '';
  public selectedItem: TodoItem | undefined;
  constructor(
    private store: Store,
    private authenService: AuthenService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.store.dispatch(loadTodo());
  }

  onCreate() {
    if(!this.inputText || !this.inputText.trim()) return;
    const userId = this.authenService.getUserInfo?.id
    const body = {
      userId: userId || 0,
      id: Math.floor(Math.random() * 999),
      title: this.inputText.trim(),
      body: '',
      checked: false
    }
    this.store.dispatch(addTodo({item: body}))
    this.inputText = '';
  }

  onAskingRemove(item: TodoItem, content: any) {
    this.selectedItem = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then(
			(result) => {
        if(result==='Yes') this.onRemove(item.id)
      },
			(reason) => {},
		);
  }

  onRemove(id: any) {
    this.store.dispatch(removeTodo({id}))
  }

  onSave(modal:any) {
    if(!this.inputTextEdit || !this.inputTextEdit.trim()) return;
    modal.close('save');
  }

  onAskingEdit(item: TodoItem, content: any) {
    this.selectedItem = item;
    this.inputTextEdit = item.title;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then(
			(result) => {
        if(result==='save'){
          
          this.onEdit(item, 'title');
        }
      },
			(reason) => {},
		);
  }

  onEdit(item: TodoItem, type: string) {
    const userId = this.authenService.getUserInfo?.id
    const body = {
      userId: userId || 0,
      id: item.id,
      title: type === 'title' ? this.inputTextEdit : item.title,
      body: '',
      checked: type === 'check' ? !item.checked : item.checked
    }
    this.store.dispatch(editTodo({item: body}))
  }

  goTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
