import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms'
import { Http, Response } from '@angular/http'

@Component({
    selector: 'signinout',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class SignInOut {
    err: boolean = false
    stateText: string
    http: Http
    myform_0: FormGroup
    myform_1: FormGroup

    form_0_name: AbstractControl
    form_0_pwd: AbstractControl

    form_1_name: AbstractControl
    form_1_pwd: AbstractControl
    form_1_validator: AbstractControl

    constructor(fb: FormBuilder, http: Http) {
        this.http = http

        this.myform_0 = fb.group({
            'name': ['', Validators.required],
            'pwd': ['', Validators.required]
        })

        this.myform_1 = fb.group({
            'name': ['', Validators.required],
            'pwd': ['', Validators.required],
            'validator': ['', Validators.required]
        })

        this.form_0_name = this.myform_0.controls['name']
        this.form_0_pwd = this.myform_0.controls['pwd']

        this.form_1_name = this.myform_1.controls['name']
        this.form_1_pwd = this.myform_1.controls['pwd']
        this.form_1_validator = this.myform_1.controls['validator']
    }

    onSubmit_0 = (value): void => {
        // should check for something
        if(!this.myform_0.valid) {
            this.stateText = '请完善表格！'
            return
        }
        this.http.post('/signin/login', this.myform_0.value).subscribe((res: Response) => {
            switch(res.status) {
                case 404:
                    this.stateText = '网络错误，请检查你的网络！'
                case 500:
                    this.stateText = '抱歉，服务器繁忙！请重试！'
                case 200:
                    this.stateText = '登录成功！'
                case 606:
                    this.stateText = '账号和密码错误！'
            }
        })
    }

    onSubmit_1 = (value): void => {
        // should check for something
        if(!this.myform_1.valid) {
            this.stateText = '请完善表格！'
            return
        }
        this.http.post('/signin/register', this.myform_1.value).subscribe((res: Response) => {
            switch(res.status) {
                case 404:
                    this.stateText = '网络错误，请检查你的网络！'
                case 500:
                    this.stateText = '抱歉，服务器繁忙！请重试！'
                case 200:
                    this.stateText = '注册成功！'
            }
        })
    }

}