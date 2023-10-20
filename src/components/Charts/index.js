import React from "react";
import "./style.css";
import {Line, Pie} from "@ant-design/charts";

function Charts({sortedTransactions}){
    const data =sortedTransactions.map((item)=>{
      return {date:item.date,amount:item.amount};
    });

    let  spendingdata=sortedTransactions.filter((transaction)=>{
        if(transaction.type =="expense"){
        return { tag:transaction.tag, amount:transaction.amount}
      }}
    );  

      let finalSpendings=spendingdata.reduce((acc,obj)=>{
        let key=obj.tag;
        if(!acc[key]){
          acc[key]={tag:obj.tag,amount:obj.amount};
        }
        else{
          acc[key].amount+=obj.amount;
        }
        return acc;
      },{}); 

      let newSpending=[
        {tag:"Food",amount:0},
        {tag:"Health",amount:0},
        {tag:"Shopping",amount:0},
      ];
    
      spendingdata.forEach((item) => {
        if(item.tag=="Food"){
          newSpending[0].amount +=item.amount;
        }
         else if(item.tag=="Health"){
          newSpending[1].amount +=item.amount
        }
        else{
          newSpending[2].amount +=item.amount;
        }
      });

   
    
      const config = {
        data: data,
         width: 800,
         height: 400,
         autoFit: true ,
         xField: 'date',
         yField: 'amount',
       };

      const spendingconfig= {
        data:newSpending,
        width: 500,
       angleField:"amount",
       colorField:"tag",
      };
      let chart;
      let pieChart;
  return (
    <div className="charts-wrapper">
      <div>
        <h2 style={{marginTop:0}}>Line Chart</h2>
        <Line
        
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div>
        <h2 style={{marginTop:0}}>Your Spendings</h2>
        <Pie
        {...spendingconfig}
        onReady={(chartInstance) => (pieChart = chartInstance)} 
        />
      </div>
    </div>
    )
}

export default Charts;