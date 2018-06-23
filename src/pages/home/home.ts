import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';

import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animals: Animal[] = [];
  audio = new Audio();
  audioTime: any;

  ordering: boolean = false;

  constructor(public navCtrl: NavController) {
    console.log('pinga');

    this.animals = ANIMALES.slice(0);


  }


  reproducir(animal: Animal) {

    this.pause_audio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTime = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);
  }

  private pause_audio(animalSel: Animal) {

    clearTimeout(this.audioTime);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animals) {
      if (animal.nombre != animalSel.nombre) {
        animal.reproduciendo = false;
      }
    }

  }

  deleteAnimal(idx) {
    this.animals.splice(idx, 1);
  }

  doRefresh($event: Refresher) {
    setTimeout(() => {
      this.animals = ANIMALES.slice(0);
      $event.complete();
    }, 1500);
  }

  reorderAnimal(indexes: any) {

    // the event is returned with wrong indexes

    let idx = {
      from: indexes.from - 2,
      to: indexes.to - 2
    };

   this.animals = reorderArray(this.animals, idx);



  }



}
