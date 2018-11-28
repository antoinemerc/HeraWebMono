import { ValidationPageModule } from './validation-page.module';

describe('ValidationPageModule', () => {
    let transportManagementModule: ValidationPageModule;

    beforeEach(() => {
        transportManagementModule = new ValidationPageModule();
    });

    it('should create an instance', () => {
        expect(transportManagementModule).toBeTruthy();
    });
});
