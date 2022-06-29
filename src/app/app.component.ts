import { Component } from '@angular/core';
  
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    public tasks: Array<any> = [
        {
            index: '0',
            title: 'Walk the Dogs',
            description: 'Walk Missy and Daisy.',
            done: false
        }, {
            index: '1',
            title: 'Do the Groceries',
            description: 'Buy milk and eggs.',
            done: false
        },
    ];

    public newTask: any = {
        index: '',
        title: '',
        description: '',
        done: ''
    };
  
    public addToList() {
        const title = this.newTask.title;

        if (title == '') {
            alert('Title is required.')
        }
        else {
            const idx = this.tasks.length + 1;
            const addTask = {
                index: idx.toString(),
                title: this.newTask.title,
                description: this.newTask.description,
                done: false
            };

            this.tasks.push(addTask);

            this.initNewTask();
        }
    }

    initNewTask() {
        this.newTask.index = '';
        this.newTask.title = '';
        this.newTask.description = '';
        this.newTask.done = '';
    }

    taskDone(event) {
        const index = event.source.value;
        const task = this.tasks.find(obj => {
            if (obj.index === index) {
                obj.done = true;
            }
        });
    }

    taskUndone(event) {
        const index = event.source.value;
        const task = this.tasks.find(obj => {
            if (obj.index === index) {
                obj.done = false;
            }
        });
    }
}