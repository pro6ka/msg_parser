'use strict';

module.exports = {
    name: 'category',
    fields: {
        is_root: {
            type: 'BOOLEAN',
            selector: '#menu-left .main-navigation-left > li'
        },
        image: {
            type: 'STRING',
            selector: '#menu-main-categories li[data-category-id="24"]'
        }
    }
};
