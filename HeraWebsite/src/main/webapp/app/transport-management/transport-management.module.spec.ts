import { TransportManagementModule } from './transport-management.module';

describe('ProductListModule', () => {
    let transportManagementModule: TransportManagementModule;

    beforeEach(() => {
        transportManagementModule = new TransportManagementModule();
    });

    it('should create an instance', () => {
        expect(transportManagementModule).toBeTruthy();
    });
});
