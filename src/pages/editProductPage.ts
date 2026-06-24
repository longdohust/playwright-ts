import { Page, request } from "@playwright/test";
import { CommonInterface } from "./commonInterface";
import { CommonPage } from "./commonPage";

export class EditProductPage extends CommonPage{
    constructor(page: Page){
        super(page);
    }

    async getProductId() {
        let url = this.page.url();
        let splitted = url.split("/");
        return splitted[splitted.length - 1];
    }

   
}