import { NumberPokedexPipe } from './number-pokedex.pipe';

describe('NumberPokedexPipe', () => {
  let pipe: NumberPokedexPipe;

  beforeEach(() => {
    pipe = new NumberPokedexPipe();
  });

  it('should be create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be return number formated on number less than a thousand', () => {
    const result = pipe.transform(1, 3);
    expect(result).toEqual('001');
  });

  it('should be return number formated on number greater than a thousand', () => {
    const result = pipe.transform(1000, 3);
    expect(result).toEqual('1000');
  });
});
