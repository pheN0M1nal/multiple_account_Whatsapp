export const getServerAPIErrorMessage = (err) => {
    if (err === null) {
        return "An unknown error was encountered, please try again and if the issue persists, contact the support."
    } else if (err.response?.data?.message && err.response.status !== 500) {
        return err.response.data.message
    }
    let message;
    if (err.response?.data && err.response.status === 400) {
        if (err.response.data?.message) {
            message = err.response.data.message
        } else {
            let fieldName = Object.keys(err.response?.data)[0]
            message = fieldName + " : " + (err.response?.data)[fieldName].join(", ")
        }
    } else if (err.response && err.response.status === 406) {
        message = "An error was encountered during the process of initiating this operation, please check for possible issues and try again. Contact support if the issue persists."
    } else if (err.response && err.response.status === 401) {
        message = "Login details are incorrect. Please, try again."
    } else if (err.response && err.response.status === 500) {
        message = "An error was encountered on the server, please try again and if the issue persists, contact the support."
    } else if (err.request) {
        message = "An error was encountered during the process of initiating this operation, please check your network or other possible issues and try again. Contact support if the issue persists."
    } else {
        message = "An unknown error was encountered, please try again and if the issue persists, contact the support."
    }
    return message
}


export const getExternalAPIErrorMessage = (err) => {
    let message;
    if (err.response) {
        message = "A error was encountered on the server, please try again and if the issue persists, contact the support."
    } else if (err.request) {
        message = "An error was encountered during the process of initiating this operation, please check your network or other possible issues and try again. Contact support if the issue persists."
    } else {
        message = "An unknown error was encountered, please try again and if the issue persists, contact the support."
    }
    return message
}


export const getAPISuccessMessage = (responseData) => {
    if (responseData?.message) {
        return responseData.message
    } else {
        return "Operation successful"
    }
}

