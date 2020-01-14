<template>
    <div class="from-query">
        <div class="form-left">
            <slot>

            </slot>
        </div>
        <div class="right">
            <slot name="btnList"></slot>
        </div>
    </div>
</template>
<style lang="scss">
.from-query{
    display: flex;
    flex-direction: row;
    .form-left{
        flex: 1;
        overflow: hidden;
    }
    .form-rigth{

    }
}
</style>