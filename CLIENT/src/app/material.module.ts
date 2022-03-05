import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';

const MATERIAL = [MatListModule];

@NgModule({
  imports: [MATERIAL],
  exports: [MATERIAL],
})
export class MaterialModule {}
