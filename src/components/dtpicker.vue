<template>
    <div class="dtpicker" :data-options="date_format">
        <slot name="dtpicker">
            日期选择
        </slot>
        <input type="hidden" name="date" id="date">
    </div>
</template>
<style lang="scss" scoped>
   @import "static/style/base";
</style>
<script>
    import '../../../static/javascript/mui.picker.min.js';

    export default {
        data(){
            return{
                
            }
        },
        props:{
            date_format:{
                type:String,
                default:'{"type":"date","beginYear":1918,"endYear":2245}'
            }
        },
        metheds:{
          callback(){
            bus.$emit("dtpicker",this.date);
          }
        },
        mounted(){
            let btn = document.querySelector('.dtpicker');
            btn.addEventListener('tap',(e)=>{
                let optionsJson = btn.getAttribute('data-options') || '{}',
                    options = JSON.parse(optionsJson);
                let picker = new mui.DtPicker(options);
                picker.show(function(rs) {
                    document.querySelector('#date').value=rs.value;
                    picker.dispose();
                });
            },false);
        }
    }
</script>
