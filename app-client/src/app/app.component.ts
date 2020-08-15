import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Product } from './product.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    simpleReqProduct$: Observable<Product[]>;
    productsErrorHandling: Product[];
    productsLoading: Product[];
    progressLoading = false;
    productsIds: Product[];
    newlyProducts: Product[] = [];
    productsToDelete: Product[];
    productsToEdit: Product[];


    constructor(
        private productsService: ProductsService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
    }

    getSimpleHttpRequest() {
        this.simpleReqProduct$ = this.productsService.getProducts();
    }

    getProductsWithErrorHandling() {
        this.productsService.getProductsError().subscribe(
            (prods) => this.productsErrorHandling = prods,
            (err) => {
                console.log(err);
                console.log('Message: ' + err.error.msg);
                console.log('Status: ' + err.status);

                const config = new MatSnackBarConfig();
                config.duration = 2000;
                config.panelClass = ['snack_error'];

                if (err.status === 0) {
                    this.snackBar.open('Could not connect to the server', '', config);
                } else {
                    this.snackBar.open(err.error.msg, '', config);
                }
            }
        );
    }

    getProductsWithErrorHandlingOk() {
        const config = new MatSnackBarConfig();
        config.duration = 2000;
        this.productsService.getProductsDelay().subscribe(
            (prods) => {
                this.productsErrorHandling = prods;
                this.snackBar.open('Products successfuly loaded!', '', config);
            },
            (err) => {
                if (err.status === 0) {
                    this.snackBar.open('Could not connect to the server', '', config);
                } else {
                    this.snackBar.open(err.error.msg, '', config);
                }
            }
        );
    }

    getProductsLoading() {
        this.progressLoading = true;
        this.productsService.getProductsDelay().subscribe(
            (prods) => {
                this.productsLoading = prods;
            },
            (err) => this.progressLoading = false,
            () => this.progressLoading = false
        );
    }

    loadName(id: string) {
        this.productsService.getProductName(id).subscribe(name => {
            const index = this.productsIds.findIndex(findProduct => findProduct._id === id);
            if (index >= 0) {
                this.productsIds[index].name = name;
            }
        });
    }

    getProductsIds() {
        this.productsService.getProductsIds().subscribe(ids => {
            this.productsIds = ids.map(id => ({ _id: id, name: '', department: '', price: 0 }));
        });
    }

    saveProduct(name: string, department: string, price: number) {
        const product = { name, department, price };
        this.productsService.saveProduct(product).subscribe((prod: Product) => {
            console.log(prod);
            this.newlyProducts.push(prod);
        }, (err) => {
            console.log(err);
            const config = new MatSnackBarConfig();
            config.duration = 2000;
            config.panelClass = ['snack_error'];

            if (err.status === 0) {
                this.snackBar.open('Could not connect to the server', '', config);
            } else {
                this.snackBar.open(err.error.msg, '', config);
            }
        });
    }

    loadProductsToDelete() {
        this.productsService.getProducts().subscribe(products => {
            this.productsToDelete = products;
        });
    }

    deleteProduct(product: Product) {
        this.productsService.deleteProduct(product).subscribe(res => {
            const index = this.productsToDelete.findIndex(findProduct => product._id === findProduct._id);
            if (index >= 0) {
                this.productsToDelete.splice(index, 1);
            }
        }, (error) => console.log(error));
    }

    loadProductsToEdit() {
        this.productsService.getProducts().subscribe(products => {
            this.productsToEdit = products;
        });
    }

    editProduct(product: Product) {
        const newProduct: Product = { ...product };
        const dialogRef = this.dialog.open(DialogEditProductComponent, {
            width: '400px',
            data: newProduct
        });

        dialogRef.afterClosed().pipe(mergeMap((editedProduct: Product) => {
            return this.productsService.editProduct(editedProduct);
        })).subscribe((response: Product) => {
            const index = this.productsToEdit.findIndex(indexProduct => indexProduct._id === response._id);
            if (index >= 0) {
                this.productsToEdit[index] = response;
            }
        }, (error) => console.log(error));
    }
}
