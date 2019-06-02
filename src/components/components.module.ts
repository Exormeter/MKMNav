import { NgModule } from '@angular/core';
import { FlashCardComponent } from './flash-card/flash-card';
import { ButtonListComponent } from './button-list/button-list';
import { ExpandableComponent } from './expandable/expandable';
@NgModule({
	declarations: [FlashCardComponent,
    ButtonListComponent,
    ExpandableComponent],
	imports: [],
	exports: [FlashCardComponent,
    ButtonListComponent,
    ExpandableComponent]
})
export class ComponentsModule {}
