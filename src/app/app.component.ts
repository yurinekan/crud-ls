import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    // trocar aqui para voltar a ter rotas em OpcA e OpcB.
    {
      title: 'CRUD',
      url: '/to-do-list',
      icon: 'list'
    },
    {
      title: 'OpcA',
      url: '/to-do-list',
      icon: 'home'
    },
    {
      title: 'OpcB',
      url: '/to-do-list',
      icon: 'paper'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
