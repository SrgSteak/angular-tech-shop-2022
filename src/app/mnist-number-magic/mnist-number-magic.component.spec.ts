import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnistNumberMagicComponent } from './mnist-number-magic.component';

describe('MnistNumberMagicComponent', () => {
  let component: MnistNumberMagicComponent;
  let fixture: ComponentFixture<MnistNumberMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MnistNumberMagicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnistNumberMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
