/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HeraShopTestModule } from '../../../test.module';
import { TransportationMethodDetailComponent } from 'app/entities/transportation-method/transportation-method-detail.component';
import { TransportationMethod } from 'app/shared/model/transportation-method.model';

describe('Component Tests', () => {
    describe('TransportationMethod Management Detail Component', () => {
        let comp: TransportationMethodDetailComponent;
        let fixture: ComponentFixture<TransportationMethodDetailComponent>;
        const route = ({ data: of({ transportationMethod: new TransportationMethod('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HeraShopTestModule],
                declarations: [TransportationMethodDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransportationMethodDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportationMethodDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transportationMethod).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
