import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedid = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedid };
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getSingleProduct(@Param('id') proId: string) {
    return this.productService.getSingleProduct(proId);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') proId: string,
    @Body('title') proTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPrice: number,
  ) {
    return this.productService.updateProducts(
      proId,
      proTitle,
      proDesc,
      proPrice,
    );
    // return `${proId}, ${proTitle}, ${proDesc}, ${proPrice}`;
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string): string {
    return this.productService.deleteProduct(id);
  }
}
