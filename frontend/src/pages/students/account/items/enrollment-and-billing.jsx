import { 
  DollarOutlined, 
  CreditCardOutlined, 
  LockOutlined, 
  BankOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import {
  Modal,
  Form,
  DatePicker,
  Input,
  Select,
  Divider,
  message,
  Radio,
} from "antd";
import ButtonComponent from "@/components/button/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import {
  StudentAccountBilling,
  StudentAccountEnrollment,
} from "@/modules/enrollments.jsx";
import { useContext, useState } from "react";

export const EnrollmentAndBilling = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const { column, data } = StudentAccountEnrollment();
  const { column: BillingColumns } = StudentAccountBilling();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleModal = () => setOpen((prev) => !prev);
  
  const onFinish = async (values) => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      message.success("Payment processed successfully!");
      setOpen(false);
      form.resetFields();
    }, 1500);
    
    console.log({
      ...values,
      expiration: values["expiration"]?.format("YYYY-MM"),
    });
  };

  return (
    <div className={"space-y-5"}>      <div className="flex gap-5 items-center">
        <Paragraph fontSize={"text-lg"}>Balance: $649.99</Paragraph>
        <ButtonComponent
          defaultColor={colorsObject.black}
          defaultHoverColor={colorsObject.black}
          defaultBorderColor={'#CED8E5'}
          defaultHoverBorderColor={'#CED8E5'}
          borderRadius={5}
          paddingInline={20}
          className={"font-semibold"}
          fontSize={"text-xs"}
          onClick={handleModal}
        >
          Pay Balance
        </ButtonComponent>
      </div>

      <div className="border border-[#CED8E5] px-10 pb-5 overflow-hidden rounded-2xl">
        <div className="-mx-10 px-10 border-b py-2.5 border-b-[#CED8E5] flex justify-between bg-[#FFB82F80]">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="font-normal">Enrollment</span>
            <span className={"text-[#5459EA]"}>$649.99</span>
          </Title>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={column} data={data} />
        </div>
      </div>

      <div className="border border-[#CED8E5] px-10 pb-5 overflow-hidden rounded-2xl">
        <div className="-mx-10 px-10 border-b py-2.5 border-b-[#CED8E5] flex justify-between bg-[#FFB82F80]">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="font-normal">Enrollment</span>
            <span className={"text-[#5459EA]"}>$649.99</span>
          </Title>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={BillingColumns} />
        </div>      </div>

      {/* Stripe-like Payment Modal */}
      <Modal
        title={null}
        centered
        open={open}
        onCancel={handleModal}
        footer={null}
        width={800}
        bodyStyle={{ padding: "24px" }}
        className="stripe-payment-modal"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium">Make Payment</h2>
          <div className="flex items-center text-sm text-gray-600">
            <LockOutlined className="mr-1" />
            <span>Secure payment</span>
          </div>
        </div>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="stripe-payment-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                
                <div className="flex gap-3 mb-6">
                  <div 
                    className={`flex-1 border rounded-md p-4 cursor-pointer ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCardOutlined className="text-lg text-indigo-600" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </div>
                  <div 
                    className={`flex-1 border rounded-md p-4 cursor-pointer ${paymentMethod === 'bank' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <div className="flex items-center gap-2">
                      <BankOutlined className="text-lg text-indigo-600" />
                      <span className="font-medium">Bank Account</span>
                    </div>
                  </div>
                </div>
                
                {paymentMethod === 'card' ? (
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <label className="block text-gray-700 text-sm font-medium">Card information</label>
                      <div className="border rounded-md overflow-hidden">
                        <Form.Item
                          name="card"
                          rules={[
                            { required: true, message: "Card number is required" },
                          ]}
                          noStyle
                        >
                          <Input 
                            prefix={<CreditCardOutlined className="text-gray-400" />}
                            placeholder="1234 1234 1234 1234"
                            className="border-0 border-b rounded-none py-3 px-4"
                            suffix={
                              <div className="flex gap-1">
                                <img src="https://js.stripe.com/v3/fingerprinted/img/visa-365725566f9578a9589553aa9296d178.svg" alt="visa" className="h-6" />
                                <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="mastercard" className="h-6" />
                                <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="amex" className="h-6" />
                              </div>
                            }
                          />
                        </Form.Item>
                        
                        <div className="grid grid-cols-2">
                          <Form.Item
                            name="expiration"
                            rules={[{ required: true, message: "Required" }]}
                            noStyle
                          >
                            <DatePicker
                              format={"MM/YY"}
                              picker="month"
                              placeholder="MM / YY"
                              className="border-0 border-r rounded-none py-3 px-4"
                            />
                          </Form.Item>
                          
                          <Form.Item
                            name="securaty_code"
                            rules={[{ required: true, message: "Required" }]}
                            noStyle
                          >
                            <Input 
                              placeholder="CVC" 
                              className="border-0 rounded-none py-3 px-4"
                              suffix={<LockOutlined className="text-gray-400" />}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="block text-gray-700 text-sm font-medium">Name on card</label>
                      <Form.Item
                        name="name_card"
                        rules={[{ required: true, message: "Name on card is required" }]}
                        noStyle
                      >
                        <Input className="rounded-md py-3 px-4" placeholder="Full name on card" />
                      </Form.Item>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="block text-gray-700 text-sm font-medium">Billing address</label>
                      <Form.Item
                        name="country"
                        rules={[{ required: true, message: "Country is required" }]}
                        noStyle
                      >
                        <Select
                          className="w-full" 
                          placeholder="Country"
                          options={[
                            { value: 'us', label: 'United States' },
                            { value: 'ca', label: 'Canada' },
                            { value: 'mx', label: 'Mexico' },
                          ]}
                        />
                      </Form.Item>
                      
                      <Form.Item
                        name="address"
                        rules={[{ required: true, message: "Address is required" }]}
                        className="mt-3"
                        noStyle
                      >
                        <Input 
                          className="rounded-md py-3 px-4 mt-3"
                          placeholder="Address"
                        />
                      </Form.Item>
                      
                      <Form.Item
                        name="city"
                        rules={[{ required: true, message: "City is required" }]}
                        className="mt-3"
                        noStyle
                      >
                        <Input 
                          className="rounded-md py-3 px-4 mt-3"
                          placeholder="City"
                        />
                      </Form.Item>
                      
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <Form.Item
                          name="state"
                          rules={[{ required: true, message: "State is required" }]}
                          noStyle
                        >
                          <Select
                            placeholder="State"
                            options={[
                              { value: 'NY', label: 'New York' },
                              { value: 'CA', label: 'California' },
                              { value: 'TX', label: 'Texas' },
                            ]}
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="zip"
                          rules={[{ required: true, message: "ZIP code is required" }]}
                          noStyle
                        >
                          <Input placeholder="ZIP code" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="border rounded-md p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <BankOutlined className="text-blue-600 text-lg" />
                        <span className="font-medium">Bank Account</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Make payments directly from your bank account.
                      </p>
                    </div>
                    
                    <Form.Item
                      name="account_holder"
                      label="Account Holder Name"
                      rules={[{ required: true, message: "Account holder name is required" }]}
                    >
                      <Input className="py-2" placeholder="Full name" />
                    </Form.Item>
                    
                    <Form.Item
                      name="routing_number"
                      label="Routing Number"
                      rules={[{ required: true, message: "Routing number is required" }]}
                    >
                      <Input className="py-2" placeholder="123456789" />
                    </Form.Item>
                    
                    <Form.Item
                      name="account_number"
                      label="Account Number"
                      rules={[{ required: true, message: "Account number is required" }]}
                    >
                      <Input className="py-2" placeholder="•••• •••• •••• 4321" />
                    </Form.Item>
                    
                    <Form.Item
                      name="account_type"
                      label="Account Type"
                      rules={[{ required: true, message: "Account type is required" }]}
                    >
                      <Radio.Group>
                        <Radio value="checking">Checking</Radio>
                        <Radio value="savings">Savings</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <ButtonComponent
                  htmlType="submit"
                  loading={processingPayment}
                  defaultBg={"#4F46E5"}
                  defaultHoverBg={"#4338CA"}
                  defaultColor={"#FFFFFF"}
                  defaultHoverColor={"#FFFFFF"}
                  borderRadius={6}
                  paddingBlock={10}
                  className={"font-medium w-full"}
                >
                  {processingPayment ? "Processing..." : "Pay $649.99"}
                </ButtonComponent>
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
                  <LockOutlined />
                  <span className="text-sm">Payments are secure and encrypted</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Summary</h3>
                <p className="text-sm text-gray-500">Payment details</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Driving course</span>
                  <span className="font-medium">$649.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">$649.99</span>
                </div>
              </div>
              
              <div className="mt-4 text-sm">
                <p className="flex items-center text-gray-600 mb-2">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  Secure checkout
                </p>
                <p className="flex items-center text-gray-600">
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                  Instant confirmation
                </p>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
