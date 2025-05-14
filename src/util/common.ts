export function mergeClass(...args: (boolean | string | undefined | null)[]) {
    return args.filter(Boolean).join(' ');
}

export const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
