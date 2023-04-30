import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#closeTiles should Return', () => {
    let closeTiles = service.closeTiles({x:2, y:2});
    expect(closeTiles).toEqual([
      {x:1, y:1}, {x:2, y:1}, {x:3, y:1},
      {x:1, y:2}, {x:2, y:2}, {x:3, y:2},
      {x:1, y:3}, {x:2, y:3}, {x:3, y:3}
    ])
  })
});
