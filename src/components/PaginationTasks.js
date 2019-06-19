import React from 'react'

const PaginationTasks = ({...props}) =>{


    function PageItem(total_task_count){
        return Math.ceil(parseInt(total_task_count)/3 )
    }

    function ItemPage (total_task_count){
        let numberAr = [];
        for (let i = 1; i <= PageItem(total_task_count); i++) {
            if (i == props.pageNumber) {
                numberAr.push(<option selected={true} key = {i}>{i}</option>);
            }
            else { numberAr.push(<option key = {i}>{i}</option>);}
        }
         return numberAr
    }
    let pageCount = ItemPage(props.totalTask);

    let selectPage = (e) =>{
        props.getTasks(e.currentTarget.value);
    }



    return(
        <div className={'pagination'}>
            page navigation
            <select onChange={(e)=>{selectPage(e)}}>
                {pageCount}
            </select>
        </div>
    )
}

export default PaginationTasks;