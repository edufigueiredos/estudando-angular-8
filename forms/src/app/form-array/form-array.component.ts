import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'app-form-array',
    templateUrl: './form-array.component.html',
    styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

    clientForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        address: this.formBuilder.group({
            street: [''],
            city: [''],
            state: [''],
        }),
        phones: this.formBuilder.array(['']),
        children: this.formBuilder.array([])
    });

    phones = this.clientForm.get('phones') as FormArray;
    children = this.clientForm.get('children') as FormArray;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
    }

    submit() {
        console.log(this.clientForm.value);
    }

    addPhone() {
        this.phones.push(this.formBuilder.control(''));
    }

    addChild() {
        this.children.push(
            this.formBuilder.group({
                name: [''],
                age: ['']
            })
        );
    }

}
