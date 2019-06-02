import { Component, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})
export class FlashCardComponent {
  @Input() imageURLbackSide: string;
  @Input() imageURLfrontSide: string;
  @Input() allowedToFlip: boolean;
  @Input() placeholder: string = "assets/imgs/placeholder.jpg";
  @ViewChild('flip-container') fcContainer;
  @ViewChild('front') fcFront;
  @ViewChild('back') fcBack;
   toggled: boolean = false;
   

  constructor() {
  }


  toggle() {
    if(this.allowedToFlip){
      this.toggled = !this.toggled;
    }
  }

  flipOnce(){
    this.toggled = true;
    if (this.imageURLbackSide != undefined){
      setTimeout(() => {
        this.placeholder = this.imageURLbackSide;
      }, 1000);
      
    }
  }
}
