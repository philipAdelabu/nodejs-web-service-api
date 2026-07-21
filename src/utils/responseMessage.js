

export  function sendSuccess(res, data = null, message='Success', statusCode = 200){

    const response = {
        success: true,
        message, 
        timestamp: new Date().toISOString(),
    }

    if(data !== null){
        response.data = data;
    }
   
   return res.status(statusCode).json(response);
};


export function sendError(res, message = 'Error', statusCode = 500, errors = null){
    const response = {
        success: false,
        message, 
        timestamp: new Date().toISOString(),
    }
    if(errors){
        response.errors = errors;
    }
    return res.status(statusCode).json(response);
}; 