'use strict';

module.exports = () => {
    return {
        getFields: (config, Sequelize) => {
            let result = {};
            for (let field in config.fields) {
                if (config.fields.hasOwnProperty(field)) {
                    result[field] = {
                        type: Sequelize[config.fields[field].type]
                    }
                }
            }
            return result;
        },

        /**
         * return random milliseconds from min to max
         * if min is 3 will be return number from 3000
         * @param min {int}
         * @param max {int}
         * @returns {number}
         */
        getTimeout: (min, max) => {
            const rand = min + Math.random() * (max + 3 - min);
            const timeout = Math.floor(rand) * 1000;
            console.log(`Wait for timeout: ${timeout}ms`);
            return timeout;
        }
    };
};
