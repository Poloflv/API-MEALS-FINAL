export const extractValidationData = ( results ) => {

    let errorMessages;
    let data;
    const hasError = !results.success;

    if(hasError) errorMessages = JSON.parse(results.error.message);
    if(!hasError) data = results.data

    return {
        hasError,
        errorMessages,
        data
    }
}