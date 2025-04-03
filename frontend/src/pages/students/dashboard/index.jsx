import LinksIcon from "@/assets/icons/links.svg";
import IconComponent from "@/components/icons";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import { DrivingItem } from "@/pages/scheduling/items/items.jsx";
import { Upload } from "@/pages/students/dashboard/items/upload.jsx";
import { 
  DollarOutlined, 
  CreditCardOutlined, 
  LockOutlined, 
  BankOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import {
  ConfigProvider,
  Statistic,
  Modal,
  Form,
  InputNumber,
  DatePicker,
  Input,
  Select,
  Divider,
  message,
  Radio,
  Space,
  Tabs
} from "antd";
import { Fragment, useContext, useState } from "react";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { GiWallet } from "react-icons/gi";
import ButtonComponent from "@/components/button";
import ColorsContext from "@/context/colors.jsx";
import { BiDollar } from "react-icons/bi";
import { FaDownload, FaFilePdf } from "react-icons/fa6";
import { IoPrint } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { CustomInput, CustomSelect } from "@/components/form";

const Dashboard = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processingPayment, setProcessingPayment] = useState(false);

  const formatter = (value) => <CountUp end={value} separator="," />;
  
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

  const PaymentSummary = () => (
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
  );
  
  const CardPaymentForm = () => (
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
  );
  
  const BankPaymentForm = () => (
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
  );

  return (
    <Fragment>
      <Helmet>
        <title>Student - Dashboard</title>
      </Helmet>
      <section className={"px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          Home
        </Title>

        <div className="bg-white p-5 rounded-xl space-y-5">
          <div className="bg-[#FFB82F80] p-10 rounded-xl space-y-2.5">
            <Title>Notifications</Title>
            <Paragraph>Welcome to your student portal!</Paragraph>
          </div>

          <div className="flex items-center justify-between">
            <Title level={3} fontSize={"text-sm sm:text-xl"}>
              Upcoming schedule
            </Title>
            <Link to={"/"} className="text-[#1890FF] text-xs sm:text-base">
              View all &#62;
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-scroll">
            <DrivingItem className={"flex-shrink-0"} />
            <DrivingItem className={"flex-shrink-0"} />
            <DrivingItem className={"flex-shrink-0"} />
            <DrivingItem className={"flex-shrink-0"} />
          </div>

          <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-2.5 min-[1200px]:grid-cols-3">
            <div className="h-[181px] flex flex-col justify-between border p-5 rounded-xl">
              <ConfigProvider
                theme={{
                  token: {
                    colorTextDescription: "#000",
                    fontSize: 18,
                  },
                }}
              >
                <Statistic
                  title="Account Balance"
                  value={8453.0}
                  prefix={"$"}
                  formatter={formatter}
                  valueStyle={{ fontWeight: 600, fontSize: 35 }}
                />
              </ConfigProvider>

              <div className="flex max-[400px]:block items-center justify-between gap-x-3">
                <IconComponent icon={<GiWallet />} iconWidth={"w-10 max-[400px]:hidden"} />

                <div className="flex items-center justify-between min-[400px]:space-x-2">
                  <ButtonComponent
                    defaultColor={colorsObject.black}
                    defaultHoverColor={colorsObject.black}
                    defaultBorderColor={colorsObject.secondary}
                    className="py-2 px-4 border rounded-xl"
                    onClick={handleModal}
                  >
                    PAY NOW
                  </ButtonComponent>

                  <IconComponent
                    icon={<BiDollar />}
                    iconWidth={"text-xl"}
                    className={
                      "bg-black text-white rounded-xl w-[35px] h-[35px] mb-1"
                    }
                    iconClass={"pt-1.5"}
                  />
                </div>
              </div>
            </div>

            <div className="border p-5 rounded-xl space-y-2.5">
              <Title fontSize={"text-lg"}>EZ DRIVE ONLINE COURSE</Title>
              <Paragraph fontSize={"text-base"}>
                Please contact our customer service if you want to purchase an
                online course.
              </Paragraph>
              <Link to={"/"} className="py-2 px-4 border rounded-xl">
                LEARN MORE
              </Link>
            </div>

            <div>
              <div className="border p-5 rounded-xl space-y-5 lg:max-w-72">
                <Title fontSize={"text-lg"}>MY FILES</Title>
                <div className="flex items-center justify-between ">
                  <IconComponent
                    icon={<FaFilePdf />}
                    className={"bg-black text-white w-10 h-10 rounded-xl"}
                    iconClass={"pt-1.5"}
                    iconWidth={"text-xl"}
                  />

                  <Paragraph fontSize={"text-xs font-semibold"}>
                    Student Contract
                  </Paragraph>
                </div>
                <div className="flex justify-between items-center">
                  <IconComponent
                    icon={<IoPrint />}
                    className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                    iconWidth={"text-2xl"}
                    iconClass={"pt-1.5"}
                  />
                  <IconComponent
                    icon={<IoMdEye />}
                    className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                    iconWidth={"text-2xl"}
                    iconClass={"pt-1.5"}
                  />
                  <IconComponent
                    icon={<FaDownload />}
                    className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                    iconWidth={"text-xl"}
                    iconClass={"pt-1.5"}
                  />
                </div>
              </div>
            </div>

            <div className="h-[179px] flex flex-col justify-between border border-[#CED8E5] p-5 rounded-xl">
              <Title fontSize={"text-base font-semibold"}>SIGN DOCUMENTS</Title>
              <Paragraph fontSize={"text-sm font-semibold"}>
                Teens 8hr in car instruction
              </Paragraph>

              <div className="flex justify-between items-center">
                <div className="space-x-3">
                  <IconComponent
                    icon={<IoPrint />}
                    className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                    iconWidth={"text-2xl"}
                    iconClass={"pt-1.5"}
                  />
                  <IconComponent
                    icon={<IoMdEye />}
                    className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                    iconWidth={"text-2xl"}
                    iconClass={"pt-1.5"}
                  />
                </div>

                <Link to={"/"} className="bg-[#24C18F] py-2.5 px-5 rounded-xl">
                  SIGN
                </Link>
              </div>
            </div>

            <div className="space-y-5 border border-[#CED8E5] p-5 rounded-xl">
              <div className="flex justify-between items-center gap-4">
                <Title level={4} fontSize={"text-xl"}>
                  Quick links
                </Title>

                <Image className={"w-6"} src={LinksIcon} srcSet={LinksIcon} />
              </div>

              <div className={"space-y-5"}>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-[#5459EA] py-2 text-white hover:bg-[#5F66E9CC]"
                  }
                >
                  My Profile
                </Link>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-[#5459EA] py-2 text-white hover:bg-[#5F66E9CC]"
                  }
                >
                  Contact us
                </Link>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-[#5459EA] py-2 text-white hover:bg-[#5F66E9CC]"
                  }
                >
                  Appointments
                </Link>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-[#5459EA] py-2 text-white hover:bg-[#5F66E9CC]"
                  }
                >
                  Book lessons
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 max-[1000px]:grid-cols-1">
            <div className="space-y-5 border rounded-xl p-5">
              <Title
                fontSize={"text-xl font-semibold"}
                className={"border-b border-[#CED8E5] pb-5"}
              >
                UPLOAD FILES
              </Title>

              <Paragraph
                colorText="#9D9D9D"
                className={"border-b boder-[#9D9D9D] pb-5"}
              >
                Click “CHOOSE FILE” below to select an image or to take a
                picture from your mobile device to upload to the school (jpg,
                png, or pdf ONLY).
              </Paragraph>

              <Paragraph colorText="#9D9D9D">
                After selecting the file, choose the correct category for your
                image or form from the dropdown menu.
                <br />
                <br />
                Click Upload.
                <br />
                <br />
                (Only jpg, png, and pdf file formats are allowed)
              </Paragraph>

              <Upload />

              <div className="flex max-[400px]:flex-col gap-2.5 justify-end border-t border-[#CED8E5] pt-5">
                <ButtonComponent
                  defaultBg={colorsObject.main}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.black}
                  defaultBorderColor="#CBCBCB"
                  borderRadius={8}
                  paddingInline={20}
                >
                  Cancel
                </ButtonComponent>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  defaultColor={colorsObject.main}
                  defaultBorderColor="#CBCBCB"
                  borderRadius={8}
                  paddingInline={20}
                >
                  Continue
                </ButtonComponent>
              </div>
            </div>

            <div className="space-y-5 border rounded-xl p-5">
              <Title
                fontSize={"text-xl font-semibold"}
                className={"border-b border-[#E3E3E3] pb-5"}
              >
                REQUIRED PAPERWORK
              </Title>

              <Paragraph
                colorText="#9D9D9D"
                className={"border-b border-[#E3E3E3] pb-5"}
              >
                Click “CHOOSE FILE” below to select an image or to take a
                picture from your mobile device to upload to the school (jpg,
                png, or pdf ONLY).
              </Paragraph>

              <Paragraph
                colorText="#9D9D9D"
                className={"border-b border-[#E3E3E3] pb-5"}
              >
                After selecting the file, choose the correct category for your
                image or form from the dropdown menu.
                <br />
                <br />
                Click Upload.
                <br />
                <br />
                (Only jpg, png, and pdf file formats are allowed)
              </Paragraph>

              <div className="flex max-[400px]:flex-col gap-y-5 justify-between items-center border-b border-[#E3E3E3] pb-5">
                <Paragraph>Copy of Permit</Paragraph>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  paddingInline={20}
                  borderRadius={10}
                  className={"max-[400px]:w-full"}
                >
                  UPLOAD
                </ButtonComponent>
              </div>

              <div className="flex max-[400px]:flex-col gap-y-5 justify-between items-center border-b border-[#E3E3E3] pb-5">
                <Paragraph>Copy of Permit</Paragraph>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  paddingInline={20}
                  borderRadius={10}
                  className={"max-[400px]:w-full"}
                >
                  UPLOAD
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>

        {/* Stripe-like Payment Modal */}
        <Modal
          title={null}
          centered
          open={Open}
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
                  
                  {paymentMethod === 'card' ? <CardPaymentForm /> : <BankPaymentForm />}
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
                <PaymentSummary />
                
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
      </section>
    </Fragment>
  );
};

export default Dashboard;
