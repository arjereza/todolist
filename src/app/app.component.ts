import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { filter, map, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';
  
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.router.events.pipe(
            // router navigation end
            filter((event) => event instanceof NavigationEnd),
            // now query the activated route
            map(() => this.rootRoute(this.route)),
            filter((route: ActivatedRoute) => route.outlet === 'primary'),
        ).subscribe((route: ActivatedRoute) => {
            const index = route.snapshot.paramMap.get('task');
            const exists = this.tasks.find(obj => {
                if (obj.index === index) {
                    return true;
                } else {
                    return false;
                }
            });

            if (exists && index !== null) {
                this.openDialog(index);
            }
        });
    }

    private rootRoute(route: ActivatedRoute): ActivatedRoute {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }
  
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
            const idx = this.tasks.length;
            const addTask = {
                index: idx.toString(),
                title: this.newTask.title,
                description: this.newTask.description,
                done: false
            };

            this.tasks.unshift(addTask);

            this.initNewTask();
        }
    }

    countTasks(): number {
        const count = this.tasks.reduce(function (n, obj) {
            return n + (obj.done == false);
        }, 0);

        return count;
    }

    initNewTask() {
        this.newTask.index = '';
        this.newTask.title = '';
        this.newTask.description = '';
        this.newTask.done = '';
    }

    taskDone(event) {
        const index = event.source.value;
        this.tasks.find(obj => {
            if (obj.index === index) {
                obj.done = true;
            }
        });
    }

    taskUndone(event) {
        const index = event.source.value;
        this.tasks.find(obj => {
            if (obj.index === index) {
                obj.done = false;
            }
        });
    }

    viewTask(index) {
        this.openDialog(index);
    }

    openDialog(index: any): void {
        const task = this.tasks.find(obj => {
            return obj.index === index;
        });

        const dialogRef = this.dialog.open(DialogComponent, {
            width: '75%',
            data: {
                item: task 
            },
            disableClose: true,
            autoFocus: false,
            position: {
                top: '10%'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            // Nothing
        });
    }
}