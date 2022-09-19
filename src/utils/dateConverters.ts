 
export const dateConverter = (date: string): string => {

    let day = (+   date.split('-')[2].split('T')[0]        )      %100;

    let month = date.split('-')[1];
    switch (month) {
        case '01': month = 'января'; break;
        case '02': month = 'февраля'; break;
        case '03': month = 'марта'; break;
        case '04': month = 'апреля'; break;
        case '05': month = 'мая'; break;
        case '06': month = 'июня'; break;
        case '07': month = 'июля'; break;
        case '08': month = 'августа'; break;
        case '09': month = 'сентября'; break;
        case '10': month = 'октября'; break;
        case '11': month = 'ноября'; break;
        case '12': month = 'декабря'; break;
        default: break;
    };
    let year = date.split('-')[0];

    let newDate = day + ' ' + month + ' ' + year;
    return newDate;
}
  
