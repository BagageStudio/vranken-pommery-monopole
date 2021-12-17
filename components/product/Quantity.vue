<template>
    <div class="wrapper-quantity">
        <div class="quantity-select" :class="{ error }">
            <button class="btn-quantity substract" @click="substract"><Icon name="minus" /></button>
            <input :value="quantity" class="quantity" type="number" min="1" @input="checkInputValue" />
            <button class="btn-quantity add" @click="add"><Icon name="plus" /></button>
        </div>
        <div v-if="error">Error</div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            quantity: this.value,
            error: false
        };
    },
    methods: {
        add() {
            this.updateQuantity(this.quantity + 1);
        },
        substract() {
            if (this.quantity > 1) {
                this.updateQuantity(this.quantity - 1);
            }
        },
        updateQuantity(quantity) {
            this.error = false;
            this.quantity = parseInt(quantity);
            this.$emit('input', this.quantity);
        },
        checkInputValue({ target }) {
            const value = parseInt(target.value);
            if (isNaN(value) || value < 1) {
                this.error = true;
            } else {
                this.updateQuantity(value);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.quantity-select {
    display: inline-flex;
    align-items: stretch;
    height: 45px;
    font-family: $plex-sans;
    font-weight: 400;
    font-size: 1.2rem;
    letter-spacing: 0.1em;
    border: 1px solid $grey-3;
    color: $grey-1;
    &.error {
        .quantity {
            color: red;
        }
    }
}

.quantity {
    text-align: center;
    width: 30px;
    padding: 0;
    background: none;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
}

.btn-quantity {
    &.substract {
        padding-left: 35px;
        padding-right: 15px;
    }
    &.add {
        padding-left: 15px;
        padding-right: 35px;
    }
    .icon {
        fill: currentColor;
        width: 18px;
        height: 18px;
    }
}
</style>
