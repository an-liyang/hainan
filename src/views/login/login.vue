<template>
    <div class="login-bg" :style="{ backgroundImage: 'url(' + bgLogin + ')',height:flagheight?'100%':'' }">
        <header class="titles">海南省人口动态分析预测预警平台</header>
        <div class="login">
            <div class="msg-wrapper">
                <div class="msg-error" v-show="msgError || timeout">
                    <i class="el-icon-remove"></i>
                    <span v-if="msgError">{{
                        msgErrorContent || this.$t("text.loginFail")
                    }}</span>
                    <span v-else-if="timeout">{{
                        this.$t("text.reqOvertime")
                    }}</span>
                </div>
            </div>
            <div class="login-content">
                <template>
                    <el-form
                        ref="loginForm"
                        :model="loginForm"
                        :rules="rules"
                        class="login-form"
                    >
                        <el-form-item   prop="account">
                            <el-input
                                v-model="loginForm.account"
                                :placeholder="$t('inputText.user')"
                            >
                            <i slot="prefix" class="el-input__icon">
                                <img src="../../../static/image/login/user.png" alt="">
                            </i>
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            
                            prop="password"
                        >
                            <el-input
                                v-model="loginForm.password"
                                :placeholder="$t('inputText.password')"
                                type="password"
                            >
                            <i slot="prefix" class="el-input__icon">
                                <img src="../../../static/image/login/lock.png" alt="">
                            </i>
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            prop="checkCode"
                        >
                            <div style="width: 100%;display: flex;">
                                <el-input
                                    v-model="loginForm.checkCode"
                                    style="margin-right: 20px;"
                                    :placeholder="
                                        $t('inputText.verificationCode')
                                    "
                                    @keyup.enter.native="submit('loginForm')"
                                >
                                <i slot="prefix" class="el-input__icon">
                                <img src="../../../static/image/login/safe.png" alt="">
                                </i>
                                </el-input>
                                <span class="codeUrlImg">
                                    <img
                                        style="width: 100%;height: 100%"
                                        :src="codeUrl"
                                        alt
                                        @click="changeCode()"
                                    />
                                </span>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </div>
            <div>
                <el-button
                    @click="submit('loginForm')"
                    type="primary"
                    class="login-submit"
                    :loading="logining"
                    >{{ this.$t("login.login") }}</el-button
                >
            </div>
        </div>
        <!-- <footer style="height:80px"></footer> -->
    </div>
</template>
<script>
import axios from 'axios'
import {config} from '@/util/data'
import url from '@/util/url'
// import router from "@/router";
import bg from '@/../static/image/banner.png'
// import logo from '@/../static/image/logo2.png'
import {delCookie} from '@/util/util'
import md5 from 'js-md5'
import {findAuthByUserId} from '@/util/data'
import {getMenuFuc, router} from '@/router'
import {routers} from '@/router/routers'
export default {
    name: 'login',
    components: {
        
    },
    data: function() {
        return {
            imgpath: '',
            bgLogin: bg,
            logoPng: '',
            logining: false,
            msgError: false,
            msgErrorContent: '',
            timeout: false,
            codeUrl: url.codeUrl,
            loginForm: {
                account: '',
                password: '',
                checkCode: ''
            },
            pictureToken: null,
            
        }
    },
    computed: {
        rules() {
            var obj = {
                account: [
                    {
                        required: true,
                        message: this.$t('inputText.user'),
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t('inputText.password'),
                        trigger: 'blur'
                    }
                ],
                checkCode: [
                    {
                        required: true,
                        message: this.$t('inputText.verificationCode'),
                        trigger: 'blur'
                    }
                ]
            }
            return obj
        },
        flagheight() {
            return this.$store.state.heightClient>730?true:false
        }
    },
    mounted: function() {
        
        this.changeCode()
    },
    methods: {
        
        submit: function(formName) {
            this.msgErrorContent = ''
            this.msgError = false
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.logining = true
                    this.userLogin()
                } else {
                    return false
                }
            })
        },
        changeCode: function() {
            this.codeUrl = ''
            this.pictureToken = ''
            // console.log(window.location.host)
            axios({
                // url: 'http://192.168.1.151:20000/platform/pictureCode',
                url: '/platform/pictureCode',

                data: {},
                method: 'GET'
            })
                .then(res => {
                    if (res.data.code === 200) {
                        this.codeUrl = `data:image/png;base64,${res.data.data.base64Image}`
                        this.pictureToken = res.data.data.token
                    } else {
                        this.codeUrl = ''
                        this.pictureToken = ''
                        this.$message({
                            message: this.$chooseLang(res.data.code),
                            type: 'error',
                            duration: 2000
                        })
                    }
                })
                .catch(err => {
                    this.codeUrl = ''
                    this.pictureToken = ''
                    this.$message({
                        message: '系统错误或连接超时',
                        type: 'error',
                        duration: 2000
                    })
                })
        },
        userLogin: function(callback) {
            var _this = this
            setTimeout(function() {
                _this.$router.push('/hostManage')
            }, 1000)
            return 
            // delCookie("JSESSIONID");
            // delCookie("NODE_MGR_ACCOUNT_C");
            let reqData = Object.assign({}, this.loginForm)
            reqData.password = md5(reqData.password)
            // axios.defaults.headers.common["token"] = this.pictureToken;
            axios({
                // url: 'http://192.168.1.151:20000/platform/login',
                url: '/platform/login',
                data: reqData,
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json;charset=UTF-8',
                    token: this.pictureToken
                }
            })
                .then(res => {
                    if (res.data.code === 200 && !!res.data.data) {
                        // localStorage.setItem('baasuser', res.data.data.account)
                        localStorage.setItem('userId', res.data.data.userId)
                        localStorage.setItem('token', res.data.data.token)
                        config().then(res => {
                            if (res.data.code == 200) {
                                localStorage.setItem(
                                    'config',
                                    JSON.stringify(res.data.data)
                                )
                            }
                        })

                        findAuthByUserId().then(req => {
                            // console.log(req)
                            if (req.data.code == 200 && !!req.data) {
                                var menuTree = req.data.data
                                // let buttonList = res.data.data.buttonList  //存储按钮的权限控制
                                // localStorage.setItem("buttonList",JSON.stringify(buttonList))
                                localStorage.setItem(
                                    'menuTree',
                                    JSON.stringify(menuTree)
                                )

                                var list = getMenuFuc(menuTree)
                                //  return ''
                                this.$router.options.routes = routers.router.concat(
                                    list
                                )
                                this.$router.addRoutes(list)
                                var _this = this
                                setTimeout(function() {
                                    _this.$router.push('/hostManage')
                                }, 1000)
                            } else {
                                this.msgErrorContent = req.data.message
                                this.msgError = true
                            }
                            this.logining = false
                        })
                    } else {
                        this.changeCode()
                        this.msgErrorContent = res.data.message
                        this.msgError = true
                        this.loginForm.password = ''
                        this.logining = false
                    }
                })
                .catch(err => {
                    this.changeCode()
                    this.timeout = true
                    this.loginForm.password = ''
                    this.logining = false
                })
        },
        
    }
}
</script>
<style>
.titles{
    padding-top: 100px;
    font-size: 48px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
}
.login-label.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: "" !important;
}
/* 重置element */
.login-content .el-input--medium .el-input__inner{
    height: 48px;
    line-height: 48px;
}
.login-content .el-form-item{
    margin-bottom: 30px;
}
.login-content .el-input__icon img{
    width: 18px;
    vertical-align: middle;
}
.login-content .el-input__prefix{
    left: 15px;
}
.login-content .el-input--prefix .el-input__inner{
    padding-left: 46px;
    font-size: 18px;
}
.login-bg {
    position: relative;
    width: 100%;
   /* height: 100%; */
    background-repeat: no-repeat;
    background-size: cover;
}

.login {
    width: 750px;
    height: 465px;
    padding: 70px 100px ;
    margin: 0 auto ;
    margin-top: 95px;
    background-image: url('../../../static/image/login/bg.png');
    background-position: -584px -354px;
    background-repeat: no-repeat;
    /* background-size: cover; */
    text-align: center;

}

.login-logo {
    display: inline-block;
    width: 142px;
    /*height: 142px;*/
    font-size: 60px;
    margin-top: 30px;
}

.logo-content {
    
    text-align: center;
    font-size: 12px;
    color: #979faa;
    letter-spacing: 0.02px;
}

.msg-wrapper {
    min-height: 20px;
    height: auto;
    /* margin: 5px 0; */
}

.msg-error {
    color: #e4393c;
}

.codeUrlImg {
    display: inline-block;
    height: 48px;
    width: 140px;
    line-height: 38px;
    /* padding-left: 16px; */
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    vertical-align: middle;
    cursor: pointer;
    text-align: center;
    /* background-color: #e4393c */
}

.logo {
    width: 120px;
    padding-top: 80px;
}

.login-title {
    padding: 16px 0 0px 0;
    font-size: 20px;
    color: #2e2e2e;
    letter-spacing: 0.04px;
}

.login-label {
    position: relative;
    padding: 0 60px;
}

.login-label input {
    height: 54px;
    padding-left: 60px;
}

.login-content {
     width: 480px;
     margin: 0 auto; 
  }
.login-submit {
    width: 480px;
    height: 48px;
    margin-top: 10px;
    font-size: 20px;
    font-family: Source Han Sans;
    background-color: #0079F8;
    border-color: #0079F8;
}
.login-submit:focus, .login-submit:hover {
    background:#0084F8;
    border-color:#0084F8;
}

.icon {
    width: 142px;
    height: 142px;
    /* vertical-align: -0.15em; */
    fill: currentColor;
    overflow: hidden;
}

.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: "";
}

.login-form .el-form-item__label {
    display: block;
    line-height: 32px;
    float: none;
    text-align: left;
}

.login-lang {
    position: absolute;
    right: 10px;
    top: 20px;
    min-width: 160px;
}

.login-encrypt {
    position: absolute;
    right: 10px;
    top: 60px;
    min-width: 160px;
}

.login-encrypt .el-radio-button__inner {
    display: inline-block;
    width: 80px;
}
</style>
