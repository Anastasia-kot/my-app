
import React, { useState } from 'react';
import styles from './Paginator.module.css';


type Props = {
    totalCount: number;
    count: number;
    currentPage: number;
    setNewCurrentPage: (p: number, count: number) => void;
}

const Paginator:React.FC<Props> = React.memo((props) => {

    let pagesCount = Math.ceil(props.totalCount / props.count);

    let [portionNumber, setPortionNumber] = useState(5);

    let leftPortionNumber = (portionNumber - 1) * props.count + 1;
    let rightPortionNumber = portionNumber  * props.count; 

    let pages:Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i) 
    }


return (<div className={styles.Paginator}>

{
        (portionNumber > 1) && <span onClick={() => setPortionNumber(portionNumber - 1)}> {'<'} </span>
    
}
<> {pages.filter(p => 
    ((p >= leftPortionNumber) && (p <= rightPortionNumber)) 
                    ).map(p =>  {return (
        <span key={p}
            className={(p === props.currentPage) ? styles.selected : ''}
            onClick={() => props.setNewCurrentPage(p, props.count)}> {p} 
        </span>
                    )})
} </>         
{
    (portionNumber < pagesCount) && <span onClick={()=> setPortionNumber(portionNumber+1)}> {'>'} </span>
    
}

</div>)

})


export default Paginator;