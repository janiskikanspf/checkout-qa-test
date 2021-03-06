<template>
    <div>
        <div class="font-bold">Delivery method</div>

        <div class="flex flex-col">
            <label
                v-for="deliveryMethod in deliveryMethods"
                :key="deliveryMethod.id"
                class="inline-flex items-center mt-3"
            >
                <input
                    type="radio"
                    name="delivery-method"
                    v-model="selectedMethod"
                    :value="deliveryMethod.id"
                    class="form-radio h-5 w-5 text-gray-600"
                />
                <span class="ml-2 text-gray-700">
                    {{ deliveryMethod.name }} ({{ '+' + getMethodPrice(deliveryMethod) }})
                </span>
            </label>
        </div>
    </div>
</template>

<script>
import Order from '@structures/order/order';
import { getDeliveryOptions } from '@services/orderReviewService';
import { getFormattedAmount } from '@helpers/currency';
import { isTestMode } from '@config/testConfig';

export default {
    name: 'DeliveryMethodSelector',

    props: {
        order: {
            type: Order,
            required: true,
        },
    },

    data() {
        return {
            deliveryMethods: [],
            selectedMethod: null,
        };
    },

    watch: {
        /**
         * @param {string} newSelectedMethod
         */
        selectedMethod(newSelectedMethod) {
            const selectedMethod = this.deliveryMethods.filter(method => {
                return method.id === newSelectedMethod;
            });

            if (selectedMethod[0]) {
                this.onDeliveryMethodChange(selectedMethod[0]);
            }
        },

        'order.id'() {
            this.selectedMethod = null;
            this.setInitialSelectedMethod();
        },
    },

    mounted() {
        this.deliveryMethods = getDeliveryOptions();
        this.setInitialSelectedMethod();
    },

    methods: {
        /**
         * @param {DeliveryMethod} deliveryMethod
         * @return {string}
         */
        getMethodPrice(deliveryMethod) {
            let price = deliveryMethod.price;

            if (isTestMode && deliveryMethod.showIncorrectPrice) {
                price += 0.2;
            }

            return this.getAmount(price);
        },

        /**
         * @param {number} amount
         * @return {string}
         */
        getAmount(amount) {
            return getFormattedAmount(amount, this.order.currency);
        },

        setInitialSelectedMethod() {
            this.selectedMethod = this.deliveryMethods[0].id;
        },

        /**
         * @param {DeliveryMethod}
         */
        onDeliveryMethodChange(selectedMethod) {
            this.$emit('on-delivery-method-change', selectedMethod);
        },
    },
};
</script>
