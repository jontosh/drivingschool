import IconComponent from '@/components/icons/index.jsx'
import Title, { Paragraph } from '@/components/title/index.jsx'
import Upload from '@/pages/student/upload.jsx'
import classNames from 'classnames'
import { AiOutlineEye, AiOutlineInfoCircle } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { SlCloudDownload } from 'react-icons/sl'
import FilesStyle from "./student-account.module.scss"

export const Files = () => {
	return (
		<div className={"pt-5"}>
			<div className='grid grid-cols-2 gap-5'>
				<div >
					<Title fontSize={"text-2xl text-indigo-700"} titleMarginBottom={28}>
						Files
					</Title>

					<div className='space-y-5'>
						<div className='flex gap-3 items-center'>
							<div
								className={classNames(FilesStyle["File__item"], "py-3.5 flex justify-between items-center px-5 bg-white border border-indigo-700 rounded-2xl")}>
								<Paragraph className={"text-base"}>Student contract</Paragraph>
								<Paragraph className={"text-base"}>PDF</Paragraph>
							</div>

							<div className={"space-x-2"}>
								<IconComponent
									className={"text-xl border border-indigo-700 rounded-lg w-8"}
									icon={<AiOutlineEye />}
									style={{
										paddingTop: 6,
									}}
								/>
								<IconComponent
									className={"text-xl border border-indigo-700 rounded-lg w-8"}
									icon={<SlCloudDownload />}
									style={{
										paddingTop: 6,
									}}
								/>
								<IconComponent
									className={"text-xl border border-indigo-700 rounded-lg w-8"}
									icon={<AiOutlineInfoCircle />}
									style={{
										paddingTop: 6,
									}}
								/>
								<IconComponent
									className={"text-xl border border-indigo-700 rounded-lg w-8"}
									icon={<RiDeleteBin6Line />}
									style={{
										paddingTop: 6,
									}}
								/>
							</div>

						</div>

						<div className='flex gap-3 items-center'>
							<div
								className={classNames(FilesStyle["File__item"], "py-3.5 flex justify-between items-center px-5 bg-white border border-indigo-700 rounded-2xl")}>
								<Paragraph className={"text-base"}>Student contract</Paragraph>
								<Paragraph className={"text-base"}>JPG</Paragraph>
							</div>

							<div className={"space-x-2 items-center"}>
								<IconComponent
									className={"text-xl border border-indigo-700 rounded-lg w-8"}
									icon={<AiOutlineEye />}
									style={{
										paddingTop: 6,
									}}
								/>

								<IconComponent
									className={"text-xl border border-indigo-700 rounded-lg w-8 pt-1.5"}
									icon={<SlCloudDownload />}
									style={{
										paddingTop: 6,
									}}
								/>
								<IconComponent
									className={"text-xl border border-indigo-700 rounded-lg w-8 pt-1.5"}
									icon={<AiOutlineInfoCircle />}
									style={{
										paddingTop: 6,
									}}
								/>
								<IconComponent
									className={"text-xl border border-indigo-700 rounded-lg w-8 pt-1.5"}
									icon={<RiDeleteBin6Line />}
									style={{
										paddingTop: 6,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Title fontSize={"text-2xl text-indigo-700"} titleMarginBottom={28}>
						Upload files
					</Title>

					<Upload />
				</div>
			</div>
		</div>
	)
}