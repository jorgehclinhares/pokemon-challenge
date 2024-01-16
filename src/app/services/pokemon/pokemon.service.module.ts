import { NgModule } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  exports: [],
  declarations: [],
  providers: [PokemonService],
})
export class PokemonServiceModule {}
