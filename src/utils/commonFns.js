exports.cleanUpString=(str) => {

    try {
        return str.trim().replace(/\s+/g, ' ');
    } catch (error) {
        throw error;
    }

    
}