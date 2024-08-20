import { ChangeEvent, FC, useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const TransactionList = ()   => {
    const [value, setValue] = useState('');
    const [date,setDate] = useState('');
    const [seq,setSeq] = useState(1);
    const [transcations,setTransactions] = useState([]);
    const [rewardsByMonth,setRewardByMonthly] = useState([])
    const mapMonths = {"01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May","06":"Jun","07":"Jul","08":"Aug","09":"Sep","10":"Oct","11":"Nov","12":"Dec"};

 useEffect(()=>{
   
 },[seq])

    const onSubmit = ()=>{
        setSeq(count => count+1)
        let transcationValue = {
            seq:seq,
            date:getDate(),
            value:value,
            rewardPoints:getRewardPoints()
        }
        let tempTran = transcations;
        tempTran.push(transcationValue);
        setRewardByMonthly(getRewardsByMonth(tempTran));
        setTransactions(tempTran);
        
    }

   const getRewardsByMonth = (transactionItems) => {
       let list = []
       transactionItems.forEach(element => {
        const month = element?.date?.split("/")[1]
         const index = list.findIndex(item => item?.month === mapMonths[month])
         if(index === -1){
            list.push({month:mapMonths[month],rewardsTotal:element?.rewardPoints})
         }else{
            const increment = {month:mapMonths[month],rewardsTotal:list[index].rewardsTotal+element.rewardPoints}
            list[index]=increment;
         }        
       });

    return list;

   }

   const getDate = () =>{
        const selectedDate = date != '' ? date : new Date();
        const yyyy = selectedDate.getFullYear();
        let mm = selectedDate.getMonth() + 1; // Months start at 0!
        let dd = selectedDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday;
   }

   const getRewardPoints = ()=>{
     let points = 0;
     if(value != '' && value != null && typeof value === 'number' && value > 50){
        // value is grater than 50 then by default add 50 point 
        points += 50
        //value is more than 100 case
        if(value > 100){
            points += (value - 100) * 2
        } 
     } 
 
     return points;
   }
    return (
      <main>
      <div className='left-side'>
        <h1>Add Transaction</h1>
        <div className="card flex justify-content-center">

        <div className="flex flex-column gap-2 app-margin">
            <label htmlFor="Date">Select Date: </label>
            <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
        </div>
        
        <div className="flex flex-column gap-2 app-margin">
        <label htmlFor="transaction">Enter Transaction Total: </label>
        <InputNumber value={value} onValueChange={(e) => setValue(e.value)} />
        (Number Only)
        </div>

        <Button label="Submit" onClick={()=>{onSubmit()}}/>

        </div>

       {transcations.length>0 && <div className="card app-margin">
            <DataTable value={transcations} tableStyle={{ minWidth: '50rem' }}>
                <Column field="seq" header="Seq.No"></Column>
                <Column field="date" header="date"></Column>
                <Column field="value" header="value"></Column>
                <Column field="rewardPoints" header="Reward Points"></Column>
            </DataTable>
        </div>
        }
       </div>
       <div className='right-side app-margin'>
       {rewardsByMonth.length>0 && <div className="card">
            <DataTable value={rewardsByMonth} tableStyle={{ minWidth: '10rem' }}>
                <Column field="month" header="Month"></Column>
                <Column field="rewardsTotal" header="Rewards Total"></Column>
            </DataTable>
        </div>
        }

       </div>
      </main>
    );
  };
