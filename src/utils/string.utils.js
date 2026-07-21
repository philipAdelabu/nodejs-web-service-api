
// convert camel to snake
export function camelToSnake(str){
    if(str.length < 1) return ;
    return  str.replace(/[A-Z]/g, letter => `${letter.toLowerCase()}`);
}

export function snakeToCamel(str){
    if(str.length < 1) return ;
    return str.replace(/_([a=z])/g, (_, letter) => letter.toUPperCase());
}