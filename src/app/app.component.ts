import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PatternColorComponent } from './pattern-color/pattern-color.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, PatternColorComponent, MatInputModule, MatIconModule, MatButtonModule, CdkDrag, CdkDropList],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'bracelet-pattern-generator';
  pearlNumber = 60;
  pearlSize = 20;
  pattern: string[] = ['#f8e6e6', '#f8a915', '#f82828', '#f8e6e6'];

  section = 100;
  centerX = 150;
  centerY = 150;

  ngAfterViewInit() {
    this.generateSVG();
  }

  generateSVG() {
    const container = document.querySelector('.bracelet-image');
    // Calcul de la circonférence et du section en fonction du nombre de perles et de la taille des perles
    const circonference = this.pearlNumber * this.pearlSize;
    const section = circonference / (2 * Math.PI);

    // Centre du cercle
    const centerX = section + this.pearlSize / 2;
    const centerY = section + this.pearlSize / 2;

    const svgWidth = 2 * section + this.pearlSize;
    const svgHeight = 2 * section + this.pearlSize;

    // Début de la chaîne SVG
    let svgContent = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">`;

    // Parcours chaque perle et place-la sur le cercle
    for (let i = 0; i < this.pearlNumber; i++) {
      const angle = (i / this.pearlNumber) * 2 * Math.PI; // Calcul de l'angle pour chaque perle
      const x = centerX + section * Math.cos(angle); // Position en X
      const y = centerY + section * Math.sin(angle); // Position en Y

      // Sélection de la couleur en fonction du pattern
      const color = this.pattern[i % this.pattern.length];

      // Ajout du cercle représentant la perle dans le SVG
      svgContent += `<circle cx="${x}" cy="${y}" r="${this.pearlSize / 2}" fill="${color}" />`;
    }

    svgContent += `</svg>`;
    container!.innerHTML = svgContent;
    return svgContent;
  }

  downloadSVG() {
    const svgContent = this.generateSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bracelet.svg';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  updateColor(index: number, color: string) {
    this.pattern[index] = color;
    this.generateSVG();
  }

  addColor() {
    this.pattern.push('#78aee8');
    this.generateSVG();
  }

  deleteColor(index: number) {
    this.pattern.splice(index, 1);
    this.generateSVG();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pattern, event.previousIndex, event.currentIndex);
    this.generateSVG();
  }
}
