import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import {auth, db} from "../firebase";
import AddExpense from "../components/Modal/AddExpense";
import AddIncome from "../components/Modal/AddIncome";
import {addDoc, collection, getDocs,query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import NoTransaction from "../components/NoTransactions";
import Charts from "../components/Charts";

function Dashboard(){
    // const transactions=[
    //     {
    //         type:"income",
    //         amount:1200,
    //         tag:"salary",
    //         name:"income 1",
    //         date:"2023-10-15",
    //     },
    //     {
    //         type:"expense",
    //         amount:800,
    //         tag:"food",
    //         name:"expense 1",
    //         date:"2023-10-15",
    //     }
    // ]
    const [Transactions,setTransactions]=useState([]);
    const [loading,setLoading]=useState(false);
    const [user]=useAuthState(auth)
    const [isExpenseModalVisible,setisExpenseModalVisible]=useState(false);
    const [isIncomeModalVisible,setisIncomeModalVisible]=useState(false);
    const [income,setIncome]=useState(0);
    const [expense,setExpense]=useState(0);
    const [totalBalance,setTotalBalance]=useState(0);

    const showIncomeModal=()=>{
        setisIncomeModalVisible(true);
    };
    const showExpenseModal=()=>{
        setisExpenseModalVisible(true);
    };

    const handleExpenseCancel=()=>{
        setisExpenseModalVisible(false);
    };
    const handleIncomeCancel=()=>{
        setisIncomeModalVisible(false);
    };

    const onFinish=(values,type)=>{
        console.log("on Finish", values,type);
        const newTransaction={
            type: type,
             date:values.date.format("YYYY-MM-DD"),
            amount:parseFloat(values.amount),
            tag:values.tag,
            name:values.name,
        };
        addTransaction(newTransaction);
        // fetchTransactions();
    }
    async function addTransaction(newTransaction){
        try{
            const docRef=await addDoc(
                collection(db,`user/${user.uid}/transactions`),
                newTransaction
            );
            // console.log("Document written with ID:",docRef.id);
            toast.success("Transaction Added!")
            const newArray=Transactions;
            newArray.push(newTransaction);
            // console.log("newArray",newArray)
            setTransactions( newArray);
            calculateBalance();
           
        }catch(e){
            console.log("Error adding document".e);
             toast.error("couldn't add transaction");
            // alert("not")
            
        }
    }
useEffect(()=>{
    fetchTransactions();
},[user]);


useEffect(()=>{
    calculateBalance();
},[Transactions]);

        const calculateBalance=()=>{
            let incomeTotal=0;
            let expenseTotal=0;
    
           Transactions.forEach((transaction)=>{
                if(transaction.type==="income"){
                    incomeTotal = incomeTotal + transaction.amount;
                    // console.log(tran);
                }
                else{
                    expenseTotal= expenseTotal + transaction.amount;
                }
            });
            setIncome(incomeTotal);
            setExpense(expenseTotal);
            setTotalBalance(incomeTotal-expenseTotal);
            // console.log(incomeTotal);
            // console.log(expenseTotal);
        }
// console.log("tr1",Transactions);
    async function fetchTransactions(){
       setLoading(true);
       if(user){
        const q=query(collection(db,`user/${user.uid}/transactions`));
        const querySnapshot=await getDocs(q);
        const array=[];
        querySnapshot.forEach((doc)=>{
            array.push(doc.data());
       });
       setTransactions(array);
       console.log("array",array);
       toast.success("Transaction Fetch");
       }
       setLoading(false);
    }
 
    // console.log(transactions);
    let sortedTransactions=Transactions.sort((a,b)=>{
      
            return new Date(a.date)-new Date(b.date);
    });
    function updateButton(){
        setExpense(0);
        setIncome(0);
        setTotalBalance(0);
        setTransactions([]);
        // fetchTransactions();
    }
 
   

    return ( <div>
        <Header/>
       { loading? <p>Loading..</p>:
       <>
        <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        updateButton={updateButton}
        />
        {Transactions.length!=0? <Charts 
        sortedTransactions={sortedTransactions}/>
        :<NoTransaction
        />}

        <AddIncome isIncomeModalVisible={isIncomeModalVisible}
      handleIncomeCancel={handleIncomeCancel} 
      onFinish={onFinish}
      />
      <AddExpense isExpenseModalVisible={isExpenseModalVisible}
      handleExpenseCancel={handleExpenseCancel} 
      onFinish={onFinish}
      />
      <TransactionTable Transaction={Transactions}
       addTransaction={addTransaction}
       fetchTransactions={fetchTransactions}/>
      
      </>}
    </div>)
}


export default Dashboard;