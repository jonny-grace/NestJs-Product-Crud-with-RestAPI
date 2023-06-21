import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ProductService {
  products: Product[] = [];
  insertProduct(title: string, desc: string, price: number): string {
    const id = uuidv4();
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return id;
  }
  getProducts() {
    return this.products;
  }
  getSingleProduct(id: string) {
    const fetchedProduct = this.products.find((prod) => prod.id === id);
    if (!fetchedProduct) {
      throw new NotFoundException('Product Not Found');
    }
    return fetchedProduct;
  }

  updateProducts(id: string, title: string, desc: string, price: number) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex < 0) {
      throw new NotFoundException('the product Not Found');
    }

    const updatedPoduct = { ...this.products[productIndex] };
    if (title) {
      updatedPoduct.title = title;
    }
    if (desc) {
      updatedPoduct.description = desc;
    }
    if (price) {
      updatedPoduct.price = price;
    }
    this.products[productIndex] = updatedPoduct;
    return 'productupdated successfuly';
  }
  deleteProduct(id: string) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex < 0) {
      throw new NotFoundException('the product Not Found');
    }
    this.products.splice(productIndex, 1);
    return `product with id ${id} deleted succesfuly`;
  }
}
