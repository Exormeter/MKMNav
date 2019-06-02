import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { SearchAutocompleteService } from '../../services/searchAutocompleteService';
/**
 * Generated class for the ButtonListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'button-list',
  templateUrl: 'button-list.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
})
export class ButtonListComponent {
  

  availableLanguages: string[] = ["gb", "es", "fr", "d", "it", "pt"];
  selectedLanguage: string = "gb";
  shownLanguages: string[] = [];
  showButtons: boolean = false;

  constructor(public searchAutocompleteService: SearchAutocompleteService) {
  }

  logAnimation(_event) {
    console.log(_event)
  }

  showItems() {
    this.availableLanguages.map((language) => {
      this.shownLanguages.push(language)
    })

  }

  hideItems() {
    this.shownLanguages = [];
  }

  onClickLanguage(language: string){
    this.selectedLanguage = language;
    this.shownLanguages = [];
    this.searchAutocompleteService.setLanguage(this.selectedLanguage);
  }

  toggle() {
    this.shownLanguages.length ? this.hideItems() : this.showItems();
  }



}
