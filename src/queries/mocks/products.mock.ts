import { ApiSearchResult } from 'src/api/base';
import { Product } from 'src/api/models';
import { useMockData } from 'src/constants';

export let MOCK_PRODUCTS: ApiSearchResult<Product>;

if (useMockData()) {
  const product1: Product = {
    id: 'rhel1',
    name: 'Red Hat Enterprise Linux 1',
    version: 'v1',
    supplier: 'Red Hat',
    createdOn: '10/10/2023, 1:05:18 PM',
    packagesCount: 120,
    advisoriesCount: 3,
    sbomId: 'rhel1',
  };
  const product2: Product = {
    id: 'quarkus1',
    name: 'Quarkus 2',
    version: 'v2',
    supplier: 'Red Hat',
    createdOn: '10/10/2021, 1:05:18 PM',
    packagesCount: 473,
    advisoriesCount: 19,
    sbomId: 'quarkus1',
  };

  const products = [product1, product2];
  MOCK_PRODUCTS = {
    result: products,
    total: products.length,
  };
}
