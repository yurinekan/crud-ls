import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.page.html',
  styleUrls: ['./to-do-list.page.scss'],
})
export class ToDoListPage implements OnInit {
  tasks: any[] = [];
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {
    const tasksString = localStorage.getItem('db_tasks');
    if (tasksString != null) {
      this.tasks = JSON.parse(tasksString);
    }
  }

  ngOnInit() {
  }

  async toast(message, color) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 1200,
      position: 'top'
    });
    toast.present();
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

  async addTask(task: string) {
    if (task.trim().length < 1) {
      this.toast('Informe alguma atividade!', 'dark');
    }
    if (task.trim().length >= 1) {
    const taskToDo = { name: task, done: false };
    this.tasks.push(taskToDo);
    this.toast('Atividade adicionada', 'success');
    this.updateLocalStorage();
    }
  }

  async changeStatus(task: any) {
    task.done = !task.done;
    this.updateLocalStorage();
  }

  async delete(task: any) {
    let subHeader;
    if(task.done == false) {
      subHeader = 'Essa atividade ainda não foi concluída.'
    }
    
    const alert = await this.alertCtrl.create({
      header: 'Quer mesmo apagar?',
      subHeader,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelou.');
          }
        },
        {
          text: 'Apagar',
          handler: () => {
            this.tasks = this.tasks.filter(taskArray => task !== taskArray);
            this.updateLocalStorage();
          }
        }
      ]
    });
    await alert.present();
  }

  async edit(i: number) {
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
              this.toast('Informe alguma atividade!', 'dark');
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
