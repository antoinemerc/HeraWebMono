import { ListProductModule } from './list-product.module';

describe('ListProductModule', () => {
    let listProductModule: ListProductModule;

    beforeEach(() => {
        listProductModule = new ListProductModule();
    });

    it('should create an instance', () => {
        expect(listProductModule).toBeTruthy();
    });
});
