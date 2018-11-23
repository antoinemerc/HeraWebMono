import { AddressPageModule } from './address-page.module';

describe('AddressPageModule', () => {
    let addressPageModule: AddressPageModule;

    beforeEach(() => {
        addressPageModule = new AddressPageModule();
    });

    it('should create an instance', () => {
        expect(addressPageModule).toBeTruthy();
    });
});
