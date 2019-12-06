import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.page.html',
  styleUrls: ['./to-do-list.page.scss'],
})
export class ToDoListPage implements OnInit {
  tasks: any[] = [];
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private aSheetCtrl: ActionSheetController) {
    const tasksString = localStorage.getItem('db_tasks');
    if (tasksString != null) {
      this.tasks = JSON.parse(tasksString);
    }
  }

  ngOnInit() {
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'O que vai fazer?',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Estudar pra av3'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelou.');
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            console.log(form);
            this.addTask(form.task);
          }
        }
      ]
    });
    await alert.present();
  }

  async toastError() {
    const toast = await this.toastCtrl.create({
      message: 'Informe alguma atividade!',
      showCloseButton: true,
      duration: 2000,
      position: 'top',
      closeButtonText: 'Fechar',
      color: 'dark'
    });
    toast.present();
  }

  async addTask(task: string) {
    if (task.trim().length < 1) {
      this.toastError();
    }
    if (task.trim().length >= 1) {
    const taskToDo = { name: task, done: false };
    this.tasks.push(taskToDo);
    this.updateLocalStorage();
    }
  }

  async changeStatus(task: any) {
    task.done = !task.done;
    this.updateLocalStorage();
  }

  delete(task: any) {
    this.tasks = this.tasks.filter(taskArray => task !== taskArray);
    this.updateLocalStorage();
  }
  async edit(i: number) {
    // console.log(i);
    const alert = await this.alertCtrl.create({
      header: 'O que vai fazer?',
      inputs: [
        {
          name: 'newtask',
          type: 'text',
          placeholder: 'Estudar pra av1'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelou.');
          }
        },
        {
          text: 'Editar',
          handler: (form) => {
            console.log(form);
            if (form.newtask.trim().length >= 1) {
              this.tasks.splice(i, 1, {name: form.newtask, done: false});
              this.updateLocalStorage();
            } else {
              this.toastError();
            }
          }
        }
      ]
    });
    await alert.present();
    // this.showAlert();
    // this.tasks = this.tasks.filter(taskArray => toDelete !== taskArray);
  }
  updateLocalStorage() {
    localStorage.setItem('db_tasks', JSON.stringify(this.tasks));
  }
}
