const fs = require('fs/promises');

/**
 * Helper for creating error messages so they remain consistent.
 *
 * @param {string} functionName the name of the function which created the error
 * @param {string} error the error message
 * @returns a string which represents an error
 */
const createError = (functionName, error) => {
    return `helper::${functionName} - ${error}`;
};

/**
 * Helper for determining if a file can be read (that is, the file exists AND is readable).
 *
 * @param {string} path the path to check
 * @returns a boolean value indicating if the specified file exists and can be read
 */
const canReadFileAsync = async (path) => {
    try {
        await fs.access(path, fs.constants.R_OK); // R_OK checks for read permissions
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(createError("canReadFile", `${path} does not exist.`));
        } else if (err.code === 'EACCES') {
            console.log(createError("canReadFile", `${path} exists but is not readable.`));
        } else {
            console.error(createError("canReadFile", `An unexpected error occurred: ${err.message}`));
        }
        return false;
      }
};

// Export the modules
module.exports = {
    canReadFileAsync,
};
