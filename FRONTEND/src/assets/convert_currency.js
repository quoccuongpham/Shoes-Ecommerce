export default function convert_currency(price) {
    if (!price) {
        price = 0;
    }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}