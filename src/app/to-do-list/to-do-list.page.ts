import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.page.html',
  styleUrls: ['./to-do-list.page.scss'],
})
export class ToDoListPage implements OnInit {
  tasks: any[] = [];
  maxTask = 1000;

  options: AnimationOptions = {
    path: 'assets/tasks.json'
  }

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private kb: Keyboard) {
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
    await toast.present()
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
            console.log('Não adicionou a task.');
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            if (this.tasks.length < 1000) {
              this.addTask(form.task);
            } else
              this.toast('Número máximo de tasks!', 'dark');
          }
        }
      ]
    });
    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
	    firstInput.focus();
	    return;
    });
    let firstInput: any = document.getElementsByClassName('alert-input').item(0)
    firstInput.focus();
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
    if (task.done == false) {
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
            this.toast('Atividade deletada', 'danger');
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
              this.tasks.splice(i, 1, { name: form.newtask, done: false });
              this.toast('Atividade atualizada', 'success');
              this.updateLocalStorage();
            } else {
              this.toast('Informe o nome da atividade!', 'dark');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  updateLocalStorage() {
    localStorage.setItem('db_tasks', JSON.stringify(this.tasks));
  }
}
