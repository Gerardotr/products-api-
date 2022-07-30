import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import {CreateProductDTO} from './dto/product.dto';
import {ProductService} from './product.service'
@Controller('product')
export class ProductController {


    constructor(private productService: ProductService) {}
    // DTO data transfer object
    @Post('/create')
   async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
      const product =   await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product: product
        });
    }


    @Get('/')
   async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            message: 'Products',
            products: products
        });
    }

    @Get('/:id')
    async getProduct(@Res() res, @Param('id') id) {
         const product = await this.productService.getProduct(id);
         if(!product) throw new NotFoundException('Product Does not exists');
         return res.status(HttpStatus.OK).json({
             message: 'Product',
             product: product
         });
     }

     @Delete('/delete')
     async deleteProduct(@Res() res, @Query('id') id) {
          const product = await this.productService.deleteProduct(id);
          if(!product) throw new NotFoundException('Product Does not exists');
          return res.status(HttpStatus.OK).json({
              message: 'Delete',
              product: product
          });
      }

      @Put('/update')
      async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('id') id) {
         const product =   await this.productService.updateProduct(id,createProductDTO);
         if(!product) throw new NotFoundException('Product Does not exists');
           return res.status(HttpStatus.OK).json({
               message: 'Updated',
               product: product
           });
       }

    
}
