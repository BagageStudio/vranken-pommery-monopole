<template>
    <div class="wrapper-quantity">
        <div class="quantity-select" :class="{ error }">
            <button @click="substract">-</button>
            <input :value="quantity" class="quantity" type="number" min="1" @input="checkInputValue" />
            <button @click="add">+</button>
        </div>
        <div v-if="error">error mon poto</div>
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
    font-size: 3rem;
    border-left: 2px solid currentColor;
    border-right: 2px solid currentColor;
    &.error {
        .quantity {
            color: red;
        }
    }
}

.quantity {
    text-align: center;
    width: 100px;
    padding: 20px;
    border: 2px solid currentColor;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
}

button {
    color: $white;
    padding: 20px;
    border-top: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
}
</style>
