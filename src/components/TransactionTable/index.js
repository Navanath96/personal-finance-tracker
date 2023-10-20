import {Radio,Select, Table, message } from "antd";
import React, { useState } from "react";
import svgimg from "../../assets/search-svgrepo-com.svg"
import { unparse } from "papaparse";
import { toast } from "react-toastify";
import {parse} from "papaparse";
// 

function TransactionTable({Transaction,addTransaction,fetchTransactions}){
    const { Option } = Select;
    const [search,setSearch]=useState("");
    const [typeFilter,setTypeFilter]=useState("");
    const [sortKey,setSortKey]=useState("");
    const column=[
        {
            title:"Name",
            dataIndex:"name",
            key:"name",
        },
        {
            title:"Amount",
            dataIndex:"amount",
            key:"amount",
        },
        {
            title:"Tag",
            dataIndex:"tag",
            key:"tag", 
        },
        {
            title:"Type",
            dataIndex:"type",
            key:"type", 
        },
        {
            title:"Date",
            dataIndex:"date",
            key:"date", 
        },
    ]
    let filteredTransactions=Transaction.filter((item)=>(
        item.name.toLowerCase().includes(search.toLowerCase()) 
        && item.type.includes(typeFilter)
        ));
    // console.log("transaction",Transaction);

    let sortedTransaction =filteredTransactions.sort((a,b)=>{
        if(sortKey==="date"){
            return new Date(a.date)-new Date(b.date);
        }else if(sortKey==="amount"){
            return a.amount-b.amount;
        }
        else{
            return 0;
        }
    })
    function exportToCsv(){
        var csv=unparse({
            fields:["name","type","tag","date", "amount"],
            data:Transaction,
        })
        var data = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var csvURL = window.URL.createObjectURL(data);
        const Link = document.createElement('a');
        Link.href = csvURL;
         Link.setAttribute('download', 'transactions.csv');
        document.body.appendChild(Link);
        Link.click();
        document.body.removeChild(Link);
    }
    function importFromCsv(event){
        event.preventDefault();
        try {
            parse(event.target.files[0], {
                header: true,
                complete: async function (results) {
                    for (const transaction of results.data) {
                        console.log("Transaction", transaction);
                        const newTransaction = {
                            ...transaction,
                            amount: parseInt(transaction.amount),
                        };
                        await addTransaction(newTransaction, true);
                    }
                },
            })
            toast.success("All Transactions Added");
            fetchTransactions();
            event.target.files = null;
        } catch (e) {
            toast.error(e, message);
        }
    }
    
    return (
        <div style={{
            width:"97%",
            padding:"0rem 2rem",
        }}>
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            gap:"1rem",
            alignItems:"center",
            marginBottom:"1rem",
        }}>
        <div className="input-flex">
            <img src={svgimg} width="16"/>
       
        <input  value={search}
        onChange={(e)=> setSearch(e.target.value)}/>
         </div>
        <Select
        className="select-input"
        onChange={(value)=> setTypeFilter(value)}
        value={typeFilter}
        placeholder="Filter"
        allowClear
        >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
        </Select>
        </div>
        <div className="my-Table"
        style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            width:"100%",
            marginBottom:"1rem"
        }}>      
        <h2>My Transactions</h2> 
        <Radio.Group
        className="input-radio"
        onChange={(e)=>setSortKey(e.target.value)}
        value={sortKey}
        >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort By Date</Radio.Button>
            <Radio.Button value="amount">Sort Amount</Radio.Button>
        </Radio.Group>
        <div 
        style={{
            display:"flex",
            justifyContent:"center",
            gap:"1rem",
            width:"400px",
        }}>
            <button className="btn" onClick={exportToCsv}>
                Export To CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
                Import from CSV
            </label>
            <input 
            onChange={importFromCsv}
            id="file-csv"
            type="file"
            accept=".csv"
            required
            style={{display:"none"}}
            />
        </div>
        </div>
       <Table  dataSource={sortedTransaction} columns={column}/>
       </div>
    )
}

export default TransactionTable;