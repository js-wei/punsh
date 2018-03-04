<template>
    <div class="feedback">
        <v-head :title="title" :isSlotRight="isSlotRight">
            <div slot="header-right">
                <button type="button" class="upload" @click="submit">提交</button>
            </div>
        </v-head>
        <div class="feedback-content">
            <textarea id="content" placeholder="必填,详细反馈" v-model="content"></textarea>
            <input type="text" placeholder="联系方式:QQ或者电话" v-model="phone">
            <div class="feedback-photo" @click="changeImage">
                <div class="upload" v-show="!loaded">
                    <i class="fa fa-2x fa-camera"></i>
                    上传图片
                </div>
                <img src="static/images/logo.png" alt="" id="upload" v-show="loaded">
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
   @import "../assets/style/base";
    .feedback-content{
        text-align:center;
        textarea,input{
            width:95vw;
            font-size:1.5rem;
            color:lighten(nth($baseColor,2),60%);
            &::placeholder{
                font-size:1.2rem;
            }
        }
        textarea{
            margin-top:1.2rem;
            height:120px;
        }
        .feedback-photo{
            width:25vw;
            height:auto;
            background-color:lighten(nth($baseColor,2),60%);
            padding:6px 0;
            margin-left:12px;
            color:nth($baseColor,1);
            text-align:center;
            i{
                display:block;
            }
            img{
                width:25vw;
            }
        }
    }
</style>
<script>
    import vHead from '@/components/header.vue'

    export default {
        data(){
            return{
                title:'意见反馈',
                isSlotRight:true,
                loaded:false,
                image:'',
                content:'',
                phone:''
            }
        },
        components:{
            vHead
        },
        methods:{
            submit(){
                mui.alert(this.content);
                mui.alert(this.image);
            },
            changeImage(){
                let self = this;
                mui.plusReady(function () {
                    plus.nativeUI.actionSheet({
                        title: "修改用户头像",
                        cancel: "取消",
                        buttons: [{
                            title: "拍照"
                        }, {
                            title: "从手机相册选择"
                        }]
                    }, function(b) {
                        switch (b.index) {
                            case 0:
                                break;
                            case 1:
                                self.getImage();
                                break;
                            case 2:
                                self.galleryImg();
                                break;
                            default:
                                break;
                        }
                    });
                });
            },
            getImage() {
                let c = plus.camera.getCamera(),
                    self= this;
                c.captureImage(function(e) {
                    plus.io.resolveLocalFileSystemURL(e, function(entry) {
                        let path = entry.toLocalURL();
                        plus.zip.compressImage({
                            src: path,
                            dst: "_doc/" + path,
                            overwrite: true,
                            quality: 50
                        }, function(e) {
                            document.querySelector('#upload').src = self.image =  e.target ;
                            self.loaded=true;
                            /*
                            let server = "http://www.test.cn/aaa.php";
                            let wt=plus.nativeUI.showWaiting();
                            let task = plus.uploader.createUpload(server, {
                                method: "post"
                            }, function(t, status) {
                                if(status == 200) {
                                    alert("上传成功："+t.responseText);
                                    wt.close(); //关闭等待提示按钮
                                }else{
                                    alert("上传失败："+status);
                                    wt.close();//关闭等待提示按钮
                                }
                            });
                            task.addFile(e.target, {});
                            task.start();
                           */
                        }, function(err) {
                            mui.alert("压缩失败：" + err.message);
                        });
                    }, function(e) {
                        console.log("读取拍照文件错误：" + e.message);
                    });
                }, function(s) {
                    console.log("error" + s);
                }, {
                    filename: "_doc/head.png"
                });
            },
            galleryImg() {
                let self= this;
                plus.gallery.pick(function(path) {
                    //path = path+ "?version=" + new Date().getTime();
                    plus.zip.compressImage({
                        src: path,
                        dst: "_doc/" + path,
                        overwrite: true,
                        quality: 50
                    }, function(e) {
                        document.querySelector('#upload').src = self.image =  e.target ;
                        self.loaded=true;
                        /*
                        let server = "http://www.test.cn/aaa.php";
                        let wt=plus.nativeUI.showWaiting();
                        let task = plus.uploader.createUpload(server, {
                            method: "post"
                        }, function(t, status) {
                            if(status == 200) {
                                alert("上传成功："+t.responseText);
                                wt.close(); //关闭等待提示按钮
                            }else{
                                alert("上传失败："+status);
                                wt.close();//关闭等待提示按钮
                            }
                        });
                        task.addFile(e.target, {});
                        task.start();
                       */
                    }, function(err) {
                        mui.alert("压缩失败：" + err.message);
                    });
                }, function(a) {}, {
                    filter: "image"
                });
            },
        },
        mounted(){
            const gallery = document.querySelector('.feedback'),
                header = document.querySelector('header');
            if (header && gallery) {
                gallery.style.marginTop = header.clientHeight + "px";
            }
        }
    }
</script>