/** @namespace utils */

const TAG = 'ModuleLoader';

/**
 * Make instance of class based on JSON
 * @memberof utils
 */
class ModuleLoader {
    /**
     * @private
     */
     constructor() {}

    /**
     * <p>Initialize modules</p>
     *
     * <p>
     * `modulesConfig` must have structure like
     * <pre>
     * <code>
     * {
     *  ModuleID: {
     *      class: 'path/to/class',
     *      init: true|false
     *  },
     *  NextModuleID: {
     *      class: 'path/to/next/class',
     *      init: true|false
     *  }
     * }
     * </code>
     * </pre>
     * </p>
     *
     * @param modulesConfig {Object} - Array of module configs
     * @param simulation {boolean} - Use simulation suffix
     * @returns {Object} - Returns associative array of instantiated modules
     */
    static load(modulesConfig, simulation) {
        var modules = {};
        var simulationSuffix = (simulation === true) ? 'Simulator' : '';

        for (let moduleName in modulesConfig) {
            if (modulesConfig.hasOwnProperty(moduleName) == false) {
                continue;
            }

            let moduleConfig = modulesConfig[moduleName];
            let init = moduleConfig.init;

            // Do not initialize if `init field == false`
            if (init != false) {
                let DriverClass = Mep.require(moduleConfig.class + simulationSuffix);
                modules[moduleName] = new DriverClass();

                Mep.Log.debug(TAG, 'Module loaded', moduleName);
            }
        }
        return modules;
    }
}

module.exports = ModuleLoader;