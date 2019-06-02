import {Component, ElementRef, Input, OnChanges, Renderer, SimpleChange, SimpleChanges} from "@angular/core";
import {Config, Ion} from "ionic-angular";

@Component({
  selector: "ss-icon",
  template: "",
})
export class KrIconComponent extends Ion implements OnChanges {
  @Input() name: string;
  @Input() size: string;
  @Input() rarity: string;
  

  @Input("fixed-width")
  set fixedWidth(fixedWidth: string) {
    this.setElementClass("ss-fw", this.isTrueProperty(fixedWidth));
  }

  constructor(config: Config, elementRef: ElementRef, renderer: Renderer) {
    super(config, elementRef, renderer, "ss");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name) {
      this.unsetPrevAndSetCurrentClass(changes.name);
    }
    if (changes.size) {
      this.unsetPrevAndSetCurrentClass(changes.size);
    }
    if (changes.rarity) {
      this.unsetPrevAndSetCurrentClass(changes.rarity);
    }
  }

  isTrueProperty(val: any): boolean {
    
    if (typeof val === "string") {
      val = val.toLowerCase().trim();
      return (val === "true" || val === "on" || val === "");
    }
    return !!val;
  };

  unsetPrevAndSetCurrentClass(change: SimpleChange) {
    this.setElementClass("ss-" + change.previousValue, false);
    this.setElementClass("ss-" + change.currentValue, true);
  }
}