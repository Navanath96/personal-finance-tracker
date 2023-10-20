import React from "react";
import {Button, Modal,Form,Input,DatePicker,Select} from "antd";


function AddIncome({isIncomeModalVisible,handleIncomeCancel,onFinish}){
    const [form]=Form.useForm();
    return (
        <Modal
        style={{fontWeight:600}}
        title="Add Income"
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
        >
            <Form
            form={form}
            layout="vertical"
            onFinish={(value)=>{
                onFinish(value,"income");
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
         message:"please input the income amount!",
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
         message:"please input the income date",
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
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="Investment">Investment</Select.Option>
                <Select.Option value="Stocks">Stocks</Select.Option>
            </Select>
            </Form.Item>
            <Form.Item>
                <Button className="btn btn-blue" type="primary" htmlType="submit">
                    Add Income
                </Button>
            </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddIncome;