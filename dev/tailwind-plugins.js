const plugin = require('tailwindcss/plugin');

module.exports = plugin.withOptions(
    /**
     * Utilizes Tailwinds 'group' & 'peer' utility gen technique 
     * 
     * @url https://github.com/tailwindlabs/tailwindcss/blob/ea80db213a61f8857f0a9872fad910ad4ee36d40/src/corePlugins.js#L143
     */
    ({ groupVariants = [] } = {}) => {
        return function ({ addVariant }) {
            let pseudoVariants = groupVariants.map((variant) => (Array.isArray(variant) ? variant : [variant, `:${ variant }`]));

            for (let [variantName, state] of pseudoVariants) {
                addVariant(`group-${ variantName }`, `.group${ state } &.group-${ variantName }`);

                // addVariant(`group-${ variantName }`, () => {
                //     // return `:merge(.group)${ state } &`;

                //     return `.group${ state } &.group-${ variantName }`;
                // });
            }
        }
    }
)