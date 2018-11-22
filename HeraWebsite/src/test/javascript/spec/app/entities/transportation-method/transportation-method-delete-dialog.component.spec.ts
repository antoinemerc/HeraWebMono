/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HeraShopTestModule } from '../../../test.module';
import { TransportationMethodDeleteDialogComponent } from 'app/entities/transportation-method/transportation-method-delete-dialog.component';
import { TransportationMethodService } from 'app/entities/transportation-method/transportation-method.service';

describe('Component Tests', () => {
    describe('TransportationMethod Management Delete Component', () => {
        let comp: TransportationMethodDeleteDialogComponent;
        let fixture: ComponentFixture<TransportationMethodDeleteDialogComponent>;
        let service: TransportationMethodService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HeraShopTestModule],
                declarations: [TransportationMethodDeleteDialogComponent]
            })
                .overrideTemplate(TransportationMethodDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportationMethodDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportationMethodService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
