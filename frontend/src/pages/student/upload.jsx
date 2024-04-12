import ButtonComponent from '@/components/button/index.jsx'
import IconComponent from '@/components/icons/index.jsx'
import Title from '@/components/title/index.jsx'
import ColorsContext from '@/context/colors.jsx'
import React, { useContext } from 'react'
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload as UPLOAD } from 'antd';
import { AiOutlineCloudUpload } from 'react-icons/ai'
const { Dragger } = UPLOAD;
const props = {
	name: 'file',
	multiple: true,
	action: 'http://localhost:5173/api/upload',
	onChange(info) {
		const { status } = info.file;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log('Dropped files', e.dataTransfer.files);
	},
};
const Upload = () => {
	const {colorsObject} = useContext(ColorsContext)
	return <Dragger {...props} className={"w-3/4 mx-auto"}>
		<IconComponent className={'text-indigo-700 text-6xl mb-2.5'} icon={<AiOutlineCloudUpload />} />
		<Title level={3} fontSize={'text-xl'} titleMarginBottom={8}>Drop file here</Title>
		<div>
			<ButtonComponent
				defaultHoverBg={colorsObject.info}
				defaultBg={colorsObject.info}
				paddingInline={37}
				controlHeight={30}
			>
				Browse
			</ButtonComponent>
		</div>
	</Dragger>
};
export default Upload;