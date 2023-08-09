import { Component } from '@angular/core';
import { Guess } from './models/guess';
import { PegColor } from './models/peg-color';
import { PegComponent } from './peg/peg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameOverComponent } from './game-over/game-over.component';

@Component({
    selector: 'mm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'mastermind';

    guesses: Guess[] = [];
    currentGuess: PegColor[] = [];
    possibleValues: PegColor[] = ['red', 'purple', 'blue', 'green', 'yellow', 'orange'];
    private secretColors: PegColor[] = [];

    constructor(private modalService: NgbModal) {
        this.initGame();
    }

    initGame() {
        this.guesses = [];
        this.currentGuess = [];
        this.secretColors = Array.from(Array(4)).map(_ => this.possibleValues[Math.floor(Math.random() * this.possibleValues.length)]);
        for (let i = 1; i <= 4; i++) {
            this.currentGuess.push('unset');
        }
        for (let i = 1; i <= 3; i++) {
            this.guesses.push(
                new Guess(
                    ['unset', 'unset', 'unset', 'unset'],
                    ['unset', 'unset', 'unset', 'unset']
                )
            )
            console.log(this.guesses);
        }
    }

    addColorToCurrentGuess(color: PegColor) {
        this.currentGuess.splice(this.currentGuess.indexOf('unset'), 1, color);
    }

    removeColorFromCurrentGuess(index: number) {
        this.currentGuess.splice(index, 1);
        this.currentGuess.push('unset');
    }

    guess() {
        const current = this.currentGuess.slice();
        const secret = this.secretColors.slice();

        let matches = 0;
        for (let i = 0; i < current.length; i++) {
            if (current[i] == secret[i]) {
                matches++;
                current.splice(i, i);
                secret.splice(i, i);
                i--;
            }
        }

        let wrongPlace = 0;
        for (let i = 0; i < current.length; i++) {
            const secretIndex = secret.indexOf(current[i]);
            if (secretIndex !== -1) {
                wrongPlace++;
                current.splice(i, 1);
                secret.splice(secretIndex, 1);
                i--;
            }
        }

        const currentInList = this.guesses.find(g => g.colors.indexOf('unset') !== -1);
        if (currentInList) {
            currentInList.colors = this.currentGuess;
            currentInList.keys = Array.from(Array(4).keys())
                .map<PegColor>(i => i < matches ? 'black' : i < matches + wrongPlace ? 'white' : 'unset')
            this.currentGuess = Array.from(Array(4)).map(_ => 'unset');
        }


        if (matches === 4) {
            this.openGameOverModal(true);
        }

        else if (!this.guesses.some(g => g.colors.some(c => c === 'unset'))) {
            this.openGameOverModal(false);
        }
    }

    openGameOverModal(won: boolean) {
        let modal = this.modalService.open(GameOverComponent, { backdrop: 'static', centered: true });
        (modal.componentInstance as GameOverComponent)
            .initParameters({
                won,
                numberOfGuesses: this.guesses.filter(g => !g.colors.includes('unset')).length,
                lastGuess: this.guesses.filter(g => !g.colors.includes('unset')).reverse()[0].colors,
                secretColors: this.secretColors.slice()
            }, {
                restart: () => {
                    modal.close();
                    this.initGame();
                }
            });
    }
}