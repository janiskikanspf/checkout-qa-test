import OrderItem from '@structures/order/orderItem';
import Address from '@structures/address';
import { CURRENCY_USD } from '@helpers/currency';

export default class Order {
    /** @type {number|null} */
    id = null;

    /** @type {OrderItem[]} */
    items = [];

    /** @type {Address|null} */
    shippingAddress = null;

    /** @type {Address|null} */
    billingAddress = null;

    /** @type {number} */
    tax = 0;

    /** @type {number} */
    vat = 0;

    /** @type {number} */
    shipping = 0;

    /** @type {number} */
    discount = 0;

    /** @type {number} */
    grandTotal = 0;

    /** @type {string} */
    currency = CURRENCY_USD;

    constructor(params = {}) {
        this.id = params.id ?? null;
        this.billingAddress = params.billingAddress ? new Address(params.billingAddress) : null;
        this.shippingAddress = params.shippingAddress ? new Address(params.shippingAddress) : null;
        this.tax = params.tax ?? 0;
        this.vat = params.vat ?? 0;
        this.shipping = params.shipping ?? 0;
        this.discount = params.discount ?? 0;
        this.currency = params.currency ?? CURRENCY_USD;

        if (params.items) {
            params.items.forEach(item => this.items.push(new OrderItem(item)));
        }

        this.grandTotal = this.calculateGrandTotal();
    }

    /**
     * Returns caculated grand total
     * @return {number}
     */
    calculateGrandTotal() {
        let itemTotal = 0;

        this.items.forEach(item => {
            itemTotal += item.price * item.quantity;
        });

        return this.tax + this.vat + this.shipping + itemTotal - this.discount;
    }
}