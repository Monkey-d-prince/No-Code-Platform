export const validateInput = (input: string): boolean => {
    return input.trim().length > 0;
};

export const formatAddress = (address: string): string => {
    return address.toLowerCase();
};

export const parseJson = (jsonString: string): any => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Invalid JSON string:", error);
        return null;
    }
};