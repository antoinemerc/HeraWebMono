/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HeraShopTestModule } from '../../../test.module';
import { TransportationMethodUpdateComponent } from 'app/entities/transportation-method/transportation-method-update.component';
import { TransportationMethodService } from 'app/entities/transportation-method/transportation-method.service';
import { TransportationMethod } from 'app/shared/model/transportation-method.model';

describe('Component Tests', () => {
    describe('TransportationMethod Management Update Component', () => {
        let comp: TransportationMethodUpdateComponent;
        let fixture: ComponentFixture<TransportationMethodUpdateComponent>;
        let service: TransportationMethodService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HeraShopTestModule],
                declarations: [TransportationMethodUpdateComponent]
            })
                .overrideTemplate(TransportationMethodUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportationMethodUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportationMethodService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransportationMethod('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportationMethod = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransportationMethod();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportationMethod = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
