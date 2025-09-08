import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ValidationMessageComponent } from "../../shared/modules/validation-message/validation-message.component";

@NgModule({
    imports: [CommonModule, ValidationMessageComponent],
    exports: [ValidationMessageComponent]
})

export class DevBlogSharedModule { }