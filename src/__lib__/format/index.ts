import pluralize from 'pluralize';
import { formatNumberByIntl } from "../util";

const number = {
    formalize: formatNumberByIntl,
    custom: formatNumberByIntl,
};

export function pluralizeData(...props: Parameters<typeof pluralize>): ReturnType<typeof pluralize> {
    const [word, count, inclusive = true] = [...props];

    if (typeof count !== 'number' || typeof word !== 'string') return '';
    if (count === 0) {
        const singularWord = pluralize.singular(word);

        return inclusive ? `${count} ${singularWord}` : singularWord;
    }

    const pluralizedUnit = pluralize(word, count);
    const result = inclusive
        ? `${number.formalize(count)} ${pluralizedUnit}`
        : pluralizedUnit;

    return result;
}
