import { expect, Page, request } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";
import { apiBaseUrl, host, port } from "../utils/constants-ultils";

export class Product extends CommonPage implements CommonInterface {
    constructor(page:Page) {
        super(page);
    }

    isOnPage(): void {
        expect(this.page.getByText('Create a new product')).toBeVisible();
    }

     async deleteProductByAPI(token: string, productId: string){
        let req = await request.newContext();
        await req.delete(`${apiBaseUrl}/api/products/${productId}`, {
            headers: {
                'Cookie': token
            }
        });
    }
}