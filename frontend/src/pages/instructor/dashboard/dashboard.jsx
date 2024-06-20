import LinksIcon from "@/assets/icons/links.svg";
import ButtonComponent from '@/components/button/index.jsx'
import { CustomInput } from '@/components/form/index.jsx'
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from '@/context/colors.jsx'
import { Upload } from '@/pages/instructor/dashboard/items/upload.jsx'
import { DrivingItem } from "@/pages/scheduling/items/items.jsx";
import { Form } from 'antd'
import classNames from "classnames";
import { Fragment , useContext } from 'react'
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Dashboard = ({ className, children, ...props }) => {
  const [form] = Form.useForm();
  const {colorsObject} = useContext(ColorsContext)
  
  // func
  const onFinish = async values =>{
    console.log(values)
  }
  
  const onReset = () =>{
    form.resetFields();
  }
  return (
    <Fragment>
      <Helmet>
        <title> Instructor - Dashboard</title>
      </Helmet>
      <section
        className={classNames(className, "px-11 space-y-5 max-w-full w-full")}
        {...props}
      >
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          Home
        </Title>

        <div className="bg-white rounded-xl px-7 py-5 space-y-5">
          <div className="grid grid-cols-4 gap-5">
            <DrivingItem />
            <DrivingItem />
            <DrivingItem />
            <DrivingItem />
          </div>
          
          <div className="grid grid-cols-3 gap-5">
            <div className={ "space-y-8" }>
              <div className='space-y-5'>
                <div className="flex items-center gap-4">
                  <Title level={ 4 } fontSize={ "text-xl" }>
                    Quick links
                  </Title>
                  
                  <Image className={ "w-6" } src={ LinksIcon } srcSet={ LinksIcon } />
                </div>
                
                <div className={ "space-y-5" }>
                  <Link
                    to={ "/#" }
                    className={
                      "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                    }
                  >
                    Take attendance
                  </Link>
                </div>
              </div>
              
              <div className={ "space-y-5" }>
                <Title level={ 4 } fontSize={ "text-xl" }>
                  STUDENT DETAILS
                </Title>
                
                <Form form={ form } onFinish={ onFinish }>
                  <Form.Item name={ "search" } label={ "Student Name :" }>
                    <CustomInput placeholder={ "Search" } />
                  </Form.Item>
                  
                  <div className={ "space-x-2.5" }>
                    <ButtonComponent type={ "submit" } defaultColor={ colorsObject.black }
                                     defaultHoverColor={ colorsObject.black }>
                      Show Details
                    </ButtonComponent>
                    <ButtonComponent type={ "submit" } defaultColor={ colorsObject.black }
                                     defaultHoverColor={ colorsObject.black } onClick={ onReset }>
                      Reset
                    </ButtonComponent>
                  </div>
                </Form>
              </div>
              
              <div className='space-y-5'>
                <Title level={ 4 } fontSize={ "text-xl" }>
                  ASSIGNED STUDENTS
                </Title>
                
                <ul className={ "space-y-5" }>
                  <li>KANTETI, ROHAN VARMA</li>
                </ul>
              </div>
            </div>
            
            <div className='space-y-5'>
              <Title level={ 4 } fontSize={ "text-xl" }>
                UPLOAD FILES
              </Title>
              
              <Upload />
            </div>
          
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
