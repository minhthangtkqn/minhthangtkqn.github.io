export const formatNumberByIntl = (
    value?: number | string | null,
    fallback = value,
    locale: string | string[] | undefined = 'en-US',
    option?: Intl.NumberFormatOptions,
) => {
    try {
        const normalizedValue = typeof value === 'number' || typeof value === 'bigint'
            ? value
            : typeof value === 'string'
                ? parseInt(value)
                : undefined;
        if (normalizedValue === undefined || isNaN(normalizedValue)) return fallback;

        return new Intl.NumberFormat(locale, option).format(normalizedValue);
    } catch (e) {
        return fallback;
    }
};