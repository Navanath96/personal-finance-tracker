import React from "react";
import {Button, Modal,Form,Input,DatePicker,Select} from "antd";


function AddExpense({isExpenseModalVisible,handleExpenseCancel,onFinish}){
    const [form]=Form.useForm();
    return (
        <Modal
        style={{fontWeight:600}}
        title="Add Expense"
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
        >
            <Form
            form={form}
            layout="vertical"
            onFinish={(value)=>{
                onFinish(value,"expense");
            }}
            >
            <Form.Item
            style={{fontWeight:600}}
            label="Name"
            name="name"
            rules={[
                {
                    required:true,
                    message:"please input the name of the transaction",
                },
            ]}
            >
                <Input type="text" className="custom-input"/>
            </Form.Item>
            <Form.Item
            style={{fontWeight:600}}
            label="Amount"
            name="amount"
            rules={[
                {
        required:true,
         message:"please input the expense amount!",
                },
            ]}
            >
                <Input type="number" className="custom-input"/>
            </Form.Item>
            <Form.Item
            style={{fontWeight:600}}
            label="Date"
            name="date"
            rules={[
                {
        required:true,
         message:"please input the expense date",
                },
            ]}
            >
            <DatePicker format="YYYY-MM-DD" className="custom-input"/>
            </Form.Item>
            <Form.Item
            style={{fontWeight:600}}
            label="Tag"
            name="tag"
            rules={[
                {
        required:true,
         message:"please select a tag!",},
            ]}
            >
            <Select className="select-input-2">
                <Select.Option value="Food">Food</Select.Option>
                <Select.Option value="Shopping">Shopping</Select.Option>
                <Select.Option value="Health">Health</Select.Option>
            </Select>
            </Form.Item>
            <Form.Item>
                <Button className="btn btn-blue" type="primary" htmlType="submit">
                    Add Expense
                </Button>
            </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddExpense;