import { Page, expect, selectors } from "@playwright/test";

export class BasePage {
    protected readonly page:Page 

    constructor (page:Page){
        this.page = page
    }

    async loadWeb(url: string){
        await this.page.goto(url);
    }
}