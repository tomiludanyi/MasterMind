import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PegColor } from '../models/peg-color';

@Component({
  selector: 'mm-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

    @Input()
    won!: boolean;
  
    @Input()
    numberOfGuesses!: number;
  
    @Input()
    lastGuess!: PegColor[];
  
    @Input()
    secretColors!: PegColor[];
  
    @Output()
    restart = new EventEmitter<void>();
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    initParameters(inputs: { won: boolean, numberOfGuesses: number, lastGuess: PegColor[], secretColors: PegColor[] }, outputs: { restart: (...args: any[]) => any }) {
      this.won = inputs["won"];
      this.numberOfGuesses = inputs["numberOfGuesses"];
      this.lastGuess = inputs["lastGuess"];
      this.secretColors = inputs["secretColors"];
  
      this.restart.subscribe(outputs["restart"]);
    }
  }
