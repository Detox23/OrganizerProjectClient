export const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

export const formatDate = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var toReturn = yyyy + '-' + mm + '-' + dd;
    return toReturn;
}

export const getDayName = (date) => {
    var days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
    return days[date.getDay()]
}


export const moveDate = (date, type) => {
    if(type){
        return new Date(date.getTime() + (60*60*24*1000));
    }else{
        return new Date(date.getTime() - (60*60*24*1000));
    }
}

export const formatHours = (hour) => {
    return hour[3] + ":" +(hour[4] < 10 ? "0" + hour[4].toString(): hour[4])
}