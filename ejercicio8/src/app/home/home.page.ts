import { Component, OnInit } from '@angular/core';

import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private platform: Platform, private flashLight: Flashlight) { }

  hasFlash = false;

  flashOn = false;

  ngOnInit() {
    // Esperamos a que el dispositivo esté listo.
    this.platform.ready().then(() => {
      if (this.platform.is('mobile')) {
        this.hasFlash = true;
      } else {
        if (this.platform.is('mobile') || this.platform.is('tablet')) {
          this.flashLight.available().then(() => {
            // Si el dispositivo tiene flash
            this.hasFlash = true;
          }).catch(() => {
            // En caso contrario
            this.hasFlash = false;
          });
        } else {
          this.hasFlash = false;
        }
      }
    });

    // Subscribe al Subject #pause
    this.platform.pause.subscribe(
      () => this.apagarFlash()
    );

    // Subscribe al Emmitter #backButton
    this.platform.backButton.subscribe(
      () => this.apagarFlash()
    );
  }

  // Apaga el flash si este está disponible y encendido
  apagarFlash() {
    if (this.flashLight.available()) {
      if (this.flashLight.isSwitchedOn()) {
        this.flashLight.switchOff().then(
          () => {
            this.flashOn = false;
            console.log('Flash apagado');
          }
        );
      }
    }
  }

  // Enciende el flash si este está disponible
  encenderFlash() {
    if (this.flashLight.available()) {
      this.flashLight.switchOn().then(() => {
        this.flashOn = true;
        console.log('Flash apagado');
      });
    }
  }

}
