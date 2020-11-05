function timeStamp(){
    let date = new Date;
    let ts = date.getTime();

    if (__DEV__){
        return ts;
    }
}

export default timeStamp;